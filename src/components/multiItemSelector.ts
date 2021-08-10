import { html, TemplateResult } from "lit-html";
import { Component, Tag } from "../base/Component";


@Tag('multi-item-selector')
export default class MultiItemSelector extends Component {
    async ComponentDidMount(): Promise<void> {
        
    }
    async ComponentWillUnmount(): Promise<void> {
        
    }
    async slotChnaged(event: any): Promise<void> {
        
    }
    async ComponentDidReceiedProps(propName: string, oldValue: any, newvalue: any): Promise<void> {
        
    }
    Style(): TemplateResult {
        return html`
            <style>
                .multi-item-selector {
                padding: 0;
                margin: 0;
                list-style: none;
                
                -ms-box-orient: horizontal;
                display: -webkit-box;
                display: -moz-box;
                display: -ms-flexbox;
                display: -moz-flex;
                display: -webkit-flex;
                display: flex;
                }

                .row { 
                -webkit-flex-direction: row; 
                flex-direction: row;
                }

                .column { 
                    -webkit-flex-direction: column; 
                    flex-direction: column; 
                    float: left;
                    }

                .flex-item {
                    padding: 5px;
                    margin: 5px;
                    line-height: 7px;
                    color: black;
                    font-size: 1em;
                    text-align: center;
                }

            </style>
        `
    }

    GetDropDown(data:any): TemplateResult {
        console.log(data , "data")
        const thisData = this.state.selectedItems.filter((x:any) => x[this.props.keyprop] !== data[x[this.props.keyprop]] )
        const dataToBind = this.props.data.filter((x:any) => {
            return (thisData.IndexOf(x[this.props.keyprop]) > -1)
        })
        return html`<select>
            ${dataToBind.map((u:any) => {
                return html`<option> ${u[this.props.textprop]}</option>`
            })}
        </select>`
    }

    Direction(){
        if(this.props.direction.toLowerCase() === "row" || this.props.direction.toLowerCase() === "column"){
            return this.props.direction.toLowerCase();
        }
        else "column";
    }
    Template(): TemplateResult {
        console.log(this.state.selectedItems)
        return html`
        <ul class="multi-item-selector  ${this.Direction()}"> 
            ${JSON.stringify(this.state.selectedItems?.map)}
        </ul>
        `
    }
    constructor() {
        super()
        this.state = {
            selectedItems : this.props.selectedItems || []
        }
        this.Log(this.props.keyprop , this.props.textprop, this.state.selectedItems)
    }
}