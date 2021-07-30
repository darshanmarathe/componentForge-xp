import { html, TemplateResult } from "lit-html";
import { Component, Tag } from "./../base/Component";
@Tag("ph-todolist")
export default class TodoList extends Component {
    async slotChnaged(event: any): Promise<void> {
        console.log(event);
    }
    async ComponentWillUnmount(): Promise<void> {
        
    }

    constructor() {
        super();
        this.setState({ todos: [] })
    }
    async ComponentDidMount(): Promise<void> {

    }
    async ComponentDidReceiedProps(propName: string, oldValue: any, newValue: any): Promise<void> {
console.log(propName , newValue)
    }
    Style(): TemplateResult {
        return html``
    }

    GetTodoText(t:any){
        return t.done === true ? html`<del>${t.todo} </del>` : t.todo
    }
    Template(): TemplateResult {
        return html`
        <h1>TodoList (${this.state.todos?.length})</h1> 
        <img width="100" height="100" src=${this.props.ownerimg} />
        <hr>
        <input type="text" placeholder="Enter todo..." @keyup="${(e: any) => {
                if (e.key === "Enter") {
                    this.setState({ todos: [...this.state.todos, CreateTodo(e.target.value)] })
                    e.target.value = '';
                    this.fireEvent("onTodosChanged" , this.state.todos);
                }
            }}" />
        <ul>
            ${this.state.todos?.map((todo: any) => {
                return html`
                    <li> ${this.GetTodoText(todo)} <button @click=${(e: any) => {
                        const filterdTodos = this.state.todos.filter((to: any) => {
                            return to.id != todo.id;
                        })
                        this.fireEvent("onTodosChanged" , filterdTodos);
                        this.setState({ todos: filterdTodos })
                    }}>x</button>
                    <button @click=${() => {
                        const mappedTodo = this.state.todos.map((cTodo: any) => {
                           console.log(cTodo)
                            if(cTodo.id === todo.id){
                                cTodo.done =  !cTodo.done
                             }

                            return cTodo;
                        })
                        this.fireEvent("onTodosChanged" , mappedTodo);
                        this.setState({ todos: mappedTodo })
                    }}>Y</button>
                    </li>
                `
            })}
        </ul>
        `;
    }



}

function UUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
       var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
       return v.toString(16);
    });
 }

function CreateTodo(todo:string) {
    return {
        todo,
        id : UUID(),
        done : false 
    }
}