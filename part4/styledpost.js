class PostCard extends HTMLElement {
    /**
     * called whem document.createElement ('post') is called, or
     * the element is written into DOM directly as <post>
     */
    constructor () {
        // inheret everything from HTMLElement
        super ();

        // attach the shadow DOM to this Web Component (leave the mode open)
        const shadow_dom =  this.attachShadow ({ mode: "open" });

        // create an <article> element - This will hold our markup once our data is set
        const article = document.createElement ("article");
        // create a style element - This will hold all of the styles for the Web Component
        const style = document.createElement ("style");

        style.textContent = 
        `
        <style>
        * {
            font-family: sans-serif;
            margin: 0;
            padding: 0;
            display: inline-block;
        }

        article {
            align-items: center;
            border: 1px solid black;
            border-radius: 8px;
            display: grid;
            grid-auto-flow: row dense;
            height: auto;
            padding: 0 16px 16px 16px;
            width: 250px;
            margin: 10px;
            background-color: rgb(172, 222, 176);
        }

        h2 {
            text-align: center;
            color: darkgreen;
        }

        span {
            font-size: 10px;
            text-align: right;
            color: darkgreen;
        }

        hr {
            width: 100%;        
        }

        p {
            color: black;
        }

        div {
            text-align: right;
        }

        </style>
        `;
        // append the <style> and <article> elements to the Shadow DOM
        shadow_dom.appendChild (article);
        shadow_dom.appendChild (style);
    }

    /**
     * called when the .data property is set on this element
     * 
     * @param  {Object} data - the data to pass into the <post>, must be of the
     *                         following format:
     *                          {
     *                           'title': 'string',
     *                           'date': 'string',
     *                           'summary': 'string'
     *                           }
     */
    set data (data) {
        if (!data) {
            return;
        }

        // select the <article> added to the Shadow DOM in the constructor
        const shadow_dom_article = this.shadowRoot.querySelector ("article");
        // set the contents of the <article> with the <article> template given in
        // cardTemplate.html and the data passed in (You should only have one <article>,
        // do not nest an <article> inside another <article>). You should use Template
        // literals (tempalte strings) and element.innerHTML for this.
        const {title, date, summary} = data;
        shadow_dom_article.innerHTML = 
        `
        <h2>
            ${title}
        </h2>
        <span>
            ${date}
        </span>
        
        <hr>

        <p>
            ${summary}
        </p>
        <br>
        <div>
            <button id='edit_btn'><img src='media/pencil.svg' alt='Edit' height='20'></button>
            <button id='delete_btn'><img src='media/trash.svg' alt='Delete' height='20'></button>
        </div>
        `;
    }

}

// define the class as a customElement for <post-card> elements
customElements.define('post-card', PostCard);