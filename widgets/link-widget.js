import sheet from './style.css?inline'

class LinkWidget extends HTMLElement {

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
        <div class="mid">
            <img src="../TEMP/apple-icon-60x60.png"
            alt="visit site"
            />
        </div>
        <div class="btm">reddit</div>
        `
        shadowRoot.innerHTML = layout
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(name, oldValue, newValue) {
    }
}

customElements.define("link-widget", LinkWidget);