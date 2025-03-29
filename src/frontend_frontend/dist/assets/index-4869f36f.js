import{i as d,f as b,l as p,r as f,x as v}from"./index-c304ef2d.js";import{n as u,c as g,o as h}from"./if-defined-09170453.js";const m=d`
  button {
    padding: var(--wui-spacing-4xs) var(--wui-spacing-xxs);
    border-radius: var(--wui-border-radius-3xs);
    background-color: transparent;
    color: var(--wui-color-accent-100);
  }

  button:disabled {
    background-color: transparent;
    color: var(--wui-color-gray-glass-015);
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-005);
  }
`;var a=globalThis&&globalThis.__decorate||function(l,t,r,i){var s=arguments.length,o=s<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,r):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(l,t,r,i);else for(var c=l.length-1;c>=0;c--)(n=l[c])&&(o=(s<3?n(o):s>3?n(t,r,o):n(t,r))||o);return s>3&&o&&Object.defineProperty(t,r,o),o};let e=class extends f{constructor(){super(...arguments),this.tabIdx=void 0,this.disabled=!1,this.color="inherit"}render(){return v`
      <button ?disabled=${this.disabled} tabindex=${h(this.tabIdx)}>
        <slot name="iconLeft"></slot>
        <wui-text variant="small-600" color=${this.color}>
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `}};e.styles=[b,p,m];a([u()],e.prototype,"tabIdx",void 0);a([u({type:Boolean})],e.prototype,"disabled",void 0);a([u()],e.prototype,"color",void 0);e=a([g("wui-link")],e);
