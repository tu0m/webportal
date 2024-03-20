import sheet from './style.css?inline'

class ClockWidget extends HTMLElement {
    static observedAttributes = ["city"];

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
        clearInterval(interval)
    }

    attributeChangedCallback(name, oldValue, newValue) {
    }

    get city() {

    }

    get time() {
        return new Intl.DateTimeFormat(undefined, { timeStyle: "short" }).format(Date.now())
    }

    get utc() {
        return new Intl.NumberFormat(undefined, { signDisplay: 'always' }).format(new Date().getTimezoneOffset() / 60 * -1)
    }

    update() {
        if (this.shadowRoot.querySelector('.mid').textContent != this.time) {
            // this.shadowRoot.querySelector('.top').textContent =
            this.shadowRoot.querySelector('.mid').textContent = this.time
            // this.shadowRoot.querySelector('.btm').textContent = 'UTC' + this.utc
        }
    }
}

customElements.define("clock-widget", ClockWidget);
