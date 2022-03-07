import { Component, html } from "../lib/componentForge.js";

export  class MyComponent extends Component {
  Template() {
 
    return html`
      <h1>Hello ${this.props.name}</h1>
      <hr />
      Count : ${this.state.count}
      <br />
      <button
        @click="${(e) => {
          this.setState({ count: (this.state.count || 0) + 1 })
          this.fireEvent("change", "value" , this.state.count)
        
        }}">
        +
      </button>
      <button
        @click="${(e) => {
          this.setState({ count: (this.state.count || 0) - 1 });
          this.fireEvent("change", "value" , this.state.value)
        
        }}"
      >
        -
      </button>
    `;
  }
  state = {
    count: 0,
  };

  constructor() {
    super();
    debugger;
    if(this.props.value == null) throw new Error("value property is required.") 
   
  }

  Style() {
    return html` <style></style> `;
  }
}


export  class DailPad extends Component {
    constructor(){
        super();
        this.state = {
            number : this.props.number || ""
        }

    }
    Template()
    {
        return html`<input type=${this.props.number} /> <br />
             <button>1</button><button>2</button><button>3</button><br />
             <button>4</button><button>5</button><button>6</button><br />
             <button>7</button><button>8</button><button>9</button><br />
             <button>*</button><button>0</button><button>#</button><br />
        
        `
    }

    Style() {
        return html`<style>
            button {
                height:60px;
                width:60px;
            }

            input {
                width:175px;
                height:40px;
            }
        </style>`
    }
}

window.customElements.define("my-comp", MyComponent);
window.customElements.define("dail-pad", DailPad);
