import { html, TemplateResult } from "lit-html";
import { Component, Tag } from "../base/Component";

@Tag('ph-dyntable')
export default class DynTable extends Component {
    async ComponentDidMount(): Promise<void> {

    }

    async ComponentWillUnmount(): Promise<void> {

    }
    async ComponentDidReceiedProps(propName: string, oldValue: any, newvalue: any): Promise<void> {
        console.log(propName, newvalue, Array.isArray(this.props.data))
    }
    Style(): TemplateResult {
        return html`<style>
            /* Tables */
table{
    width:100%;
    margin-bottom:1em;
    border-collapse: collapse;
}
th{
    font-weight:bold;
    background-color:#ddd;
}
th,
td{
    padding:0.5em;
    border:1px solid #ccc;
}

        </style>`
    }
    Template(): TemplateResult {
        if (!Array.isArray(this.props.data)) return html`<div> No Data found. </div>`
        return html`<table>
    ${this.tHead()}
    ${this.tBody()}

</table>`
    }
    constructor() {
        super();
    }
    tHead(): TemplateResult {
        if (this.props.data.length === 0) return html`<thead></thead>`
        const firstObj = this.props.data[0];
        const keys = Object.keys(firstObj);
        return html`
        <thead>
            ${keys.map(k => html`<th>${k}</th>`)}
        </thead>
        `
    }


    tBody(): TemplateResult {
        if (this.props.data.length === 0) return html`<thead></thead>`
        
        return html`<tbody>
            ${this.props.data.map((row:any) => { return html`<tr>
                ${ Object.values(row).map((v:any) => html`<td>${v}</td>` )}
            </tr>` })}
        </tbody>`
    }
}

