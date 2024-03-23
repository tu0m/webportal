import sheet from './style.css?inline'

class LinkWidget extends HTMLElement {

    constructor() {
        super();
    }

    static get observedAttributes() {
        // attributeChangedCallback() is triggered only by the attributes listed here
        return ['data-name', 'data-url']
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
            
        <img class="favicon placeholder" src="" alt="favicon" />
        
        </div>
        <div class="btm"></div>

        `
        shadowRoot.innerHTML = layout

        // event listeners
        shadowRoot.host.addEventListener('keydown', this.keyPressHandler)
        shadowRoot.host.addEventListener('click', this.open)
    }

    disconnectedCallback() {
        shadowRoot.host.removeEventListener('keydown', this.keyPressHandler)
        shadowRoot.host.removeEventListener('click', this.open)
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // wait for connectedCallback() to finish
        window.customElements.whenDefined('link-widget').then(() => {
            if (name == 'data-name') this.updateName(newValue)
            if (name == 'data-url') this.updateFavicon(this.httpsify(newValue))
        });
    }

    httpsify(url) {
        // add https:// if missing
        if (url.includes('://')) return url
        return 'https://' + url
    }

    updateName(name) {
        this.shadowRoot.querySelector('.btm').textContent = name
    }

    async updateFavicon(url) {
        // TODO: save all icons to localStorage? along with all other user customization?
        const mid = this.shadowRoot.querySelector('.mid')
        const img = new Image()

        img.src = `https://www.google.com/s2/favicons?sz=64&domain_url=${url}`

        img.onload = (() => {
            if (img.height >= 64) {
                img.classList = 'favicon'
                img.alt = 'favicon'
                mid.replaceChildren(img)
            } else {
                const initial = this.shadowRoot.querySelector('.btm').innerText.charAt(0).toUpperCase()
                const div = document.createElement('div')
                div.classList = 'initial'
                div.innerText = initial
                mid.replaceChildren(div)
            }
        })
    }

    keyPressHandler = (e) => {
        if (e.key == 'Enter' || e.key == ' ') {
            this.open()
        }
    }

    open = () => {
        const url = this.httpsify(this.shadowRoot.host.getAttribute('url'))
        window.open(url, '_blank')
        this.shadowRoot.host.blur()
    }

}

customElements.define("link-widget", LinkWidget);