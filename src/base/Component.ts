import { html, render, TemplateResult } from "lit-html";
import { diff } from "deep-object-diff";
import axios from 'axios';
@sealed
export abstract class Component extends HTMLElement {

  props: any = {};
  state: any = {};
  root: ShadowRoot;

  abstract ComponentDidMount(): Promise<void>;
  abstract ComponentDidReceiedProps(propName:string , oldValue:any , newvalue:any): Promise<void>;
  abstract Style(): TemplateResult;
  abstract Template(): TemplateResult;

  async BuildProps() {
    debugger;
    let keys = this.getAttributeNames();
    if (keys.length === 0) return;
    let props: any = {};
    for (const key of keys) {
      if (key.toLowerCase().startsWith("data-")) {
        let obj = JSON.parse(this.getAttribute(key) || "{}");
        props[key.replace("data-", "")] = obj;
      } else {
        props[key] = this.getAttribute(key);
      }
    }
    var _diff = diff(props, this.props);
    this.props = props;
    if (Object.keys(_diff).length === 0) return;
    await this.PreRender();
  }

  get(url: string) {
    return new Promise((resolve, reject) => {
      axios.get(url).then(response => {
        resolve(response);
      })
        .catch(error => {
          resolve(error);
        })
        .finally(() => {
          this.Log(`GET Request finished for ${url}`)
        });
    });
  }

  post(url: string, data: any) {
    return new Promise((resolve, reject) => {
      axios.post(url, data, {
        headers: {
          'contentType': "application/x-www-form-urlencoded; charset=UTF-8"
        }
      })
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
        })
        .finally(() => {
          this.Log(`POST Request finished for ${url} ${JSON.stringify(data)}`)
        });
    })
  }
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    this.BuildProps();
    this.makeDynamicProps();
  }

  makeDynamicProps(){
    if (this.props && Object.keys(this.props).length) {
      // Loop through the observed attributes
      Object.keys(this.props).forEach(attribute => {
        // Dynamically define the property getter/setter
        Object.defineProperty(this, attribute, {
          get() { return this.getAttribute(attribute); },
          set(attrValue) {
            let oldValue = this.props[attribute];
            if (attrValue) {
              this.setAttribute(attribute, attrValue);
              this.BuildProps();
            } else {
              this.removeAttribute(attribute);
            }
            this.ComponentDidReceiedProps(attribute , oldValue, attrValue); 
          }
        });
      });
  }
}

  setState(object: any, preRender = true) {
    this.state = Object.assign(this.state, object);
    if (preRender === true) this.PreRender();
  }

  async PreRender() {
    render(html` ${this.Style()} ${this.Template()} `, this.root);
  }


  Log(...args: any[]) {
    if (this.props.debug) console.log(...args);
  }

  async connectedCallback() {
    await this.ComponentDidMount();
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    this.BuildProps();
  }

  fireEvent(_event: { type: string; value: any }) {
    this.dispatchEvent(
      new CustomEvent(_event.type, {
        detail: _event.value,
        bubbles: true,
        composed: true,
      })
    );
  }

  getProps() {
    return JSON.stringify(this.props, null, 4);
  }

  getState() {
    return JSON.stringify(this.state, null, 4);
  }
}

export function complex(obj: any) {
  return JSON.stringify(obj);
}

function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}


/**
 * @param  {string} tagName tag name
 */
export function Tag(tagName: string) {
  return (target: any) => {
    // implement class decorator here, the class decorator
    // will have access to the decorator arguments (filter)
    // because they are  stored in a closure

    window.customElements.define(tagName, target);
  };
}

export function Html(content: string) {
  return (target: any) => {
    target._template = content;
  }
}
