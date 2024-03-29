import sheet from './style.module.css?raw'

class WeatherWidget extends HTMLElement {

    constructor() {
        super();
        this.city = null
        this.country = null
        this.coords = null
        this.weatherData = null
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
        <div class="top"></div>
        <div class="mid">
        <img class="favicon" src=${this.getIcon('yr')} alt="favicon"/>
        </div>
        <div class="btm">Yr.no</div>
        `
        shadowRoot.innerHTML = layout

        // event listeners


        this.interval = setInterval(() => {
            this.update()
        }, 3600000); // 1 hour
    }

    disconnectedCallback() {
        clearInterval(this.interval)
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // wait for connectedCallback() to finish
        window.customElements.whenDefined('weather-widget').then(() => {
            if (name == 'data-country') this.country = newValue
            if (name == 'data-city') this.city = newValue

            if (this.city && this.country) {
                this.coords = this.fetchCoords(this.city, this.country)
                this.weatherData = this.fetchWeatherData(this.coords)


            }
        });
    }

    async fetchCoords(city, countryCode) {
        // https://www.geonames.org/export/geonames-search.html

        try {
            const url = `http://api.geonames.org/searchJSON?name_equals=${city}&country=${countryCode}&maxRows=1&username=tu0m`
            const res = await fetch(url)
            if (!res.ok) throw new Error("Network response was not OK")
            const data = await res.json()

            const latRounded = parseFloat(data.geonames[0].lat).toFixed(3)
            const lonRounded = parseFloat(data.geonames[0].lng).toFixed(3)

            return { lat: latRounded, lon: lonRounded }

        } catch (error) {
            console.log(error)
            return null
        }
    }

    async fetchWeatherData(coords) {
        // https://api.met.no/weatherapi/locationforecast/2.0/documentation

        if (!coords) return null

        try {
            const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${coords.lat}&lon=${coords.lon}`
            const headers = new Headers({
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "User-Agent": "WebPortal https://github.com/tu0m/webportal"
                },
            })
            const res = await fetch(url, headers)
            if (!res.ok) throw new Error("Network response was not OK")
            const data = await res.json()

            return data

        } catch (error) {
            console.log(error)
            return null
        }

    }

    update() {
        // set icon and temp
        // if city or country not set, don't do anything?
        // read weatherData and update widget accordingly
        // if weatherData doesn't have current hour, then fetch new data and use that
        if (!weatherData) return null
    }

    getIcon(symbolCode) {
        return new URL(`/icons/weather-widget/${symbolCode}.svg`, import.meta.url).href
    }

    setCity(city) {
        if (city) this.shadowRoot.querySelector('top').textContent = city
    }

    setIcon(icon) {

    }

    setTemp(temp) {

    }
}

customElements.define("weather-widget", WeatherWidget);