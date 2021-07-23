import { html, TemplateResult } from "lit-html";
import { Component, Tag } from "./../base/Component";

@Tag("ph-button")
class PhButton extends Component {
    async ComponentDidMount(): Promise<void> {
        console.log('component did mount')
    }
    async ComponentDidReceiedProps(propName:string , oldValue:any , newvalue:any): Promise<void> {
        console.log(propName, oldValue ,newvalue, "receivedProps")
    }
    Style(): TemplateResult {
        return html``;
    }
    Template(): TemplateResult {
        return html`<button class="${this.props["class"]}" id="${this.props.id}"> ${this.props.value} </button>`
    }
    
    
    constructor() {
        super();
        console.log("Button init")
    }
}

export default PhButton