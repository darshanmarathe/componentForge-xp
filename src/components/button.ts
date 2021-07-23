import { html, TemplateResult } from "lit-html";
import { Component, Tag } from "./../base/Component";

Tag({
    name : "forge-button",
    template : html`<button>{props?.value}/button>`,
    style : html`button { color : 'red' }`
})
class Button extends Component {
    ComponentDidMount(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    ComponentDidReceiedProps(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    Style(): TemplateResult {
        throw new Error("Method not implemented.");
    }
    Template(): TemplateResult {
        throw new Error("Method not implemented.");
    }
    
    
    constructor() {
        super();
    }
}

export default Button