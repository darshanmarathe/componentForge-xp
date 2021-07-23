import { html, TemplateResult } from "lit-html";
import { Component, Tag } from "./../base/Component";

@Tag("ph-button")
class PhButton extends Component {
    async ComponentDidMount(): Promise<void> {
        console.log('component did mount')
    }
    async ComponentDidReceiedProps(propName:string , oldValue:any , newvalue:any): Promise<void> {
        if(propName === "count"){
            this.setState({count : newvalue});
        }
    }
    Style(): TemplateResult {
        return html``;
    }
    Template(): TemplateResult {
        return html`<input class="${this.props["class"]}" 
            id="${this.props.id}" disabled="${false}" /> 
            ${this.props.value} ${this.state.count}`
    }    
    constructor() {
        super();
        this.state = {
            count :parseInt( this.props.count),
        }
        this.SetCount()
    }

    SetCount() {
        const inter = setInterval(() => {
            console.log(this.state.count , "setCount") 
            if(this.state.count > 0){
                this.setState({count : this.state.count - 1})
            }else{
                clearInterval(inter)
            }
        }, 1000)
    }
}

export default PhButton