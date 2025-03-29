import{i as d,f as p,K as u,r as m,x as f}from"./index-c304ef2d.js";import{n,c as g}from"./if-defined-09170453.js";const b=d`
  :host {
    display: block;
    width: var(--local-width);
    height: var(--local-height);
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    border-radius: inherit;
  }
`;var a=globalThis&&globalThis.__decorate||function(o,t,r,s){var l=arguments.length,e=l<3?t:s===null?s=Object.getOwnPropertyDescriptor(t,r):s,c;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")e=Reflect.decorate(o,t,r,s);else for(var h=o.length-1;h>=0;h--)(c=o[h])&&(e=(l<3?c(e):l>3?c(t,r,e):c(t,r))||e);return l>3&&e&&Object.defineProperty(t,r,e),e};let i=class extends m{constructor(){super(...arguments),this.src="./path/to/image.jpg",this.alt="Image",this.size=void 0}render(){return this.style.cssText=`
      --local-width: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};
      --local-height: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};
      `,f`<img src=${this.src} alt=${this.alt} @error=${this.handleImageError} />`}handleImageError(){this.dispatchEvent(new CustomEvent("onLoadError",{bubbles:!0,composed:!0}))}};i.styles=[p,u,b];a([n()],i.prototype,"src",void 0);a([n()],i.prototype,"alt",void 0);a([n()],i.prototype,"size",void 0);i=a([g("wui-image")],i);
