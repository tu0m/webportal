import sheet from './style.module.css?raw'
import countries from '../json/countries.json'
import * as storage from '../scripts/storage.js'

class WeatherWidget extends HTMLElement {

    constructor() {
        super();
    }

    static get observedAttributes() {
        // attributeChangedCallback() is triggered only by the attributes listed here
        return ['data-country', 'data-city']
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: "open" })

        // add css
        const moduleSheet = new CSSStyleSheet()
        moduleSheet.replaceSync(sheet)
        shadowRoot.adoptedStyleSheets = [moduleSheet]

        // add html
        const layout = `
        <div class="mid">
        <img class="favicon" src=${this.getIcon('yr')} alt="favicon"/>
        </div>
        <div class="btm">Yr.no</div>
        `
        shadowRoot.innerHTML = layout

        // event listeners
        shadowRoot.host.addEventListener('keydown', this.keyPressHandler)
        shadowRoot.host.addEventListener('click', this.keyPressHandler)

        // update weather
        this.updateInterval = setInterval(this.update, 600000); // 10 minutes
    }

    disconnectedCallback() {
        clearInterval(this.updateInterval)
        clearInterval(this.setTextInterval)
        this.deleteAll()
        this.shadowRoot.host.removeEventListener('keydown', this.keyPressHandler)
        this.shadowRoot.host.removeEventListener('click', this.keyPressHandler)
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // wait for connectedCallback() to finish
        window.customElements.whenDefined('weather-widget').then(() => {
            if (name == 'data-country') this.country = newValue
            if (name == 'data-city') this.city = newValue

            if (this.city && this.country) this.update()
        });
    }

    async update() {
        let coords = null
        let weatherData = null
        let nextHour = new Date()
        nextHour.setHours(nextHour.getHours() + 1)
        nextHour = nextHour.toISOString()

        // check localStorage
        const saveData = this.load
        if (saveData) [coords, weatherData] = [saveData['coords'], saveData['weatherData']]

        // check if weather data is more than 1 day old
        const tooOld = nextHour.slice(0, 10) == weatherData?.properties.meta.updated_at.slice(0, 10) ? false : true

        // fetch coords and weatherData if needed
        if (!coords) coords = await this.fetchCoords(this.city, this.country)
        if (coords && (!weatherData || tooOld)) weatherData = await this.fetchWeatherData(coords)
        // if fetch fails just return
        // TODO: add tests and test network issues there?
        if (!coords || !weatherData) return
        this.save(coords, weatherData)

        // TODO: if precipitation is >0, show the amount in the widget (but if there's multiple weather widgets, they will go out of sync due to having different amount of text items)
        const currentHourWeatherData = weatherData.properties.timeseries.find(object => object.time.startsWith(nextHour.slice(0, 13)))
        const symbolCode = currentHourWeatherData?.data.next_1_hours.summary.symbol_code
        const currTemp = Math.round(currentHourWeatherData?.data.instant.details.air_temperature) + ' °C'
        const currWind = Number(currentHourWeatherData?.data.instant.details.wind_speed) + ' m/s'
        const currPrec = Number(currentHourWeatherData?.data.next_1_hours.details.precipitation_amount) + ' mm'

        this.setIcon(symbolCode)
        this.setText(this.city, currTemp, currWind, currPrec)
    }

    async fetchCoords(city, country, timer = 1) {
        // https://www.geonames.org/export/geonames-search.html
        const countryCode = Object.keys(countries).find(key => countries[key] == country)

        const url = `https://api.geonames.org/searchJSON?name_equals=${city}&country=${countryCode}&maxRows=1&username=tu0m`

        return fetch(url)
            .then(response => {
                // If the response is successful, get the JSON
                if (response.ok) return response.json()
                // retry until response.ok (TODO: testing needed)
                return new Promise(resolve => setTimeout(resolve, timer)).then(() => this.fetchCoords(city, country, timer * 2))

            }).then(data => {
                // This is the JSON from our response
                if (data.totalResultsCount != 0) {
                    return {
                        lat: parseFloat(data.geonames[0].lat).toFixed(3),
                        lon: parseFloat(data.geonames[0].lng).toFixed(3)
                    }
                }
                throw new Error('Failed to find coordinates')

            }).catch(error => {
                this.classList.add('error')
                console.log(error)
                console.log('Try deleting and re-adding weather widget and check that both city and country are entered correctly')
                return null
            });
    }

    async fetchWeatherData(coords, timer = 1) {
        // https://api.met.no/weatherapi/locationforecast/2.0/documentation

        const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${coords.lat}&lon=${coords.lon}`
        const headers = new Headers({
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "User-Agent": "WebPortal https://github.com/tu0m/webportal"
            }
        })

        return fetch(url, headers)
            .then(response => {
                // If the response is successful, get the JSON
                if (response.ok) return response.json()
                // retry until response.ok (TODO: testing needed)
                return new Promise(resolve => setTimeout(resolve, timer)).then(() => this.fetchWeatherData(coords, timer * 2))

            }).then(data => {
                // This is the JSON from our response
                const time = new Intl.DateTimeFormat(undefined, { timeStyle: "short" }).format(Date.now())
                console.log('Fresh weather data fetched at ' + time)
                return data

            }).catch(error => {
                this.classList.add('error')
                console.log(error)
                console.log('Try deleting and re-adding weather widget and check that both city and country are entered correctly')
                return null
            });
    }

    save(coords, weatherData) {
        const uuid = this.getAttribute('uuid')
        const data = { coords: coords, weatherData: weatherData }
        storage.save(data, uuid)
    }

    get load() {
        const uuid = this.getAttribute('uuid')
        return storage.load(uuid)
    }

    deleteAll() {
        const uuid = this.getAttribute('uuid')
        storage.remove(uuid)
    }

    getIcon(symbolCode) {
        return new URL(`/icons/weather-widget/${symbolCode}.svg`, import.meta.url).href
    }

    setIcon(symbolCode) {
        if (!symbolCode) return
        const icon = document.createElement('img')
        icon.src = this.getIcon(symbolCode)
        icon.alt = 'current weather'
        icon.draggable = false
        this.shadowRoot.querySelector('.mid').replaceChildren(icon)
    }

    setText(...items) {
        if (!items) return
        const array = items.filter(item => item)
        const element = this.shadowRoot.querySelector('.btm')
        let currentTurn = 0
        clearInterval(this.setTextInterval)
        this.setTextInterval = setInterval(() => {
            // nice and smooth fade transition
            element.classList.add('fade')
            element.addEventListener('transitionend', function textUpdate() {
                element.removeEventListener('transitionend', textUpdate)
                element.classList.remove('fade')

                element.textContent = array[currentTurn]

                currentTurn == array.length - 1 ? currentTurn = 0 : currentTurn++
            });
        }, 7000)
    }

    keyPressHandler(e) {
        if (e.key == 'Enter' || e.key == ' ' || e.button == 0) {
            this.open()
        }
    }

    open() {
        let url = `https://www.yr.no/en/`
        const coords = this.load?.coords
        if (coords) url = `https://www.yr.no/en/forecast/graph/${coords.lat},${coords.lon}`

        window.open(url, '_blank')
        this.shadowRoot.host.blur()
    }
}

customElements.define("weather-widget", WeatherWidget);