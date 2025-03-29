import{i as g,f as d,l as h,r as b,x as l}from"./index-c304ef2d.js";import{n as p,c as w}from"./if-defined-09170453.js";import"./index-6f011271.js";import"./index-2aad5d0a.js";const x=g`
  :host {
    display: block;
  }

  :host > button {
    gap: var(--wui-spacing-xxs);
    padding: var(--wui-spacing-xs);
    padding-right: var(--wui-spacing-1xs);
    height: 40px;
    border-radius: var(--wui-border-radius-l);
    background: var(--wui-color-gray-glass-002);
    border-width: 0px;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
  }

  :host > button wui-image {
    width: 24px;
    height: 24px;
    border-radius: var(--wui-border-radius-s);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }
`;var c=globalThis&&globalThis.__decorate||function(i,o,r,a){var s=arguments.length,t=s<3?o:a===null?a=Object.getOwnPropertyDescriptor(o,r):a,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(i,o,r,a);else for(var u=i.length-1;u>=0;u--)(n=i[u])&&(t=(s<3?n(t):s>3?n(o,r,t):n(o,r))||t);return s>3&&t&&Object.defineProperty(o,r,t),t};let e=class extends b{constructor(){super(...arguments),this.text=""}render(){return l`
      <button>
        ${this.tokenTemplate()}
        <wui-text variant="paragraph-600" color="fg-100">${this.text}</wui-text>
      </button>
    `}tokenTemplate(){return this.imageSrc?l`<wui-image src=${this.imageSrc}></wui-image>`:l`
      <wui-icon-box
        size="sm"
        iconColor="fg-200"
        backgroundColor="fg-300"
        icon="networkPlaceholder"
      ></wui-icon-box>
    `}};e.styles=[d,h,x];c([p()],e.prototype,"imageSrc",void 0);c([p()],e.prototype,"text",void 0);e=c([w("wui-token-button")],e);
