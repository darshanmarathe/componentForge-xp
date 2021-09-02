import { html, TemplateResult } from "lit-html";
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';

import { Component, Tag } from "../base/Component";


let howtoTabCounter = 0;
let howtoPanelCounter = 0;

const KEYCODE = {
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    HOME: 36,
    END: 35,
};


@Tag('x-tabs-view')
export class TabView extends Component {
    private _tabSlot: any;
    private _panelSlot: any;
    async ComponentDidMount(): Promise<void> {
     debugger;
        this.addEventListener('keydown', this._onKeyDown);
        this.addEventListener('click', this._onClick);

        if (!this.hasAttribute('role'))
            this.setAttribute('role', 'tablist');

        Promise.all([
            window.customElements.whenDefined('x-tab'),
            window.customElements.whenDefined('x-panel'),
        ])
            .then(_ => this._linkPanels());
    }
    async ComponentWillUnmount(): Promise<void> {
        this.removeEventListener('keydown', this._onKeyDown);
        this.removeEventListener('click', this._onClick);
    }
    async slotChnaged(event: any): Promise<void> {
        this._linkPanels();
    }

    private _linkPanels() {
        const tabs = this._allTabs();
        tabs.forEach(tab => {
            const panel = tab.nextElementSibling;
            if (panel?.tagName.toLowerCase() !== 'x-panel') {
                console.error(`Tab #${tab.id} is not a` +
                    `sibling of a <x-panel>`);
                return;
            }

            tab.setAttribute('aria-controls', panel.id);
            panel.setAttribute('aria-labelledby', tab.id);
        });

        const selectedTab =
            tabs.find((tab:any) => tab.selected) || tabs[0];

        this._selectTab(selectedTab);


    }


    private _allPanels(): Array<Panel> {
        return Array.from(this.querySelectorAll('x-panel'));
    }
    private _allTabs(): Array<Tab> {
        return Array.from(this.querySelectorAll('x-tab'));
    }

    private _panelForTab(tab: HTMLElement): HTMLElement | null {
        const panelId = tab.getAttribute('aria-controls');
        return this.querySelector(`#${panelId}`);
    }

    private _prevTab(): Tab {
        const tabs = this._allTabs();
        let newIdx =
            tabs.findIndex((tab: any) => tab.selected) - 1;
        return tabs[(newIdx + tabs.length) % tabs.length];


    }

    private _firstTab() {
        const tabs = this._allTabs();
        return tabs[0];
    }

    private _lastTab() {
        const tabs = this._allTabs();
        return tabs[tabs.length - 1];
    }
    private _nextTab() {
        const tabs = this._allTabs();
        let newIdx = tabs.findIndex((tab:any) => tab?.selected) + 1;
        return tabs[newIdx % tabs.length];
    }
    async ComponentDidReceiedProps(propName: string, oldValue: any, newvalue: any): Promise<void> {

    }


    private reset() {
        const tabs = this._allTabs();
        const panels = this._allPanels();

        tabs.forEach((tab: any) => tab.selected = false);
        panels.forEach((panel: Panel) => panel.hidden = true);
    }

    private _selectTab(newTab: any) {
        this.reset();
        const newPanel = this._panelForTab(newTab);
        if (!newPanel)
            throw new Error(`No panel with id ${newPanel}`);
        newTab.selected = true;
        newPanel.hidden = false;
        newTab.focus();
    }

    private _onKeyDown(event: any) {
        console.log("_onKeyDown" , event);
        if (event.target.getAttribute('role') !== 'tab')
            return;


        if (event.altKey)
            return;

        let newTab: Tab;
        switch (event.keyCode) {
            case KEYCODE.LEFT:
            case KEYCODE.UP:
                newTab = this._prevTab();
                break;

            case KEYCODE.RIGHT:
            case KEYCODE.DOWN:
                newTab = this._nextTab();
                break;

            case KEYCODE.HOME:
                newTab = this._firstTab();
                break;

            case KEYCODE.END:
                newTab = this._lastTab();
                break;

            default:
                return;
        }

        event.preventDefault();

        this._selectTab(newTab);
    }


    private _onClick(event: any) {
        console.log("_onClick" , event);
        if (event.target.getAttribute('role') !== 'tab')
            return;

        this._selectTab(event.target);
    }


    Style(): TemplateResult {
        return html`<style>
 :host {
        display: flex;
        flex-wrap: wrap;
      }
      ::slotted(x-panel) {
        flex-basis: 100%;
      }  
            </style>`;
    }
    Template(): TemplateResult {
        return html`
        <slot name="tab"></slot>
        <slot name="panel"></slot>
        `;
    }
    constructor() {
        super()
        this._tabSlot = this.root.querySelector('slot[name=tab]');
        this._panelSlot = this.root.querySelector('slot[name=panel]');
console.log(this._tabSlot , this._panelSlot);
    }
}
@Tag("x-panel")
export class Panel extends Component {
    static get observedAttributes() {
        return ['hidden'];
    }

    async ComponentDidMount(): Promise<void> {
        this.setAttribute('role', 'tabpanel');
        if (!this.id)
            this.id = `panel-generated-${howtoPanelCounter++}`;
    }
    async ComponentWillUnmount(): Promise<void> {
    }

    async slotChnaged(event: any): Promise<void> {

    }
    async ComponentDidReceiedProps(propName: string, oldValue: any, newValue: any): Promise<void> {

    }
    Style(): TemplateResult {
        return html``;
    }

    Template(): TemplateResult {
        return html`${unsafeHTML(this.innerHTML)}`;
    }

}

@Tag("x-tab")
export class Tab extends Component {
    static get observedAttributes() {
        return ['selected'];
    }



    async ComponentDidMount(): Promise<void> {

        this.setAttribute('role', 'tab');
        if (!this.id)
            this.id = `howto-tab-generated-${howtoTabCounter++}`;

        this.setAttribute('aria-selected', 'false');
        this.setAttribute('tabindex', '-1');
        this._upgradeProperty('selected');
    }

    private _upgradeProperty(prop: string) {
        if (this.hasOwnProperty(prop)) {
            // TODO :: Need to revisit this 
            // @ts-ignore
            let value = this [prop];
            // @ts-ignore
            delete this[prop];
            // @ts-ignore
            this[prop] = value;
        }
    }
    async ComponentWillUnmount(): Promise<void> {

    }
    async slotChnaged(event: any): Promise<void> {

    }
    async ComponentDidReceiedProps(propName: string, oldValue: any, newvalue: any): Promise<void> {
        const value = this.hasAttribute('selected');
        this.setAttribute('aria-selected', value.toString());
        this.setAttribute('tabindex', (value ? 0 : -1).toString());
    }
    Style(): TemplateResult {
        return html``;
    }
    Template(): TemplateResult {
        return html`${unsafeHTML(this.innerHTML)}`;
    }
    constructor() {
        super();
    }
}