import{A as p,n as w,k as T,R as h,C as v,S as m,j as c,t as _,i as y,f as b,r as x,x as d,l as $}from"./index-c304ef2d.js";import{n as u,c as C,o as j}from"./if-defined-09170453.js";function E(){try{return c.returnOpenHref("","popupWindow","width=600,height=800,scrollbars=yes")}catch{throw new Error("Could not open social popup")}}async function R(){h.push("ConnectingFarcaster");const e=v.getAuthConnector();if(e&&!p.state.farcasterUrl)try{const{url:o}=await e.provider.getFarcasterUri();p.setFarcasterUrl(o,w.state.activeChain)}catch(o){h.goBack(),m.showError(o)}}async function O(e){h.push("ConnectingSocial");const o=v.getAuthConnector();let t=null;try{const i=setTimeout(()=>{throw new Error("Social login timed out. Please try again.")},45e3);if(o&&e){if(c.isTelegram()||(t=E()),t)p.setSocialWindow(t,w.state.activeChain);else if(!c.isTelegram())throw new Error("Could not create social popup");const{uri:n}=await o.provider.getSocialRedirectUri({provider:e});if(!n)throw t==null||t.close(),new Error("Could not fetch the social redirect uri");if(t&&(t.location.href=n),c.isTelegram()){_.setTelegramSocialProvider(e);const r=c.formatTelegramSocialLoginUrl(n);c.openHref(r,"_top")}clearTimeout(i)}}catch(i){t==null||t.close(),m.showError(i==null?void 0:i.message)}}async function F(e){p.setSocialProvider(e,w.state.activeChain),T.sendEvent({type:"track",event:"SOCIAL_LOGIN_STARTED",properties:{provider:e}}),e==="farcaster"?await R():await O(e)}const L=y`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-3xl);
    border: 1px solid var(--wui-color-gray-glass-005);
    overflow: hidden;
  }

  wui-icon {
    width: 100%;
    height: 100%;
  }
`;var S=globalThis&&globalThis.__decorate||function(e,o,t,i){var n=arguments.length,r=n<3?o:i===null?i=Object.getOwnPropertyDescriptor(o,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(e,o,t,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(o,t,r):a(o,t))||r);return n>3&&r&&Object.defineProperty(o,t,r),r};let f=class extends x{constructor(){super(...arguments),this.logo="google"}render(){return d`<wui-icon color="inherit" size="inherit" name=${this.logo}></wui-icon> `}};f.styles=[b,L];S([u()],f.prototype,"logo",void 0);f=S([C("wui-logo")],f);const U=y`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
    justify-content: flex-start;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
  }

  wui-text {
    text-transform: capitalize;
  }

  wui-text[data-align='left'] {
    display: flex;
    flex: 1;
  }

  wui-text[data-align='center'] {
    display: flex;
    flex: 1;
    justify-content: center;
  }

  .invisible {
    opacity: 0;
    pointer-events: none;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }
`;var g=globalThis&&globalThis.__decorate||function(e,o,t,i){var n=arguments.length,r=n<3?o:i===null?i=Object.getOwnPropertyDescriptor(o,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(e,o,t,i);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(r=(n<3?a(r):n>3?a(o,t,r):a(o,t))||r);return n>3&&r&&Object.defineProperty(o,t,r),r};let l=class extends x{constructor(){super(...arguments),this.logo="google",this.name="Continue with google",this.align="left",this.disabled=!1}render(){return d`
      <button ?disabled=${this.disabled} tabindex=${j(this.tabIdx)}>
        <wui-logo logo=${this.logo}></wui-logo>
        <wui-text
          data-align=${this.align}
          variant="paragraph-500"
          color="inherit"
          align=${this.align}
          >${this.name}</wui-text
        >
        ${this.templatePlacement()}
      </button>
    `}templatePlacement(){return this.align==="center"?d` <wui-logo class="invisible" logo=${this.logo}></wui-logo>`:null}};l.styles=[b,$,U];g([u()],l.prototype,"logo",void 0);g([u()],l.prototype,"name",void 0);g([u()],l.prototype,"align",void 0);g([u()],l.prototype,"tabIdx",void 0);g([u({type:Boolean})],l.prototype,"disabled",void 0);l=g([C("wui-list-social")],l);export{F as e};
