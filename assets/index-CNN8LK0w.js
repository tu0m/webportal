var k=Object.defineProperty;var L=(e,r,t)=>r in e?k(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t;var d=(e,r,t)=>(L(e,typeof r!="symbol"?r+"":r,t),t);(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function t(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(n){if(n.ep)return;n.ep=!0;const o=t(n);fetch(n.href,o)}})();const g=`/* WEB COMPONENT STYLESHEET */

/* HTML ELEMENTS */
label {
    padding: var(--spacing-s) var(--spacing-m) calc(var(--spacing-s) + 2px);
    white-space: nowrap;
}

label:hover {
    background-color: var(--color-highlight);
}

input {
    all: unset;
    width: 100%;
}

button {
    all: unset;
    padding: var(--spacing-s) var(--spacing-m) calc(var(--spacing-s) + 2px);
}

button:hover,
button:focus {
    background-color: var(--color-highlight);
}


/* MODULE CONTENT LAYOUT */

.top {
    display: flex;
    justify-content: center;
    align-items: center;
}

.mid {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100%;
    font-size: 200%;
    font-weight: 400;

    /* add 2 pixels to bottom for more visually appealing alignment of content */
    padding-bottom: 2px;
}

.btm {
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    display: flex;
    width: 100%;
    gap: 20px;
}

.tab-icon {
    display: inline-flex;
    align-items: center;

    padding: 0 8px;
    margin: 10px 0;

    text-align: center;
    font-size: 75%;

    border-radius: var(--radius-s);
    border: 1px solid var(--color-text);
    color: var(--color-text);
    background-color: var(--color-bg);
}

.tab-icon[hidden] {
    display: none;
}

.favicon {
    width: 60px;
    height: 60px;
}

.placeholder::before {
    display: flex;
    content: '';
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-radius: var(--radius-s);
    border: 3px dashed var(--color-highlight);
}

.initial {
    width: 60px;
    height: 60px;

    text-align: center;
    line-height: 57px;

    border-radius: var(--radius-s);
    background-color: var(--color-highlight);
}`,x={name:"",url:""},T={name:"Bing",url:"https://www.bing.com/search?q="},C={name:"",url:""},q={name:"DuckDuckGo",url:"https://duckduckgo.com/?q="},D={name:"Ebay",url:"https://www.google.com/search?q="},I={name:"",url:""},A={name:"Google",url:"https://www.google.com/search?q="},R={name:"",url:""},H={name:"",url:""},O={name:"",url:""},P={name:"",url:""},U={name:"",url:""},N={name:"Google Maps",url:"https://www.google.com/maps/search/"},M={name:"",url:""},F={name:"",url:""},_={name:"",url:""},W={name:"Qwant",url:"https://www.qwant.com/?q="},Q={name:"Reddit",url:"https://www.google.com/search?q=site:reddit.com%20"},G={name:"",url:""},z={name:"",url:""},B={name:"",url:""},Y={name:"",url:""},J={name:"Wikipedia",url:"https://en.wikipedia.org/wiki/"},V={name:"",url:""},j={name:"YouTube",url:"https://www.youtube.com/results?search_query="},K={name:"",url:""},c={a:x,b:T,c:C,d:q,e:D,f:I,g:A,h:R,i:H,j:O,k:P,l:U,m:N,n:M,o:F,p:_,q:W,r:Q,s:G,t:z,u:B,v:Y,w:J,x:V,y:j,z:K};class $ extends HTMLElement{constructor(){super();d(this,"showSearchEngines",t=>{});d(this,"keyPressHandler",t=>{var a;if(t.key=="Tab"){if(this.searchQuery.length!=1)return;(a=c[this.searchQuery.toLowerCase()])!=null&&a.name.length&&(t.preventDefault(),this.setAttribute("data-searchengine",c[this.searchQuery.toLowerCase()].name),this.input.value="",this.toggleTabIcon())}t.key=="Enter"&&this.search()});d(this,"toggleTabIcon",t=>{var a;this.searchQuery.length==1&&((a=c[this.searchQuery.toLowerCase()])!=null&&a.name.length)?this.shadowRoot.querySelector("span").removeAttribute("hidden"):this.shadowRoot.querySelector("span").setAttribute("hidden",!0)});d(this,"search",()=>{if(this.searchQuery.length==0)return;const t=this.searchEngineUrl+this.searchQuery;window.open(t,"_blank"),this.input.value="",this.toggleTabIcon(),this.input.blur()})}static get observedAttributes(){return["data-searchengine"]}connectedCallback(){const t=this.attachShadow({mode:"open"}),a=new CSSStyleSheet;a.replaceSync(g),t.adoptedStyleSheets=[a];const n=`
        <label for="searchbar"></label>
        <div class="container">
            <input type="search" id="searchbar" name="q" />
            <span class="tab-icon" hidden>Tab</span>
        </div>
        <button>➤</button>
        `;this.shadowRoot.innerHTML=n,this.label=this.shadowRoot.querySelector("label"),this.input=this.shadowRoot.querySelector("input"),this.button=this.shadowRoot.querySelector("button"),this.label.addEventListener("click",this.showSearchEngines),this.input.addEventListener("keydown",this.keyPressHandler),this.input.addEventListener("input",this.toggleTabIcon),this.button.addEventListener("click",this.search)}disconnectedCallback(){this.label.removeEventListener("click",this.showSearchEngines),this.input.removeEventListener("keydown",this.keyPressHandler),this.input.removeEventListener("input",this.toggleTabIcon),this.button.removeEventListener("click",this.search)}async attributeChangedCallback(t,a,n){if(a!==n){for(;this.label==null;)await new Promise(o=>requestAnimationFrame(o));this.label.innerText=n,this.searchEngineName=n}}changeSearchEngine(t){c[t].name.length&&this.setAttribute("data-searchengine",c[t].name)}get searchQuery(){return this.input.value}get searchEngineUrl(){return Object.values(c).filter(t=>t.name==this.searchEngineName)[0].url}}customElements.define("search-widget",$);class S extends HTMLElement{constructor(){super()}connectedCallback(){const r=this.attachShadow({mode:"open"}),t=new CSSStyleSheet;t.replaceSync(g),r.adoptedStyleSheets=[t];const a=`
        <div class="top"></div>
        <div class="mid"></div>
        <div class="btm"></div>
        `;r.innerHTML=a,this.update(),this.interval=setInterval(()=>{this.update()},1e3)}disconnectedCallback(){clearInterval(this.interval)}attributeChangedCallback(r,t,a){}get city(){}get time(){return new Intl.DateTimeFormat(void 0,{timeStyle:"short"}).format(Date.now())}get utc(){return new Intl.NumberFormat(void 0,{signDisplay:"always"}).format(new Date().getTimezoneOffset()/60*-1)}update(){this.shadowRoot.querySelector(".mid").textContent!=this.time&&(this.shadowRoot.querySelector(".mid").textContent=this.time)}}d(S,"observedAttributes",["data-city"]);customElements.define("clock-widget",S);class X extends HTMLElement{constructor(){super()}connectedCallback(){const r=this.attachShadow({mode:"open"}),t=new CSSStyleSheet;t.replaceSync(g),r.adoptedStyleSheets=[t];const a=`
        <div class="top"></div>
        <div class="mid"></div>
        <div class="btm"></div>
        `;r.innerHTML=a,this.update(),this.interval=setInterval(()=>{this.update()},1e3)}disconnectedCallback(){clearInterval(this.interval)}attributeChangedCallback(r,t,a){}get month(){return new Intl.DateTimeFormat(void 0,{month:"long"}).format(Date.now())}get date(){return new Intl.DateTimeFormat(void 0,{day:"numeric"}).format(Date.now())}get weekday(){return new Intl.DateTimeFormat(void 0,{weekday:"long"}).format(Date.now())}update(){this.shadowRoot.querySelector(".mid").textContent!=this.date&&(this.shadowRoot.querySelector(".top").textContent=this.month,this.shadowRoot.querySelector(".mid").textContent=this.date,this.shadowRoot.querySelector(".btm").textContent=this.weekday)}}customElements.define("date-widget",X);class Z extends HTMLElement{constructor(){super();d(this,"keyPressHandler",t=>{(t.key=="Enter"||t.key==" ")&&this.open()});d(this,"open",()=>{const t=this.httpsify(this.shadowRoot.host.getAttribute("data-url"));window.open(t,"_blank"),this.shadowRoot.host.blur()})}static get observedAttributes(){return["data-name","data-url"]}connectedCallback(){const t=this.attachShadow({mode:"open"}),a=new CSSStyleSheet;a.replaceSync(g),t.adoptedStyleSheets=[a];const n=`
        <div class="mid">
            
        <img class="favicon placeholder" src="" alt="favicon"/>
        
        </div>
        <div class="btm"></div>

        `;t.innerHTML=n,t.host.addEventListener("keydown",this.keyPressHandler),t.host.addEventListener("click",this.open)}disconnectedCallback(){this.shadowRoot.host.removeEventListener("keydown",this.keyPressHandler),this.shadowRoot.host.removeEventListener("click",this.open)}attributeChangedCallback(t,a,n){window.customElements.whenDefined("link-widget").then(()=>{t=="data-name"&&this.updateName(n),t=="data-url"&&this.updateFavicon(this.httpsify(n))})}httpsify(t){return t.includes("://")?t:"https://"+t}updateName(t){this.shadowRoot.querySelector(".btm").textContent=t}async updateFavicon(t){const a=this.shadowRoot.querySelector(".mid"),n=new Image;n.src=`https://www.google.com/s2/favicons?sz=64&domain_url=${t}`,n.onload=()=>{if(n.height>=64)n.classList="favicon",n.alt="favicon",n.draggable=!1,a.replaceChildren(n);else{const o=this.shadowRoot.querySelector(".btm").innerText.charAt(0).toUpperCase(),i=document.createElement("div");i.classList="initial",i.innerText=o,a.replaceChildren(i)}}}}customElements.define("link-widget",Z);const m=[{type:"Search",tag:"search-widget",attributes:{"data-searchengine":ee(),class:"bar widget",draggable:!1,uuid:u}},{type:"Clock",tag:"clock-widget",attributes:{"data-city":"Location (WIP)",class:"square widget",draggable:!0,uuid:u}},{type:"Date",tag:"date-widget",attributes:{class:"square widget",draggable:!0,uuid:u}},{type:"Link",tag:"link-widget",attributes:{"data-name":"Website name","data-url":"URL",class:"square widget",tabindex:"0",draggable:!0,uuid:u}}];function ee(){let e=[];return Object.values(c).forEach(r=>{r.name&&e.push(r.name)}),e}function u(){return crypto.randomUUID()}function E(){return m.map(e=>e.type)}function l(e){try{return m.find(r=>r.type==e).attributes}catch{return null}}function te(e){try{return m.find(r=>r.type==e).tag}catch{return null}}function ne(e){return m.find(r=>r.type==e).attributes.draggable}function y(e){if(!e)return new Error("nothing to save");if(!ae())return new Error("localStorage failed");localStorage.setItem("widgets",JSON.stringify(e))}function p(){const e=localStorage.getItem("widgets");return e?JSON.parse(e):re()}function re(){return[{type:"Search",attributes:{"data-searchengine":"Google",uuid:crypto.randomUUID()}}]}function ae(){try{const e="test";return localStorage.setItem(e,e),localStorage.removeItem(e),!0}catch{return!1}}function oe(e){let r=p();r.push(e),y(r)}function ie(e){let t=p().filter(a=>a.attributes.uuid!=e);y(t)}const se=document.querySelector("#widget-grid");document.querySelector("#widget-list");document.querySelector("#menu-bg");document.querySelector("#menu");function v(e=p()){if(!e)return;const r=new DocumentFragment;e.forEach(a=>{r.append(de(a))}),se.replaceChildren(r),document.querySelector("#widget-type").replaceChildren(ce())}function de(e){const r=document.createElement(te(e.type));for(let t in l(e.type))t.startsWith("data-")||(l(e.type)[t]instanceof Function?r.setAttribute(t,l(e.type)[t]()):r.setAttribute(t,l(e.type)[t]));for(let t in e.attributes)r.setAttribute(t,e.attributes[t]);return r}function ce(){const e=E(),r=document.createElement("select");r.required=!0;let t=document.createElement("option");t.innerText="Select widget",t.value="",r.appendChild(t);for(let a of e){if(!ne(a))continue;let n=document.createElement("option");n.innerText=a,n.value=a,r.appendChild(n)}return r}function b(e){const r=document.querySelector("#widget-attributes"),t=l(e),a=new DocumentFragment;for(let n in t)if(n.startsWith("data-"))if(Array.isArray(t[n])){const o=document.createElement("select");o.id=n;for(let i of t[n]){let f=document.createElement("option");f.value=i,f.innerText=i,o.appendChild(f)}a.append(o)}else{const o=document.createElement("input");n=="data-url"?o.type="url":o.type="text",o.id=n,o.placeholder=l(e)[n],o.required=!0,a.append(o)}a.childElementCount>0?r.removeAttribute("hidden"):r.setAttribute("hidden",!0),r.replaceChildren(a)}function le(){const e=t(),r=a();function t(){const n=document.querySelector("#widget-type > select").value;if(E())return n}function a(){const n=document.querySelectorAll('[id^="data-"]');let o={};for(let i of n)i.value&&(o[i.id]=i.value);return o.uuid=crypto.randomUUID(),o}e&&oe({type:e,attributes:r})}const h=document.querySelector("#delete-area");function ue(e){return e.target.style.opacity="0.5",e.dataTransfer.effectAllowed="move",e.dataTransfer.dropEffect="move",e.dataTransfer.setData("text/plain",e.target.getAttribute("uuid")),h.style.color="var(--color-text)",h.showPopover(),!1}function he(e){return e.target.style.opacity="1",h.hidePopover(),!1}function ge(e){return e.preventDefault(),e.target.id=="delete-area"&&(e.target.style.color="var(--color-hover)"),!1}function me(e){return e.preventDefault(),e.target.id=="delete-area"&&(e.target.style.color="var(--color-text)"),!1}function pe(e){return e.preventDefault(),!1}function fe(e){if(e.stopPropagation(),h.hidePopover(),e.target.id=="delete-area"){const r=e.dataTransfer.getData("text/plain");ie(r);return}if(e.target.hasAttribute("uuid")){const r=e.dataTransfer.getData("text/plain"),t=e.target.getAttribute("uuid");if(r!=t){let a=p();const n=a.findIndex(i=>i.attributes.uuid==r),o=a.findIndex(i=>i.attributes.uuid==t);[a[n],a[o]]=[a[o],a[n]],y(a);return}}throw new Error("drop failed")}function w(e){switch(!0){case e.type=="submit":le(),e.target.hidePopover(),b(),v();break;case(e.type=="change"&&e.target.parentElement.id=="widget-type"):b(e.target.value);break}}function s(e){switch(!0){case e.type=="dragstart":ue(e);break;case e.type=="dragend":he(e);break;case e.type=="dragenter":ge(e);break;case e.type=="dragleave":me(e);break;case e.type=="dragover":pe(e);break;case e.type=="drop":try{fe(e),v()}catch{}break}}(function e(){navigator.onLine?document.body.style.filter="none":document.body.style.filter="grayscale(100%)",setTimeout(e,5e3)})();v();window.onload=()=>{document.addEventListener("change",w),document.addEventListener("submit",w);const e=document.querySelector("#widget-grid"),r=new MutationObserver(t);function t(){for(let n of e.childNodes)n.getAttribute("draggable")!="false"&&(n.removeEventListener("dragstart",s),n.removeEventListener("dragend",s),n.removeEventListener("dragenter",s),n.removeEventListener("dragleave",s),n.removeEventListener("dragover",s),n.removeEventListener("drop",s),n.addEventListener("dragstart",s),n.addEventListener("dragend",s),n.addEventListener("dragenter",s),n.addEventListener("dragleave",s),n.addEventListener("dragover",s),n.addEventListener("drop",s))}r.observe(e,{childList:!0}),t();const a=document.querySelector("#delete-area");a.addEventListener("dragenter",s),a.addEventListener("dragleave",s),a.addEventListener("dragover",s),a.addEventListener("drop",s)};
