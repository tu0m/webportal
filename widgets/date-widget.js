import sheet from './style.css?inline'

class DateWidget extends HTMLElement {

    constructor() {
        super();
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
        <div class="mid"></div>
        <div class="btm"></div>
        `
        shadowRoot.innerHTML = layout

        this.update()
        this.interval = setInterval(() => {
            this.update()
        }, 1000);
    }

    disconnectedCallback() {
        clearInterval(this.interval)
    }

    attributeChangedCallback(name, oldValue, newValue) {
    }

    get month() {
        return new Intl.DateTimeFormat(undefined, { month: "long" }).format(Date.now())
    }

    get date() {
        return new Intl.DateTimeFormat(undefined, { day: "numeric" }).format(Date.now())
    }

    get weekday() {
        return new Intl.DateTimeFormat(undefined, { weekday: "long" }).format(Date.now())
    }

    update() {
        if (this.shadowRoot.querySelector('.mid').textContent != this.date) {
            this.shadowRoot.querySelector('.top').textContent = this.month
            this.shadowRoot.querySelector('.mid').textContent = this.date
            this.shadowRoot.querySelector('.btm').textContent = this.weekday
        }
    }
}

customElements.define("date-widget", DateWidget);
