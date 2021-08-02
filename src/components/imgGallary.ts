import { html, TemplateResult } from "lit-html";
import { Component, Tag } from "../base/Component";

@Tag('img-gallary')
export default class ImgGallary  extends Component {
    async slotChnaged(event: any): Promise<void> {
        const slot = event.target;
        let items = slot.assignedElements();
        console.log(this);
        items.forEach((element:HTMLElement, index: number) => {
            element.style.width = '100px';
            element.style.height = '100px'
            if(index ===0){
                this.root.querySelector('#main')?.setAttribute("src", element.getAttribute("src") || 
                "");
            }
            element.addEventListener('click' , ({target}) => {
                debugger;
                const elem = target as HTMLElement;
                this.root.querySelector('#main')?.setAttribute("src", elem.getAttribute("src") || 
                "");
                this.fireEvent("imageSelected" , elem.getAttribute("src"));
            })
        });        
        console.log(slot.assignedElements()[0].querySelectorAll('.thumb').length);
    }
    async ComponentDidMount(): Promise<void> {
        
    }
    async ComponentWillUnmount(): Promise<void> {
        
    }
    async ComponentDidReceiedProps(propName: string, oldValue: any, newvalue: any): Promise<void> {
        
    }
    Style(): TemplateResult {
        return html`<style>
           slot[name="images"] > .thumb{
                height: 100px !important;
                width: 100px !important;
            }

            #main {
                height: 250px !important;
                width: 250px !important;
            
            }
        </style>`    
    }
    Template(): TemplateResult {
        return html`
            <img id="main" />
        <br>
        <slot></slot>`
    }
    constructor() {
    super();       
    }
}