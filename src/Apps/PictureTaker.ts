import { html, TemplateResult } from "lit-html";
import { Component, Tag } from "../base/component";

@Tag('ph-picuturetaker')
class PictureTaker extends Component {
    async slotChnaged(event: any): Promise<void> {
        console.log(event);
    }
    Cropper: any;
    async ComponentDidMount(): Promise<void> {
        const video:any = this.root.getElementById('video');

    // Get access to the camera!
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            //video.src = window.URL.createObjectURL(stream);
            video.srcObject = stream;
            video.play();
        });
    }
    }

    async  ComponentWillUnmount(): Promise<void> {
        
    }

    async ComponentDidReceiedProps(propName: string, oldValue: any, newvalue: any): Promise<void> {
        
    }

    Style(): TemplateResult {
        return html`<style>
  #video {
    border: 1px solid black
}

#canvas {
  height: 290px;
  width: 650px;
  background-color: #ffffff;
  cursor: default;
  border: 1px solid black;
}

        </style>`
    }

    Template(): TemplateResult {
        return html`
        <h1>Picuture Taker</h1>
        <video id="video" width="300" height="250" autoplay></video>
        <img id="img" width="300" height="250"/>
        <canvas id="canvas" class="canvas" style="display:none" width="300" height="250"></canvas> <br/>
        <button id="snap" @click=${(e:any) => { 
            // Elements for taking the snapshot
            const canvas : any = this.root.getElementById('canvas');
            const context : any = canvas.getContext('2d');
            const video : any = this.root.getElementById('video');
            const img : any  = this.root.getElementById('img');
  

            // Trigger photo take
            context.drawImage(video, 0, 0, 300  , 250);
            img.src = canvas.toDataURL();
  
            } }>Snap Photo</button>
              <button id="Ok" @click=${(e:any) => { 
            // Elements for taking the snapshot
            const img : any  = this.root.getElementById('img');
  

            this.fireEvent("onCaptured" , img.src);
              }}
      >Ok!!</button>
            `
    }

    constructor() {
        super();
    }
}


export default PictureTaker;