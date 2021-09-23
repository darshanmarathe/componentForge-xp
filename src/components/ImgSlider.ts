import { html, TemplateResult } from "lit-html";
import { Component, Tag } from "../base/Component";

@Tag("img-slider")
export default class ImgSlider extends Component {
    async ComponentDidMount(): Promise<void> {
        this.InitSlider();
    }

    private InitSlider(){
        let currentSlide = 0;
        const slides: NodeListOf<Element> = this.root.querySelectorAll(".slide")
        const dots: NodeListOf<Element> = this.root.querySelectorAll('.dot')

        console.log(slides , dots);
        const init = (n: number) => {
            slides.forEach((slide: Element) => {
                (slide as HTMLElement).style.display = "none"
                dots.forEach((dot: Element) => {
                    dot.classList.remove("active")
                });
            });
            (slides[n] as HTMLElement).style.display = "block";
            dots[n].classList.add("active")
        }

        const next = (e: any) => {
            if (e) e.preventDefault();
            currentSlide >= slides.length - 1 ? currentSlide = 0 : currentSlide++
            init(currentSlide)
        }

        const prev = (e: any) => {
            if (e) e.preventDefault();
            currentSlide <= 0 ? currentSlide = slides.length - 1 : currentSlide--
            init(currentSlide)
        }


        this.root.querySelector(".next")?.addEventListener('click', next)

        this.root.querySelector(".prev")?.addEventListener('click', prev)


        setInterval(() => {
            next(null)
        }, 5000);

        dots.forEach((dot, i) => {
            dot.addEventListener("click", () => {
                init(i)
                currentSlide = i
            })
        })

        setTimeout(() => {
            init(currentSlide);
        }, 3000)
        init(currentSlide);
    }

    async ComponentWillUnmount(): Promise<void> {

    }
    async slotChnaged(event: any): Promise<void> {
        const slot = event.target;
        let items = slot.assignedElements();
        const Imgs: (string)[] = [];
        items.forEach((element:HTMLElement) => {
            if(element.tagName === "IMG") {
                    if(element.getAttribute("data-src") != null) {
                        element.style.display = 'none';
                        Imgs.push(element.getAttribute("data-src") || "");
                    }
                }
        });
        this.setState({Imgs})
    }
    async ComponentDidReceiedProps(propName: string, oldValue: any, newValue: any): Promise<void> {

    }
    Style(): TemplateResult {
        return html`
        <style>

.slide-container .prev,
.slide-container .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 20px;
  transition: all 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}

.slide-container .prev:hover,
.slide-container .next:hover {
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
}

.slide-container .prev {
  left: 2px;
}

.slide-container .next {
  right: 2px;
}

.dots-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.dots-container .dot {
  cursor: pointer;
  margin: 5px;
  width: 20px;
  height: 20px;
  color: #333;
  border-radius: 50%;
  background-color: #dfd6ce;
}

.dots-container .dot.active {
  border: 2px solid green;
}

* {
  padding: 0;
  border: 0;
  box-sizing: border-box;
}

body {
  height: 100%;
/*   background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%); */
}

body h1 {
  text-align: center;
}

.slide-container {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1000px;
  margin: auto;
  position: relative;
}

.slide-container img{
    max-width: 1000px;
    max-height: 600px;

}
.slide-container .slide {
  display: none;
  width: 100%;
}

.slide-container .slide.fade {
  animation: fade 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
}

.slide-container .slide img {
  width: 100%;
}
            </style>
        `
    }
    Template(): TemplateResult {
        return html`
        <div class="slide-container">
            <slot></slot>
            
            ${this.state.Imgs?.map((img: string , index:number) => {
                return html`<div class="slide fade">
            ${index === 0 ? html`<img src='${img}' alt=''>` 
            : html`<img src='${img}' loading="${this.props.loading || "lazy"}"alt=''>`}
        </div>`})}
        
            <a href="#" class="prev" title="Previous">&#10094</a>
            <a href="#" class="next" title="Next">&#10095</a>
        </div>
        <div class="dots-container">
            
            ${this.state.Imgs?.map((img: string) => html`<span class="dot"></span>`)}
            
        </div>
        
        `
    }

}