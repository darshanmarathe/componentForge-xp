import { _ } from "core-js";
import { html, TemplateResult } from "lit-html";
import { Component, Tag } from "../base/Component";

@Tag('TabView')
export default class TabView extends Component {
    async ComponentDidMount(): Promise<void> {
        
    }
    async ComponentWillUnmount(): Promise<void> {
        
    }
    async slotChnaged(event: any): Promise<void> {
        
    }
    async ComponentDidReceiedProps(propName: string, oldValue: any, newvalue: any): Promise<void> {
        
    }
    Style(): TemplateResult {
        return html`<style>
 :host { display: flex; flex-direction: column; }
                    :host([direction="column"]) { flex-direction: row; }
                    :host([direction="column"]) .tabs { flex-direction: column; }
                    .tabs { display: flex; flex-direction: row; flex-wrap: nowrap; gap: var(--tab-gap, 0px); }
                    
                    .tabs ::slotted(*) { padding: 5px; border: 1px solid #ccc; user-select: none; cursor: pointer; }
                    .tabs ::slotted(.selected) { background: #efefef; }
                    .tab-contents ::slotted(*) { display: none; }
                    .tab-contents ::slotted(.selected) { display: block; padding: 5px; }
        </style>`;
    }
    Template(): TemplateResult {
        return html`
         <div class="tabs">
                    <slot id="tab-slot" name="tab"></slot>
                </div>
                <div class="tab-contents">
                    <slot id="content-slot" name="content"></slot>
                </div>
        `;
    }
    constructor() {
        super()
    }
}

@Tag("TabPanel")
export class TabPanel extends Component {
    async ComponentDidMount(): Promise<void> {
        
    }
    async ComponentWillUnmount(): Promise<void> {
        
    }
    async slotChnaged(event: any): Promise<void> {
        
    }
    async ComponentDidReceiedProps(propName: string, oldValue: any, newvalue: any): Promise<void> {
        
    }
    Style(): TemplateResult {
      return html``;  
    }
    Template(): TemplateResult {
      return html``;  
    }
    constructor() {
        super();
    }
}