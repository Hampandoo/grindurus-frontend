import{_ as k,$ as B,a0 as A,i as P,f as R,K as M,r as L,x as E,a1 as o,V as j}from"./index-c304ef2d.js";const h={getSpacingStyles(e,t){if(Array.isArray(e))return e[t]?`var(--wui-spacing-${e[t]})`:void 0;if(typeof e=="string")return`var(--wui-spacing-${e})`},getFormattedDate(e){return new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"}).format(e)},getHostName(e){try{return new URL(e).hostname}catch{return""}},getTruncateString({string:e,charsStart:t,charsEnd:i,truncate:a}){return e.length<=t+i?e:a==="end"?`${e.substring(0,t)}...`:a==="start"?`...${e.substring(e.length-i)}`:`${e.substring(0,Math.floor(t))}...${e.substring(e.length-Math.floor(i))}`},generateAvatarColors(e){const i=e.toLowerCase().replace(/^0x/iu,"").replace(/[^a-f0-9]/gu,"").substring(0,6).padEnd(6,"0"),a=this.hexToRgb(i),n=getComputedStyle(document.documentElement).getPropertyValue("--w3m-border-radius-master"),s=100-3*Number(n==null?void 0:n.replace("px","")),c=`${s}% ${s}% at 65% 40%`,_=[];for(let v=0;v<5;v+=1){const d=this.tintColor(a,.15*v);_.push(`rgb(${d[0]}, ${d[1]}, ${d[2]})`)}return`
    --local-color-1: ${_[0]};
    --local-color-2: ${_[1]};
    --local-color-3: ${_[2]};
    --local-color-4: ${_[3]};
    --local-color-5: ${_[4]};
    --local-radial-circle: ${c}
   `},hexToRgb(e){const t=parseInt(e,16),i=t>>16&255,a=t>>8&255,n=t&255;return[i,a,n]},tintColor(e,t){const[i,a,n]=e,r=Math.round(i+(255-i)*t),s=Math.round(a+(255-a)*t),c=Math.round(n+(255-n)*t);return[r,s,c]},isNumber(e){return{number:/^[0-9]+$/u}.number.test(e)},getColorTheme(e){var t;return e||(typeof window<"u"&&window.matchMedia?(t=window.matchMedia("(prefers-color-scheme: dark)"))!=null&&t.matches?"dark":"light":"dark")},splitBalance(e){const t=e.split(".");return t.length===2?[t[0],t[1]]:["0","00"]},roundNumber(e,t,i){return e.toString().length>=t?Number(e).toFixed(i):e},formatNumberToLocalString(e,t=2){return e===void 0?"0.00":typeof e=="number"?e.toLocaleString("en-US",{maximumFractionDigits:t,minimumFractionDigits:t}):parseFloat(e).toLocaleString("en-US",{maximumFractionDigits:t,minimumFractionDigits:t})}};function U(e,t){const{kind:i,elements:a}=t;return{kind:i,elements:a,finisher(n){customElements.get(e)||customElements.define(e,n)}}}function H(e,t){return customElements.get(e)||customElements.define(e,t),t}function O(e){return function(i){return typeof i=="function"?H(e,i):U(e,i)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const N={attribute:!0,type:String,converter:k,reflect:!1,hasChanged:B},F=(e=N,t,i)=>{const{kind:a,metadata:n}=i;let r=globalThis.litPropertyMetadata.get(n);if(r===void 0&&globalThis.litPropertyMetadata.set(n,r=new Map),r.set(i.name,e),a==="accessor"){const{name:s}=i;return{set(c){const _=t.get.call(this);t.set.call(this,c),this.requestUpdate(s,_,e)},init(c){return c!==void 0&&this.P(s,void 0,e),c}}}if(a==="setter"){const{name:s}=i;return function(c){const _=this[s];t.call(this,c),this.requestUpdate(s,_,e)}}throw Error("Unsupported decorator location: "+a)};function l(e){return(t,i)=>typeof i=="object"?F(e,t,i):((a,n,r)=>{const s=n.hasOwnProperty(r);return n.constructor.createProperty(r,s?{...a,wrapped:!0}:a),s?Object.getOwnPropertyDescriptor(n,r):void 0})(e,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ct(e){return l({...e,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const W=e=>e===null||typeof e!="object"&&typeof e!="function",G=e=>e.strings===void 0;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const V={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},C=e=>(...t)=>({_$litDirective$:e,values:t});let x=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,i,a){this._$Ct=t,this._$AM=i,this._$Ci=a}_$AS(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const f=(e,t)=>{var a;const i=e._$AN;if(i===void 0)return!1;for(const n of i)(a=n._$AO)==null||a.call(n,t,!1),f(n,t);return!0},$=e=>{let t,i;do{if((t=e._$AM)===void 0)break;i=t._$AN,i.delete(e),e=t}while((i==null?void 0:i.size)===0)},z=e=>{for(let t;t=e._$AM;e=t){let i=t._$AN;if(i===void 0)t._$AN=i=new Set;else if(i.has(e))break;i.add(e),Y(t)}};function q(e){this._$AN!==void 0?($(this),this._$AM=e,z(this)):this._$AM=e}function K(e,t=!1,i=0){const a=this._$AH,n=this._$AN;if(n!==void 0&&n.size!==0)if(t)if(Array.isArray(a))for(let r=i;r<a.length;r++)f(a[r],!1),$(a[r]);else a!=null&&(f(a,!1),$(a));else f(this,e)}const Y=e=>{e.type==V.CHILD&&(e._$AP??(e._$AP=K),e._$AQ??(e._$AQ=q))};class X extends x{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,i,a){super._$AT(t,i,a),z(this),this.isConnected=t._$AU}_$AO(t,i=!0){var a,n;t!==this.isConnected&&(this.isConnected=t,t?(a=this.reconnected)==null||a.call(this):(n=this.disconnected)==null||n.call(this)),i&&(f(this,t),$(this))}setValue(t){if(G(this._$Ct))this._$Ct._$AI(t,this);else{const i=[...this._$Ct._$AH];i[this._$Ci]=t,this._$Ct._$AI(i,this,0)}}disconnected(){}reconnected(){}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Z{constructor(t){this.Y=t}disconnect(){this.Y=void 0}reconnect(t){this.Y=t}deref(){return this.Y}}class Q{constructor(){this.Z=void 0,this.q=void 0}get(){return this.Z}pause(){this.Z??(this.Z=new Promise(t=>this.q=t))}resume(){var t;(t=this.q)==null||t.call(this),this.Z=this.q=void 0}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const I=e=>!W(e)&&typeof e.then=="function",D=1073741823;class J extends X{constructor(){super(...arguments),this._$Cwt=D,this._$Cbt=[],this._$CK=new Z(this),this._$CX=new Q}render(...t){return t.find(i=>!I(i))??A}update(t,i){const a=this._$Cbt;let n=a.length;this._$Cbt=i;const r=this._$CK,s=this._$CX;this.isConnected||this.disconnected();for(let c=0;c<i.length&&!(c>this._$Cwt);c++){const _=i[c];if(!I(_))return this._$Cwt=c,_;c<n&&_===a[c]||(this._$Cwt=D,n=0,Promise.resolve(_).then(async v=>{for(;s.get();)await s.get();const d=r.deref();if(d!==void 0){const T=d._$Cbt.indexOf(_);T>-1&&T<d._$Cwt&&(d._$Cwt=T,d.setValue(v))}}))}return A}disconnected(){this._$CK.disconnect(),this._$CX.pause()}reconnected(){this._$CK.reconnect(this),this._$CX.resume()}}const tt=C(J);class et{constructor(){this.cache=new Map}set(t,i){this.cache.set(t,i)}get(t){return this.cache.get(t)}has(t){return this.cache.has(t)}delete(t){this.cache.delete(t)}clear(){this.cache.clear()}}const S=new et,it=P`
  :host {
    display: flex;
    aspect-ratio: var(--local-aspect-ratio);
    color: var(--local-color);
    width: var(--local-width);
  }

  svg {
    width: inherit;
    height: inherit;
    object-fit: contain;
    object-position: center;
  }

  .fallback {
    width: var(--local-width);
    height: var(--local-height);
  }
`;var m=globalThis&&globalThis.__decorate||function(e,t,i,a){var n=arguments.length,r=n<3?t:a===null?a=Object.getOwnPropertyDescriptor(t,i):a,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(e,t,i,a);else for(var c=e.length-1;c>=0;c--)(s=e[c])&&(r=(n<3?s(r):n>3?s(t,i,r):s(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r};const b={add:async()=>(await o(()=>import("./add-8bfc5bc5.js"),["assets/add-8bfc5bc5.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).addSvg,allWallets:async()=>(await o(()=>import("./all-wallets-baa32ee0.js"),["assets/all-wallets-baa32ee0.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).allWalletsSvg,arrowBottomCircle:async()=>(await o(()=>import("./arrow-bottom-circle-07f87959.js"),["assets/arrow-bottom-circle-07f87959.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).arrowBottomCircleSvg,appStore:async()=>(await o(()=>import("./app-store-6891dd2d.js"),["assets/app-store-6891dd2d.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).appStoreSvg,apple:async()=>(await o(()=>import("./apple-f7836670.js"),["assets/apple-f7836670.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).appleSvg,arrowBottom:async()=>(await o(()=>import("./arrow-bottom-01fd5f69.js"),["assets/arrow-bottom-01fd5f69.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).arrowBottomSvg,arrowLeft:async()=>(await o(()=>import("./arrow-left-83f74948.js"),["assets/arrow-left-83f74948.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).arrowLeftSvg,arrowRight:async()=>(await o(()=>import("./arrow-right-98467ce9.js"),["assets/arrow-right-98467ce9.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).arrowRightSvg,arrowTop:async()=>(await o(()=>import("./arrow-top-e3bf11cb.js"),["assets/arrow-top-e3bf11cb.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).arrowTopSvg,bank:async()=>(await o(()=>import("./bank-23e3357c.js"),["assets/bank-23e3357c.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).bankSvg,browser:async()=>(await o(()=>import("./browser-1e18a650.js"),["assets/browser-1e18a650.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).browserSvg,card:async()=>(await o(()=>import("./card-3142e18d.js"),["assets/card-3142e18d.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).cardSvg,checkmark:async()=>(await o(()=>import("./checkmark-d5db20aa.js"),["assets/checkmark-d5db20aa.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).checkmarkSvg,checkmarkBold:async()=>(await o(()=>import("./checkmark-bold-f3719ad0.js"),["assets/checkmark-bold-f3719ad0.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).checkmarkBoldSvg,chevronBottom:async()=>(await o(()=>import("./chevron-bottom-405d6eaa.js"),["assets/chevron-bottom-405d6eaa.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).chevronBottomSvg,chevronLeft:async()=>(await o(()=>import("./chevron-left-dfd555a6.js"),["assets/chevron-left-dfd555a6.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).chevronLeftSvg,chevronRight:async()=>(await o(()=>import("./chevron-right-1b75785f.js"),["assets/chevron-right-1b75785f.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).chevronRightSvg,chevronTop:async()=>(await o(()=>import("./chevron-top-43eb4ed8.js"),["assets/chevron-top-43eb4ed8.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).chevronTopSvg,chromeStore:async()=>(await o(()=>import("./chrome-store-577055d2.js"),["assets/chrome-store-577055d2.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).chromeStoreSvg,clock:async()=>(await o(()=>import("./clock-38e48b5a.js"),["assets/clock-38e48b5a.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).clockSvg,close:async()=>(await o(()=>import("./close-ceac3021.js"),["assets/close-ceac3021.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).closeSvg,compass:async()=>(await o(()=>import("./compass-6c799c82.js"),["assets/compass-6c799c82.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).compassSvg,coinPlaceholder:async()=>(await o(()=>import("./coinPlaceholder-00c16295.js"),["assets/coinPlaceholder-00c16295.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).coinPlaceholderSvg,copy:async()=>(await o(()=>import("./copy-fdd5ec09.js"),["assets/copy-fdd5ec09.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).copySvg,cursor:async()=>(await o(()=>import("./cursor-d4c0316f.js"),["assets/cursor-d4c0316f.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).cursorSvg,cursorTransparent:async()=>(await o(()=>import("./cursor-transparent-7ac5a1ff.js"),["assets/cursor-transparent-7ac5a1ff.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).cursorTransparentSvg,desktop:async()=>(await o(()=>import("./desktop-914d790a.js"),["assets/desktop-914d790a.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).desktopSvg,disconnect:async()=>(await o(()=>import("./disconnect-bc337cc0.js"),["assets/disconnect-bc337cc0.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).disconnectSvg,discord:async()=>(await o(()=>import("./discord-487679ad.js"),["assets/discord-487679ad.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).discordSvg,etherscan:async()=>(await o(()=>import("./etherscan-abebd28e.js"),["assets/etherscan-abebd28e.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).etherscanSvg,extension:async()=>(await o(()=>import("./extension-277fb059.js"),["assets/extension-277fb059.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).extensionSvg,externalLink:async()=>(await o(()=>import("./external-link-c577d8d6.js"),["assets/external-link-c577d8d6.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).externalLinkSvg,facebook:async()=>(await o(()=>import("./facebook-6ff22cc6.js"),["assets/facebook-6ff22cc6.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).facebookSvg,farcaster:async()=>(await o(()=>import("./farcaster-05208d13.js"),["assets/farcaster-05208d13.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).farcasterSvg,filters:async()=>(await o(()=>import("./filters-efbdd5e5.js"),["assets/filters-efbdd5e5.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).filtersSvg,github:async()=>(await o(()=>import("./github-bca2db24.js"),["assets/github-bca2db24.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).githubSvg,google:async()=>(await o(()=>import("./google-757cdf7b.js"),["assets/google-757cdf7b.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).googleSvg,helpCircle:async()=>(await o(()=>import("./help-circle-706e4cb8.js"),["assets/help-circle-706e4cb8.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).helpCircleSvg,image:async()=>(await o(()=>import("./image-dd8a9feb.js"),["assets/image-dd8a9feb.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).imageSvg,id:async()=>(await o(()=>import("./id-6b5869b1.js"),["assets/id-6b5869b1.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).idSvg,infoCircle:async()=>(await o(()=>import("./info-circle-706d7b5e.js"),["assets/info-circle-706d7b5e.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).infoCircleSvg,lightbulb:async()=>(await o(()=>import("./lightbulb-641b3bc4.js"),["assets/lightbulb-641b3bc4.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).lightbulbSvg,mail:async()=>(await o(()=>import("./mail-b48ef1a0.js"),["assets/mail-b48ef1a0.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).mailSvg,mobile:async()=>(await o(()=>import("./mobile-c08b06a0.js"),["assets/mobile-c08b06a0.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).mobileSvg,more:async()=>(await o(()=>import("./more-c19e2563.js"),["assets/more-c19e2563.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).moreSvg,networkPlaceholder:async()=>(await o(()=>import("./network-placeholder-bf05bedb.js"),["assets/network-placeholder-bf05bedb.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).networkPlaceholderSvg,nftPlaceholder:async()=>(await o(()=>import("./nftPlaceholder-7d1228d6.js"),["assets/nftPlaceholder-7d1228d6.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).nftPlaceholderSvg,off:async()=>(await o(()=>import("./off-97265b51.js"),["assets/off-97265b51.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).offSvg,playStore:async()=>(await o(()=>import("./play-store-b541e596.js"),["assets/play-store-b541e596.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).playStoreSvg,plus:async()=>(await o(()=>import("./plus-ba99adfd.js"),["assets/plus-ba99adfd.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).plusSvg,qrCode:async()=>(await o(()=>import("./qr-code-a40e98f5.js"),["assets/qr-code-a40e98f5.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).qrCodeIcon,recycleHorizontal:async()=>(await o(()=>import("./recycle-horizontal-67545a33.js"),["assets/recycle-horizontal-67545a33.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).recycleHorizontalSvg,refresh:async()=>(await o(()=>import("./refresh-c59d67ba.js"),["assets/refresh-c59d67ba.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).refreshSvg,search:async()=>(await o(()=>import("./search-6be6b99a.js"),["assets/search-6be6b99a.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).searchSvg,send:async()=>(await o(()=>import("./send-f1d8475c.js"),["assets/send-f1d8475c.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).sendSvg,swapHorizontal:async()=>(await o(()=>import("./swapHorizontal-5cdb03c2.js"),["assets/swapHorizontal-5cdb03c2.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).swapHorizontalSvg,swapHorizontalMedium:async()=>(await o(()=>import("./swapHorizontalMedium-132a0ced.js"),["assets/swapHorizontalMedium-132a0ced.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).swapHorizontalMediumSvg,swapHorizontalBold:async()=>(await o(()=>import("./swapHorizontalBold-7d5348a7.js"),["assets/swapHorizontalBold-7d5348a7.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).swapHorizontalBoldSvg,swapHorizontalRoundedBold:async()=>(await o(()=>import("./swapHorizontalRoundedBold-0d2f1dc6.js"),["assets/swapHorizontalRoundedBold-0d2f1dc6.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).swapHorizontalRoundedBoldSvg,swapVertical:async()=>(await o(()=>import("./swapVertical-8e41d8db.js"),["assets/swapVertical-8e41d8db.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).swapVerticalSvg,telegram:async()=>(await o(()=>import("./telegram-b39b954e.js"),["assets/telegram-b39b954e.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).telegramSvg,threeDots:async()=>(await o(()=>import("./three-dots-bc1bdc79.js"),["assets/three-dots-bc1bdc79.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).threeDotsSvg,twitch:async()=>(await o(()=>import("./twitch-96982bb6.js"),["assets/twitch-96982bb6.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).twitchSvg,twitter:async()=>(await o(()=>import("./x-477110ce.js"),["assets/x-477110ce.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).xSvg,twitterIcon:async()=>(await o(()=>import("./twitterIcon-92052773.js"),["assets/twitterIcon-92052773.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).twitterIconSvg,verify:async()=>(await o(()=>import("./verify-72c197c3.js"),["assets/verify-72c197c3.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).verifySvg,verifyFilled:async()=>(await o(()=>import("./verify-filled-36081879.js"),["assets/verify-filled-36081879.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).verifyFilledSvg,wallet:async()=>(await o(()=>import("./wallet-5d1d744e.js"),["assets/wallet-5d1d744e.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).walletSvg,walletConnect:async()=>(await o(()=>import("./walletconnect-f3e04869.js"),["assets/walletconnect-f3e04869.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).walletConnectSvg,walletConnectLightBrown:async()=>(await o(()=>import("./walletconnect-f3e04869.js"),["assets/walletconnect-f3e04869.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).walletConnectLightBrownSvg,walletConnectBrown:async()=>(await o(()=>import("./walletconnect-f3e04869.js"),["assets/walletconnect-f3e04869.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).walletConnectBrownSvg,walletPlaceholder:async()=>(await o(()=>import("./wallet-placeholder-b24c9335.js"),["assets/wallet-placeholder-b24c9335.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).walletPlaceholderSvg,warningCircle:async()=>(await o(()=>import("./warning-circle-139aba66.js"),["assets/warning-circle-139aba66.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).warningCircleSvg,x:async()=>(await o(()=>import("./x-477110ce.js"),["assets/x-477110ce.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).xSvg,info:async()=>(await o(()=>import("./info-b8cff0ac.js"),["assets/info-b8cff0ac.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).infoSvg,exclamationTriangle:async()=>(await o(()=>import("./exclamation-triangle-42ca8e94.js"),["assets/exclamation-triangle-42ca8e94.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).exclamationTriangleSvg,reown:async()=>(await o(()=>import("./reown-logo-05c99412.js"),["assets/reown-logo-05c99412.js","assets/index-c304ef2d.js","assets/index-46e07047.css"])).reownSvg};async function ot(e){if(S.has(e))return S.get(e);const i=(b[e]??b.copy)();return S.set(e,i),i}let g=class extends L{constructor(){super(...arguments),this.size="md",this.name="copy",this.color="fg-300",this.aspectRatio="1 / 1"}render(){return this.style.cssText=`
      --local-color: ${`var(--wui-color-${this.color});`}
      --local-width: ${`var(--wui-icon-size-${this.size});`}
      --local-aspect-ratio: ${this.aspectRatio}
    `,E`${tt(ot(this.name),E`<div class="fallback"></div>`)}`}};g.styles=[R,M,it];m([l()],g.prototype,"size",void 0);m([l()],g.prototype,"name",void 0);m([l()],g.prototype,"color",void 0);m([l()],g.prototype,"aspectRatio",void 0);g=m([O("wui-icon")],g);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const rt=C(class extends x{constructor(e){var t;if(super(e),e.type!==V.ATTRIBUTE||e.name!=="class"||((t=e.strings)==null?void 0:t.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){var a,n;if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(const r in t)t[r]&&!((a=this.nt)!=null&&a.has(r))&&this.st.add(r);return this.render(t)}const i=e.element.classList;for(const r of this.st)r in t||(i.remove(r),this.st.delete(r));for(const r in t){const s=!!t[r];s===this.st.has(r)||(n=this.nt)!=null&&n.has(r)||(s?(i.add(r),this.st.add(r)):(i.remove(r),this.st.delete(r)))}return A}}),at=P`
  :host {
    display: inline-flex !important;
  }

  slot {
    width: 100%;
    display: inline-block;
    font-style: normal;
    font-family: var(--wui-font-family);
    font-feature-settings:
      'tnum' on,
      'lnum' on,
      'case' on;
    line-height: 130%;
    font-weight: var(--wui-font-weight-regular);
    overflow: inherit;
    text-overflow: inherit;
    text-align: var(--local-align);
    color: var(--local-color);
  }

  .wui-line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .wui-line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .wui-font-medium-400 {
    font-size: var(--wui-font-size-medium);
    font-weight: var(--wui-font-weight-light);
    letter-spacing: var(--wui-letter-spacing-medium);
  }

  .wui-font-medium-600 {
    font-size: var(--wui-font-size-medium);
    letter-spacing: var(--wui-letter-spacing-medium);
  }

  .wui-font-title-600 {
    font-size: var(--wui-font-size-title);
    letter-spacing: var(--wui-letter-spacing-title);
  }

  .wui-font-title-6-600 {
    font-size: var(--wui-font-size-title-6);
    letter-spacing: var(--wui-letter-spacing-title-6);
  }

  .wui-font-mini-700 {
    font-size: var(--wui-font-size-mini);
    letter-spacing: var(--wui-letter-spacing-mini);
    text-transform: uppercase;
  }

  .wui-font-large-500,
  .wui-font-large-600,
  .wui-font-large-700 {
    font-size: var(--wui-font-size-large);
    letter-spacing: var(--wui-letter-spacing-large);
  }

  .wui-font-2xl-500,
  .wui-font-2xl-600,
  .wui-font-2xl-700 {
    font-size: var(--wui-font-size-2xl);
    letter-spacing: var(--wui-letter-spacing-2xl);
  }

  .wui-font-paragraph-400,
  .wui-font-paragraph-500,
  .wui-font-paragraph-600,
  .wui-font-paragraph-700 {
    font-size: var(--wui-font-size-paragraph);
    letter-spacing: var(--wui-letter-spacing-paragraph);
  }

  .wui-font-small-400,
  .wui-font-small-500,
  .wui-font-small-600 {
    font-size: var(--wui-font-size-small);
    letter-spacing: var(--wui-letter-spacing-small);
  }

  .wui-font-tiny-400,
  .wui-font-tiny-500,
  .wui-font-tiny-600 {
    font-size: var(--wui-font-size-tiny);
    letter-spacing: var(--wui-letter-spacing-tiny);
  }

  .wui-font-micro-700,
  .wui-font-micro-600 {
    font-size: var(--wui-font-size-micro);
    letter-spacing: var(--wui-letter-spacing-micro);
    text-transform: uppercase;
  }

  .wui-font-tiny-400,
  .wui-font-small-400,
  .wui-font-medium-400,
  .wui-font-paragraph-400 {
    font-weight: var(--wui-font-weight-light);
  }

  .wui-font-large-700,
  .wui-font-paragraph-700,
  .wui-font-micro-700,
  .wui-font-mini-700 {
    font-weight: var(--wui-font-weight-bold);
  }

  .wui-font-medium-600,
  .wui-font-medium-title-600,
  .wui-font-title-6-600,
  .wui-font-large-600,
  .wui-font-paragraph-600,
  .wui-font-small-600,
  .wui-font-tiny-600,
  .wui-font-micro-600 {
    font-weight: var(--wui-font-weight-medium);
  }

  :host([disabled]) {
    opacity: 0.4;
  }
`;var y=globalThis&&globalThis.__decorate||function(e,t,i,a){var n=arguments.length,r=n<3?t:a===null?a=Object.getOwnPropertyDescriptor(t,i):a,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(e,t,i,a);else for(var c=e.length-1;c>=0;c--)(s=e[c])&&(r=(n<3?s(r):n>3?s(t,i,r):s(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r};let w=class extends L{constructor(){super(...arguments),this.variant="paragraph-500",this.color="fg-300",this.align="left",this.lineClamp=void 0}render(){const t={[`wui-font-${this.variant}`]:!0,[`wui-color-${this.color}`]:!0,[`wui-line-clamp-${this.lineClamp}`]:!!this.lineClamp};return this.style.cssText=`
      --local-align: ${this.align};
      --local-color: var(--wui-color-${this.color});
    `,E`<slot class=${rt(t)}></slot>`}};w.styles=[R,at];y([l()],w.prototype,"variant",void 0);y([l()],w.prototype,"color",void 0);y([l()],w.prototype,"align",void 0);y([l()],w.prototype,"lineClamp",void 0);w=y([O("wui-text")],w);const nt=P`
  :host {
    display: flex;
    width: inherit;
    height: inherit;
  }
`;var p=globalThis&&globalThis.__decorate||function(e,t,i,a){var n=arguments.length,r=n<3?t:a===null?a=Object.getOwnPropertyDescriptor(t,i):a,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(e,t,i,a);else for(var c=e.length-1;c>=0;c--)(s=e[c])&&(r=(n<3?s(r):n>3?s(t,i,r):s(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r};let u=class extends L{render(){return this.style.cssText=`
      flex-direction: ${this.flexDirection};
      flex-wrap: ${this.flexWrap};
      flex-basis: ${this.flexBasis};
      flex-grow: ${this.flexGrow};
      flex-shrink: ${this.flexShrink};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      column-gap: ${this.columnGap&&`var(--wui-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap&&`var(--wui-spacing-${this.rowGap})`};
      gap: ${this.gap&&`var(--wui-spacing-${this.gap})`};
      padding-top: ${this.padding&&h.getSpacingStyles(this.padding,0)};
      padding-right: ${this.padding&&h.getSpacingStyles(this.padding,1)};
      padding-bottom: ${this.padding&&h.getSpacingStyles(this.padding,2)};
      padding-left: ${this.padding&&h.getSpacingStyles(this.padding,3)};
      margin-top: ${this.margin&&h.getSpacingStyles(this.margin,0)};
      margin-right: ${this.margin&&h.getSpacingStyles(this.margin,1)};
      margin-bottom: ${this.margin&&h.getSpacingStyles(this.margin,2)};
      margin-left: ${this.margin&&h.getSpacingStyles(this.margin,3)};
    `,E`<slot></slot>`}};u.styles=[R,nt];p([l()],u.prototype,"flexDirection",void 0);p([l()],u.prototype,"flexWrap",void 0);p([l()],u.prototype,"flexBasis",void 0);p([l()],u.prototype,"flexGrow",void 0);p([l()],u.prototype,"flexShrink",void 0);p([l()],u.prototype,"alignItems",void 0);p([l()],u.prototype,"justifyContent",void 0);p([l()],u.prototype,"columnGap",void 0);p([l()],u.prototype,"rowGap",void 0);p([l()],u.prototype,"gap",void 0);p([l()],u.prototype,"padding",void 0);p([l()],u.prototype,"margin",void 0);u=p([O("wui-flex")],u);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const dt=e=>e??j;export{h as U,C as a,O as c,rt as e,X as f,l as n,dt as o,ct as r};
