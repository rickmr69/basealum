customElements.define("mi-footer", class extends HTMLElement {
    connectedCallback() {
    this.textContent = "Copyright © 2020 Ricardo Armando Machorro Reyes";
    }
    }, { extends: "footer" });