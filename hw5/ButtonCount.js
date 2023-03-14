class ButtonCount extends HTMLElement {
    constructor () {
        super ();

        const shadow_dom = this.attachShadow ({ mode: "open" });

        let times = 0;
        const button = document.createElement ("button");
        button.textContent = `Times Clicked: ${times}`;

        button.addEventListener ('click', () => {
            times++;
            button.textContent = `Times Clicked: ${times}`;
        });

        shadow_dom.appendChild (button);
    }
}

customElements.define('button-count', ButtonCount);