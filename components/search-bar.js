// Create a class for the element
class SearchBar extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: "open" });
        const layout = `
        <label for="searchbar">Google</label>
        <input type="search" id="searchbar" name="q" />
        <button>➤</button>
        `
        shadowRoot.innerHTML = layout
        console.log('hello world')

    }

    disconnectedCallback() {
    }

    adoptedCallback() {
    }

    attributeChangedCallback(name, oldValue, newValue) {
    }
}

customElements.define("search-bar", SearchBar);
