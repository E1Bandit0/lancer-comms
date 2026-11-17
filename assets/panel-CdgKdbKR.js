import{M as se,P as le,e as ve,f as ie,h as f,i as h,S as ye,O as i,D as re,R as te,s as ke,n as Se,j as we,C as ae,k as R}from"./protocol-BDoZm40y.js";import{P as M}from"./base-Bjovz4Wc.js";function Le(e){return e.type==="IMAGE"}const V=[{kind:"dialogue",label:"Dialogue",hint:"Radio handset along the bottom of the screen."},{kind:"notice",label:"Notice",hint:"Framed window in the middle of the screen. Good for briefings."},{kind:"monologue",label:"Monologue",hint:"No box: the portrait and a caption bar sit over the scene. Best with cut-out art."},{kind:"handout",label:"Handout",hint:"Shows pictures only - posters, documents, manifests."},{kind:"bubble",label:"Bubble",hint:"Speech bubble on the map, seen only by players with a token in range."}],D=["whisper","talk","yell"],oe=["CHARACTER","MOUNT","PROP"],Ee={CHARACTER:"Characters",MOUNT:"Mounts",PROP:"Props"},G=(e,o)=>`<div class="segmented" role="radiogroup" data-seg="${e}">${o.map(([n,k])=>`<button type="button" role="radio" data-value="${n}">${k}</button>`).join("")}</div>`,v=document.querySelector("#app");v.innerHTML=`
  <form class="panel" autocomplete="off">
    <header>
      <h1>Lancer <span>//</span> Comms</h1>
      <span class="status" id="status">Standby</span>
    </header>

    <div class="field">
      <span class="label">Style</span>
      <div class="segmented styles" role="radiogroup" id="styles">
        ${V.map(e=>`<button type="button" role="radio" data-kind="${e.kind}">${e.label}</button>`).join("")}
      </div>
      <p class="hint" id="style-hint"></p>
    </div>

    <label class="field" data-for="dialogue notice monologue bubble">
      <span class="label">Speaker <small>characters, mounts and props</small></span>
      <select id="token"></select>
    </label>

    <div class="row" data-for="dialogue notice monologue bubble">
      <label class="field">
        <span class="label">Display name</span>
        <input id="override" type="text" maxlength="60" placeholder="Token name" />
      </label>
      <label class="field" data-for="notice">
        <span class="label">Subtitle <small>optional</small></span>
        <input id="subtitle" type="text" maxlength="80" placeholder="e.g. Relay 3" />
      </label>
    </div>

    <div class="field" data-for="dialogue notice monologue">
      <span class="label">Portrait <small>optional - remembered for this speaker</small></span>
      <div class="picker">
        <span class="pick-thumb" id="portrait-thumb"></span>
        <span class="pick-name" id="portrait-name">Token image</span>
        <button type="button" class="mini" id="portrait-choose">Choose image&hellip;</button>
        <button type="button" class="mini x" id="portrait-clear" title="Use the token's image" hidden>&#x2715;</button>
      </div>
      <label class="check" data-for="dialogue notice"><input type="checkbox" id="tint" /> <span>Tint portrait <small>recolour it to the signal colour</small></span></label>
    </div>

    <div class="field" data-for="handout">
      <span class="label">Images <small>up to ${se}, shown one after another</small></span>
      <div class="picker">
        <span class="pick-name" id="handout-names">None chosen</span>
        <button type="button" class="mini" id="handout-choose">Choose images&hellip;</button>
        <button type="button" class="mini x" id="handout-clear" title="Clear" hidden>&#x2715;</button>
      </div>
      <div class="thumbs" id="handout-thumbs"></div>
    </div>
    <label class="field" data-for="handout">
      <span class="label">Title <small>optional</small></span>
      <input id="title" type="text" maxlength="60" placeholder="e.g. Recovered document" />
    </label>

    <div class="field" data-for="dialogue notice monologue handout">
      <span class="label">Signal colour</span>
      <div class="swatches" role="radiogroup" id="colours">
        ${ie.map(e=>`<button type="button" role="radio" data-colour="${e}" style="--sw:${M[e].accent}">${M[e].label}</button>`).join("")}
      </div>
      <p class="hint small" id="colour-hint"></p>
    </div>

    <div class="row" data-for="dialogue notice monologue">
      <div class="field">
        <span class="label">Text reveal</span>
        ${G("reveal",[["type","Type"],["decrypt","Decrypt"],["instant","Instant"]])}
      </div>
      <div class="field">
        <span class="label">Speed</span>
        ${G("speed",[["slow","Slow"],["speak","Speak"],["fast","Fast"]])}
      </div>
    </div>

    <div class="field" data-for="dialogue notice monologue handout">
      <span class="label">Effect</span>
      ${G("effect",[["clean","Clean"],["static","Static"],["glitch","Glitch"],["weak","Weak signal"]])}
    </div>

    <div class="field" data-for="bubble">
      <span class="label">Speech ranges <small id="range-unit">in map units</small> <small id="range-lock">GM only</small></span>
      <div class="ranges">
        ${D.map(e=>`<label class="range ${e}"><span>${e}</span><input type="number" min="0" step="1" data-range="${e}" /></label>`).join("")}
      </div>
    </div>

    <label class="field grow" data-for="dialogue notice monologue bubble">
      <span class="label">Message <small data-for="dialogue notice monologue">type ${le} for a new page &middot; Ctrl+Enter sends</small></span>
      <textarea id="message" maxlength="${ve}" placeholder="Type your message"></textarea>
    </label>

    <label class="field" data-for="dialogue notice monologue handout">
      <span class="label">Send to</span>
      <select id="target"></select>
    </label>

    <div class="field" data-for="bubble">
      <span class="label">Volume</span>
      <div class="segmented" id="volumes" role="radiogroup">
        ${D.map(e=>`<button type="button" role="radio" class="${e}" data-volume="${e}">${e}</button>`).join("")}
      </div>
      <label class="check"><input type="checkbox" id="view-on-send" /> <span>View on send <small>show the bubble on my own token</small></span></label>
    </div>

    <div class="mine">
      <span class="label">On my screen</span>
      <label class="check"><input type="checkbox" id="fx-off" /> <span>Turn effects off <small>no static or glitches, for slower laptops</small></span></label>
    </div>

    <footer>
      <button type="button" class="ghost" id="clear-bubbles" data-for="bubble">Clear my bubbles</button>
      <button type="submit" class="send" id="send">Transmit <span>&#9656;</span></button>
    </footer>
  </form>`;const s=e=>document.getElementById(e),O=v.querySelector("form"),r=s("token"),ne=s("override"),$e=s("subtitle"),Ae=s("title"),L=s("target"),T=s("message"),P=s("tint"),N=s("view-on-send"),U=s("fx-off"),x=s("status"),de=[...v.querySelectorAll("[data-kind]")],ce=[...v.querySelectorAll("[data-colour]")],ue=[...v.querySelectorAll("[data-volume]")],pe=[...v.querySelectorAll("[data-range]")];let l=f("kind","dialogue");V.some(e=>e.kind===l)||(l="dialogue");let $=f("volume","talk"),S={...re};const A={reveal:f("reveal","type"),speed:f("speed","speak"),effect:f("effect","clean")},me=e=>{const o=f(`colour:${e}`,"");return ie.includes(o)?o:e==="monologue"||e==="handout"?"white":"green"};let E=me(l);const C=f("portraits",{});let g=[];function be(e,o){A[e]=o,h(e,o);for(const n of v.querySelectorAll(`[data-seg="${e}"] button`))n.setAttribute("aria-checked",String(n.dataset.value===o))}function ge(e){E=e,h(`colour:${l}`,E);for(const o of ce)o.setAttribute("aria-checked",String(o.dataset.colour===E));s("colour-hint").textContent=`Suggested for: ${M[E].hint}`,O.style.setProperty("--pick",M[E].accent)}function I(e){l=e,h("kind",l);for(const n of de)n.setAttribute("aria-checked",String(n.dataset.kind===l));s("style-hint").textContent=V.find(n=>n.kind===l).hint;for(const n of v.querySelectorAll("[data-for]"))n.hidden=!n.dataset.for.split(" ").includes(l);ge(me(l));const o=r.querySelector('option[value=""]');if(o&&(o.disabled=l==="bubble"),l==="bubble"&&r.value===""){const n=[...r.options].find(k=>k.value);n&&(r.value=n.value)}q()}function fe(e){$=e,h("volume",$);for(const o of ue)o.setAttribute("aria-checked",String(o.dataset.volume===$))}function K(){for(const e of pe)e.value=String(S[e.dataset.range])}function b(e,o=!1){x.textContent=e,x.classList.toggle("bad",o),x.classList.remove("pulse"),x.offsetWidth,x.classList.add("pulse")}const H=()=>r.value||"none";let _=()=>{};function q(){const e=C[H()],o=(e==null?void 0:e.url)??_();s("portrait-name").textContent=e?e.name:o?"Token image":"None",s("portrait-clear").hidden=!e;const n=s("portrait-thumb");n.style.backgroundImage=o?`url("${o.replace(/"/g,"%22")}")`:"",n.classList.toggle("empty",!o)}function F(){s("handout-names").textContent=g.length?g.length===1?g[0].name:`${g.length} images`:"None chosen",s("handout-clear").hidden=g.length===0,s("handout-thumbs").innerHTML=g.map(e=>`<span style="background-image:url(&quot;${R(e.url)}&quot;)" title="${R(e.name)}"></span>`).join("")}for(const e of de)e.addEventListener("click",()=>I(e.dataset.kind));for(const e of ce)e.addEventListener("click",()=>ge(e.dataset.colour));for(const e of ue)e.addEventListener("click",()=>fe(e.dataset.volume));for(const e of v.querySelectorAll("[data-seg]"))for(const o of e.querySelectorAll("button"))o.addEventListener("click",()=>be(e.dataset.seg,o.dataset.value));P.checked=f("tint",!0);P.addEventListener("change",()=>h("tint",P.checked));N.checked=f("viewOnSend",!0);N.addEventListener("change",()=>h("viewOnSend",N.checked));U.checked=f("fxOff",!1);U.addEventListener("change",()=>h("fxOff",U.checked));T.addEventListener("keydown",e=>{e.key==="Enter"&&(e.ctrlKey||e.metaKey)&&O.requestSubmit()});s("portrait-clear").addEventListener("click",()=>{delete C[H()],h("portraits",C),q()});s("handout-clear").addEventListener("click",()=>{g=[],F()});for(const e of Object.keys(A))be(e,A[e]);fe($);K();F();I(l);ye?(document.documentElement.classList.add("standalone"),r.innerHTML='<option value="">No token (name only)</option><optgroup label="Characters"><option selected value="a">Kestrel-2</option><option value="b">Cpt. Virall</option></optgroup><optgroup label="Props"><option value="c">Relay tower</option></optgroup>',L.innerHTML="<option>Entire party</option><option>Only me (preview)</option>",I(new URLSearchParams(location.search).get("style")??l),O.addEventListener("submit",e=>e.preventDefault())):i.onReady(async()=>{var Z,ee;const e=i.player.id,o=await i.player.getRole()==="GM";let n=[],k=await i.scene.isReady();const w=t=>{var a,d;return((d=(a=t.text)==null?void 0:a.plainText)==null?void 0:d.trim())||t.name||"Unnamed"},W=t=>Le(t)&&oe.includes(t.layer),j=()=>n.find(t=>t.id===r.value);_=()=>{const t=j();return t&&t.image.mime.startsWith("image/")?t.image.url:void 0};const Y=(t,a)=>{const d=u=>u.map(c=>`${c.id}:${c.layer}:${w(c)}`).join("|"),m=t.filter(u=>o||u.createdUserId===e).sort((u,c)=>w(u).localeCompare(w(c)));if(d(m)===d(n)&&r.options.length)return;n=m;const p=r.value;r.innerHTML='<option value="">No token (name only)</option>'+oe.map(u=>{const c=n.filter(y=>y.layer===u);return c.length?`<optgroup label="${Ee[u]}">${c.map(y=>`<option value="${y.id}">${R(w(y))}</option>`).join("")}</optgroup>`:""}).join(""),r.value=n.some(u=>u.id===p)?p:"",I(l),a&&(r.classList.remove("changed"),r.offsetWidth,r.classList.add("changed"))},X=async t=>{Y(k?await i.scene.items.getItems(W):[],t)};await X(!1);const B=await i.player.getSelection(),z=n.find(t=>B==null?void 0:B.includes(t.id));z&&(r.value=z.id),r.addEventListener("change",()=>{r.classList.remove("changed");const t=j();ne.placeholder=t?w(t):"Name to show",q()}),r.dispatchEvent(new Event("change")),i.scene.items.onChange(t=>Y(t.filter(W),!0)),i.scene.onReadyChange(async t=>{k=t,await X(!0)}),s("portrait-choose").addEventListener("click",async()=>{try{const[t]=await i.assets.downloadImages(!1,"","CHARACTER");if(!t)return;C[H()]={url:t.image.url,name:t.name||"Chosen image"},h("portraits",C),q()}catch(t){console.error(t),b("Couldn't open images",!0)}}),s("handout-choose").addEventListener("click",async()=>{try{const t=await i.assets.downloadImages(!0,"","PROP");if(!t.length)return;g=t.slice(0,se).map(a=>({url:a.image.url,width:a.image.width,height:a.image.height,name:a.name||"Image"})),F()}catch(t){console.error(t),b("Couldn't open images",!0)}});const J=t=>{const a=L.value||"ALL";L.innerHTML='<option value="ALL">Entire party</option>'+t.map(d=>`<option value="${d.id}">${R(d.name)}${d.role==="GM"?" (GM)":""}</option>`).join("")+`<option value="${e}">Only me (preview)</option>`,L.value=[...L.options].some(d=>d.value===a)?a:"ALL"};J(await i.party.getPlayers()),i.party.onChange(J);const Q=t=>{const a=t[te];S={...re};for(const d of D){const m=a==null?void 0:a[d];typeof m=="number"&&m>=0&&(S[d]=m)}K()};Q(await i.room.getMetadata()),i.room.onMetadataChange(Q),s("range-lock").hidden=o;for(const t of pe)t.disabled=!o,t.addEventListener("change",()=>{const a=Number(t.value);if(!Number.isFinite(a)||a<0)return K();S={...S,[t.dataset.range]:a},i.room.setMetadata({[te]:S}).catch(()=>b("Couldn't save ranges",!0))});if(k){const a=(ee=(Z=(await i.scene.grid.getScale()).parsed)==null?void 0:Z.unit)==null?void 0:ee.trim();a&&(s("range-unit").textContent=`in ${a}`)}s("clear-bubbles").addEventListener("click",()=>{ke({type:"clear-bubbles"}),b("Bubbles cleared")}),O.addEventListener("submit",async t=>{var u;t.preventDefault();const a=j(),d=await i.player.getName(),m=T.value.trim(),p={id:Se(),kind:l,name:ne.value.trim()||(a?w(a):d),subtitle:l==="notice"&&$e.value.trim()||void 0,image:((u=C[H()])==null?void 0:u.url)??_(),tint:P.checked,pages:[],colour:E,reveal:A.reveal,speed:A.speed,effect:A.effect,target:l==="bubble"?"ALL":L.value||"ALL",from:{id:e,name:d}};if(l==="handout"){if(!g.length)return b("Choose an image",!0);p.name=Ae.value.trim()||"Handout",p.image=void 0,p.images=g.map(({url:c,width:y,height:he})=>({url:c,width:y,height:he}))}else if(!m||(p.pages=l==="bubble"?[m.split(le).join(" ").slice(0,600)]:we(m),p.pages.length===0))return b("No message",!0);if(l==="bubble"){if(!a)return b("Pick a token",!0);const c=await i.scene.grid.getDpi(),y=a.position.y-a.grid.offset.y*(c/a.grid.dpi)*Math.abs(a.scale.y);p.bubble={tokenId:a.id,x:a.position.x,y:a.position.y,top:y,volume:$,range:S[$],viewOnSend:N.checked}}try{await Promise.all([i.broadcast.sendMessage(ae,p,{destination:"REMOTE"}),i.broadcast.sendMessage(ae,p,{destination:"LOCAL"})]),l!=="handout"&&(T.value="",T.focus()),b("Transmitted")}catch(c){console.error(c),b("Send failed",!0)}})});
