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

        // update weather
        this.interval = setInterval(() => {
            this.update()
        }, 3600000); // 1 hour 
    }

    disconnectedCallback() {
        clearInterval(this.interval)
        // delete localStorage "weather-widget"
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

        // check localStorage
        let saveData = storage.load()
        if (saveData) [coords, weatherData] = [saveData['coords'], saveData['weatherData']]

        // fetch coords and weatherData
        if (!coords) coords = await this.fetchCoords(this.city, this.country)
        if (coords && !weatherData) weatherData = await this.fetchWeatherData(coords)

        // TODO: coords or weatherData can still be null or undefined because of network issues or incorrect data, handle it?

        const currentTime = new Date().toISOString()
        const currentHourWeatherData = weatherData.properties.timeseries.find(object => object.time.startsWith(currentTime.slice(0, 13)))

        const currTemp = Math.round(currentHourWeatherData.data.instant.details.air_temperature) + '°C'
        const symbolCode = currentHourWeatherData.data.next_1_hours.summary.symbol_code

        console.log(currTemp)
        console.log(symbolCode)
        console.log(currentHourWeatherData)




        // check if weatherData is still valid (if current hour is found)

        // set city name, weather icon, temperature

        // save data to localStorage

        this.setCity(this.city)
        this.setIcon(symbolCode)
        this.setTemp(currTemp)

    }

    async fetchCoords(city, country, timer = 1) {
        // https://www.geonames.org/export/geonames-search.html
        const countryCode = Object.keys(countries).find(key => countries[key] == country)

        const url = `http://api.geonames.org/searchJSON?name_equals=${city}&country=${countryCode}&maxRows=1&username=tu0m`

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
                // There was an error
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
                return data

            }).catch(error => {
                // There was an error
                console.log(error)
                console.log('Try deleting and re-adding weather widget and check that both city and country are entered correctly')
                return null
            });
    }

    save(coords, weatherData) {
        storage.save('weather-widget', { coords: coords, weatherData: weatherData })
    }

    get load() {
        return storage.load('weather-widget')
    }

    getIcon(symbolCode) {
        return new URL(`/icons/weather-widget/${symbolCode}.svg`, import.meta.url).href
    }

    setCity(city) {
        // TODO: show city name on mouse hover/touch or make a slow carousel of city, temp, wind, etc
        // this.shadowRoot.querySelector('.top').textContent = city
    }

    setIcon(symbolCode) {
        const icon = document.createElement('img')
        icon.src = this.getIcon(symbolCode)
        icon.alt = 'current weather'
        this.shadowRoot.querySelector('.mid').replaceChildren(icon)
    }

    setTemp(temp) {
        this.shadowRoot.querySelector('.btm').textContent = temp
    }
}

customElements.define("weather-widget", WeatherWidget);