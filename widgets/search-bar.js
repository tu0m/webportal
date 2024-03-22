import sheet from './style.css?inline'
import searchEngines from './searchengines.json'

class SearchBar extends HTMLElement {

    constructor() {
        super();
    }

    static get observedAttributes() {
        // attributeChangedCallback() is triggered only by the attributes listed here
        return ['searchengine']
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: "open" })

        // add css
        const moduleSheet = new CSSStyleSheet()
        moduleSheet.replaceSync(sheet)
        shadowRoot.adoptedStyleSheets = [moduleSheet]

        // add html
        const layout = `
        <label for="searchbar"></label>
        <div class="container">
            <input type="search" id="searchbar" name="q" />
            <span class="tab-icon" hidden>Tab</span>
        </div>
        <button>➤</button>
        `
        this.shadowRoot.innerHTML = layout

        // dom references
        this.label = this.shadowRoot.querySelector('label')
        this.input = this.shadowRoot.querySelector('input')
        this.button = this.shadowRoot.querySelector('button')

        // event listeners
        this.label.addEventListener('click', this.showSearchEngines)
        this.input.addEventListener('keydown', this.keyPressHandler)
        this.input.addEventListener('input', this.toggleTabIcon)
        this.button.addEventListener('click', this.search)
    }

    disconnectedCallback() {
        this.label.removeEventListener('click', this.showSearchEngines)
        this.input.removeEventListener('keydown', this.keyPressHandler)
        this.input.removeEventListener('input', this.toggleTabIcon)
        this.button.removeEventListener('click', this.search)
    }

    async attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return

        // this thing waits for this.label to become defined, because attributeChangedCallback() is called before connectedCallback()
        while (this.label == undefined) {
            await new Promise(resolve => requestAnimationFrame(resolve))
        }

        this.label.innerText = newValue
        this.searchEngineName = newValue
    }

    showSearchEngines = (e) => {
        // TODO: open popup that lists all available search engines
        // update search-bar attribute on click?
    }

    changeSearchEngine(key) {
        if (searchEngines[key].name.length) {
            this.setAttribute('searchengine', searchEngines[key].name)
        }
    }

    keyPressHandler = (e) => {
        if (e.key == 'Tab') {
            if (this.searchQuery.length != 1) return
            // this checks if the entered character is found in the searchEngines.json
            if (searchEngines[this.searchQuery.toLowerCase()]?.name.length) {
                e.preventDefault()
                this.setAttribute('searchengine', searchEngines[this.searchQuery.toLowerCase()].name)
                this.input.value = ""
                this.toggleTabIcon()
            }
        }

        if (e.key == 'Enter') {
            this.search()
        }
    }

    toggleTabIcon = (e) => {
        // this checks that there is 1 character in input and if the entered character is found in the searchEngines.json
        if (this.searchQuery.length == 1 && searchEngines[this.searchQuery.toLowerCase()]?.name.length) {
            this.shadowRoot.querySelector('span').removeAttribute('hidden')
        } else {
            this.shadowRoot.querySelector('span').setAttribute('hidden', true)
        }
    }


    get searchQuery() {
        return this.input.value
    }

    get searchEngineUrl() {
        // what a monster... TODO: maybe make this more readable some day
        return Object.values(searchEngines).filter(item => item.name == this.searchEngineName)[0].url
    }

    search = () => {
        if (this.searchQuery.length == 0) return
        const url = this.searchEngineUrl + this.searchQuery
        window.open(url, '_blank')
        this.input.value = ""
        this.toggleTabIcon()
        this.input.blur()
    }
}

customElements.define("search-bar", SearchBar);
