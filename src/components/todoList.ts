    import { html, TemplateResult } from "lit-html";
import { Component, Tag } from "./../base/Component";
@Tag("ph-todolist")
export default class TodoList extends Component {

    constructor(){
        super();
        this.setState({todos :  []})
    }
    async ComponentDidMount(): Promise<void> {
        
    }
    async ComponentDidReceiedProps(propName: string, oldValue: any, newvalue: any): Promise<void> {
        
    }
    Style(): TemplateResult {
        return html``
    }
    Template(): TemplateResult {
        return html`
        <h1>TodoList (${this.state.todos?.length})</h1>
        <hr>
        <input type="text" placeholder="Enter todo..." @keyup="${(e:any) => {
            if(e.key === "Enter"){
                this.setState({ todos : [...this.state.todos , e.target.value] })
                e.target.value = '';
            }
        }}" />
        <ul>
            ${this.state.todos?.map((t:any) => {
                return html`
                    <li> ${t} <button @click=${(e:any) => { 
                       const filterdTodos = this.state.todos.filter((to:any) => {
                           return to != t;
                       } ) 
                       this.setState({todos : filterdTodos})
                    }}>x</button></li>
                `
            })}
        </ul>
        `;
    }

   

}