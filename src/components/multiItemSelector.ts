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
        
            switch (propName) {
                case "selecteditems":
                    debugger;
                    this.setState({selectedItems : [...newvalue , ""]});
                    break; 
                    
              
                default:
                    break;
            }
    }
    Style(): TemplateResult {
        return html`
            <style>
                .multi-item-selector {
                padding: 0;
                margin: 0;
                /* list-style: none;
                 */
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
    IsUniq(myArray:Array<any>): boolean {
        return myArray.length === new Set(myArray).size;
    }
      
    
    private replaceUniq(myArray:Array<any> , value:any){
        let foundOnes = false;
        myArray.forEach((item:any) => {
            if(value === "") {
            return;
            }
            if(item == value && foundOnes === true) {
                item = ""
            }
            if(item == value){
                foundOnes =true;
            }
        });
        return myArray;
    }
      

    GetDropDown(data:any, index:number): TemplateResult {
            return html`<li>
                <select  data-index="${index}" @change="${(e:any) => {
                    const index = parseInt(e.target?.getAttribute('data-index'));
                    const value = e.target?.value; 
                    let {selectedItems }= this.state;
                    selectedItems[index] = value;
                   // this.setState({selectedItems ,isValid : this.IsUniq(selectedItems)});
                   this.setState({selectedItems :this.replaceUniq(selectedItems , data) ,
                    isValid : this.IsUniq(selectedItems)});

            }}">
            <option value="">${this.props.placeholder}</option>
            ${this.props.data.map((u:any) => {
                if(data == u[this.props.keyprop]) { 
                    return html`<option value="${u[this.props.keyprop]}" selected> ${u[this.props.textprop]}</option>`
                }
                return html`<option value="${u[this.props.keyprop]}"> ${u[this.props.textprop]}</option>`
            })}
            </select>
            ${(index === this.state.selectedItems.length -1
            && parseInt(this.props.maxlength) > this.state.selectedItems.length)  ? 
            html`<button @click="${(e:any) => {
                e.preventDefault();
                console.log(e.target.value)
                if(this.state.selectedItems[index] === "") return;
                    this.setState({selectedItems : [...this.state.selectedItems , ""]})
            }}">Add </button>` : 
            html`<button @click="${(e:any) => {
                e.preventDefault();
               this.state.selectedItems.splice(index, 1);
               const newArray = this.state.selectedItems;
                this.setState({selectedItems : newArray , isValid : this.IsUniq(newArray)})
            }}">X</button>`}
            </li>`
    }

    Direction(){
        if(this.props.direction.toLowerCase() === "row" || this.props.direction.toLowerCase() === "column"){
            return this.props.direction.toLowerCase();
        }
        else "column";
    }
    Template(): TemplateResult {
        if(this.props.data == "" || this.props.selecteditems == "") return html``
        return html`
        <ol class="multi-item-selector  ${this.Direction()}"> 
            
        ${this.state.selectedItems?.map((u:any , index :number) => {
            return  this.GetDropDown(u , index);
        })}
        </ol>
        <br>
        [${this.state.selectedItems?.join(",")}] <br>
        isValid : ${this.state.isValid}
        `
    }
    constructor() {
        super()
        this.state = {
            selectedItems : this.props.selectedItems || [""],
            isValid : true
        }
        if(this.state.selectedItems[0] !== "") this.state.selectedItems.push("");
    }
}