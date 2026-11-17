import{M as D,P as re,e as ke,f as ce,h,i as f,S as we,O as i,D as de,R as ne,s as Le,n as Se,j as Ee,C as oe,k as O}from"./protocol-BDoZm40y.js";import{P as I}from"./base-Bjovz4Wc.js";function se(e){return e.type==="IMAGE"}const W=[{kind:"dialogue",label:"Dialogue",hint:"Radio handset along the bottom of the screen."},{kind:"notice",label:"Notice",hint:"Framed window in the middle of the screen. Good for briefings."},{kind:"monologue",label:"Monologue",hint:"No box: the portrait and a caption bar sit over the scene. Best with cut-out art."},{kind:"handout",label:"Handout",hint:"Shows pictures only - posters, documents, manifests."},{kind:"bubble",label:"Bubble",hint:"Speech bubble on the map, seen only by players with a token in range."}],K=["whisper","talk","yell"],le=["CHARACTER","MOUNT","PROP"],$e={CHARACTER:"Characters",MOUNT:"Mounts",PROP:"Props"},U=(e,n)=>`<div class="segmented" role="radiogroup" data-seg="${e}">${n.map(([s,L])=>`<button type="button" role="radio" data-value="${s}">${L}</button>`).join("")}</div>`,v=document.querySelector("#app");v.innerHTML=`
  <form class="panel" autocomplete="off">
    <header>
      <h1>Lancer <span>//</span> Comms</h1>
      <span class="status" id="status">Standby</span>
    </header>

    <div class="field">
      <span class="label">Style</span>
      <div class="segmented styles" role="radiogroup" id="styles">
        ${W.map(e=>`<button type="button" role="radio" data-kind="${e.kind}">${e.label}</button>`).join("")}
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
        <button type="button" class="mini" id="portrait-choose" title="Pick from your Owlbear Rodeo image library">Library&hellip;</button>
        <button type="button" class="mini" id="portrait-map" title="Use the image selected on the map">From map</button>
        <button type="button" class="mini x" id="portrait-clear" title="Use the token's image" hidden>&#x2715;</button>
      </div>
      <label class="check" data-for="dialogue notice"><input type="checkbox" id="tint" /> <span>Tint portrait <small>recolour it to the signal colour</small></span></label>
    </div>

    <div class="field" data-for="handout">
      <span class="label">Images <small>up to ${D}, shown one after another</small></span>
      <div class="picker">
        <span class="pick-name" id="handout-names">None chosen</span>
        <button type="button" class="mini" id="handout-choose" title="Pick from your Owlbear Rodeo image library">Library&hellip;</button>
        <button type="button" class="mini" id="handout-map" title="Use the images selected on the map">From map</button>
        <button type="button" class="mini x" id="handout-clear" title="Clear" hidden>&#x2715;</button>
      </div>
      <div class="thumbs" id="handout-thumbs"></div>
      <p class="hint small">Library: everything you've uploaded to Owlbear Rodeo. From map: select images on the map first (any layer, they can be hidden), then press it.</p>
    </div>
    <label class="field" data-for="handout">
      <span class="label">Title <small>optional</small></span>
      <input id="title" type="text" maxlength="60" placeholder="e.g. Recovered document" />
    </label>

    <div class="field" data-for="dialogue notice monologue handout">
      <span class="label">Signal colour</span>
      <div class="swatches" role="radiogroup" id="colours">
        ${ce.map(e=>`<button type="button" role="radio" data-colour="${e}" style="--sw:${I[e].accent}">${I[e].label}</button>`).join("")}
      </div>
      <p class="hint small" id="colour-hint"></p>
    </div>

    <div class="row" data-for="dialogue notice monologue">
      <div class="field">
        <span class="label">Text reveal</span>
        ${U("reveal",[["type","Type"],["decrypt","Decrypt"],["instant","Instant"]])}
      </div>
      <div class="field">
        <span class="label">Speed</span>
        ${U("speed",[["slow","Slow"],["speak","Speak"],["fast","Fast"]])}
      </div>
    </div>

    <div class="field" data-for="dialogue notice monologue handout">
      <span class="label">Effect</span>
      ${U("effect",[["clean","Clean"],["static","Static"],["glitch","Glitch"],["weak","Weak signal"]])}
    </div>

    <div class="field" data-for="bubble">
      <span class="label">Speech ranges <small id="range-unit">in map units</small> <small id="range-lock">GM only</small></span>
      <div class="ranges">
        ${K.map(e=>`<label class="range ${e}"><span>${e}</span><input type="number" min="0" step="1" data-range="${e}" /></label>`).join("")}
      </div>
    </div>

    <label class="field grow" data-for="dialogue notice monologue bubble">
      <span class="label">Message <small data-for="dialogue notice monologue">type ${re} for a new page &middot; Ctrl+Enter sends</small></span>
      <textarea id="message" maxlength="${ke}" placeholder="Type your message"></textarea>
    </label>

    <label class="field" data-for="dialogue notice monologue handout">
      <span class="label">Send to</span>
      <select id="target"></select>
    </label>

    <div class="field" data-for="bubble">
      <span class="label">Volume</span>
      <div class="segmented" id="volumes" role="radiogroup">
        ${K.map(e=>`<button type="button" role="radio" class="${e}" data-volume="${e}">${e}</button>`).join("")}
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
  </form>`;const o=e=>document.getElementById(e),P=v.querySelector("form"),c=o("token"),ie=o("override"),Ae=o("subtitle"),xe=o("title"),E=o("target"),M=o("message"),N=o("tint"),q=o("view-on-send"),_=o("fx-off"),C=o("status"),ue=[...v.querySelectorAll("[data-kind]")],pe=[...v.querySelectorAll("[data-colour]")],me=[...v.querySelectorAll("[data-volume]")],be=[...v.querySelectorAll("[data-range]")];let r=h("kind","dialogue");W.some(e=>e.kind===r)||(r="dialogue");let A=h("volume","talk"),S={...de};const x={reveal:h("reveal","type"),speed:h("speed","speak"),effect:h("effect","clean")},ge=e=>{const n=h(`colour:${e}`,"");return ce.includes(n)?n:e==="monologue"||e==="handout"?"white":"green"};let $=ge(r);const w=h("portraits",{});let g=[];function he(e,n){x[e]=n,f(e,n);for(const s of v.querySelectorAll(`[data-seg="${e}"] button`))s.setAttribute("aria-checked",String(s.dataset.value===n))}function fe(e){$=e,f(`colour:${r}`,$);for(const n of pe)n.setAttribute("aria-checked",String(n.dataset.colour===$));o("colour-hint").textContent=`Suggested for: ${I[$].hint}`,P.style.setProperty("--pick",I[$].accent)}function H(e){r=e,f("kind",r);for(const s of ue)s.setAttribute("aria-checked",String(s.dataset.kind===r));o("style-hint").textContent=W.find(s=>s.kind===r).hint;for(const s of v.querySelectorAll("[data-for]"))s.hidden=!s.dataset.for.split(" ").includes(r);fe(ge(r));const n=c.querySelector('option[value=""]');if(n&&(n.disabled=r==="bubble"),r==="bubble"&&c.value===""){const s=[...c.options].find(L=>L.value);s&&(c.value=s.value)}T()}function ve(e){A=e,f("volume",A);for(const n of me)n.setAttribute("aria-checked",String(n.dataset.volume===A))}function F(){for(const e of be)e.value=String(S[e.dataset.range])}function m(e,n=!1){C.textContent=e,C.classList.toggle("bad",n),C.classList.remove("pulse"),C.offsetWidth,C.classList.add("pulse")}const R=()=>c.value||"none";let V=()=>{};function T(){const e=w[R()],n=(e==null?void 0:e.url)??V();o("portrait-name").textContent=e?e.name:n?"Token image":"None",o("portrait-clear").hidden=!e;const s=o("portrait-thumb");s.style.backgroundImage=n?`url("${n.replace(/"/g,"%22")}")`:"",s.classList.toggle("empty",!n)}function j(){o("handout-names").textContent=g.length?g.length===1?g[0].name:`${g.length} images`:"None chosen",o("handout-clear").hidden=g.length===0,o("handout-thumbs").innerHTML=g.map(e=>`<span style="background-image:url(&quot;${O(e.url)}&quot;)" title="${O(e.name)}"></span>`).join("")}for(const e of ue)e.addEventListener("click",()=>H(e.dataset.kind));for(const e of pe)e.addEventListener("click",()=>fe(e.dataset.colour));for(const e of me)e.addEventListener("click",()=>ve(e.dataset.volume));for(const e of v.querySelectorAll("[data-seg]"))for(const n of e.querySelectorAll("button"))n.addEventListener("click",()=>he(e.dataset.seg,n.dataset.value));N.checked=h("tint",!0);N.addEventListener("change",()=>f("tint",N.checked));q.checked=h("viewOnSend",!0);q.addEventListener("change",()=>f("viewOnSend",q.checked));_.checked=h("fxOff",!1);_.addEventListener("change",()=>f("fxOff",_.checked));M.addEventListener("keydown",e=>{e.key==="Enter"&&(e.ctrlKey||e.metaKey)&&P.requestSubmit()});o("portrait-clear").addEventListener("click",()=>{delete w[R()],f("portraits",w),T()});o("handout-clear").addEventListener("click",()=>{g=[],j()});for(const e of Object.keys(x))he(e,x[e]);ve(A);F();j();H(r);we?(document.documentElement.classList.add("standalone"),c.innerHTML='<option value="">No token (name only)</option><optgroup label="Characters"><option selected value="a">Kestrel-2</option><option value="b">Cpt. Virall</option></optgroup><optgroup label="Props"><option value="c">Relay tower</option></optgroup>',E.innerHTML="<option>Entire party</option><option>Only me (preview)</option>",H(new URLSearchParams(location.search).get("style")??r),P.addEventListener("submit",e=>e.preventDefault())):i.onReady(async()=>{var te,ae;const e=i.player.id,n=await i.player.getRole()==="GM";let s=[],L=await i.scene.isReady();const y=t=>{var a,l;return((l=(a=t.text)==null?void 0:a.plainText)==null?void 0:l.trim())||t.name||"Unnamed"},Y=t=>se(t)&&le.includes(t.layer),B=()=>s.find(t=>t.id===c.value);V=()=>{const t=B();return t&&t.image.mime.startsWith("image/")?t.image.url:void 0};const X=(t,a)=>{const l=u=>u.map(d=>`${d.id}:${d.layer}:${y(d)}`).join("|"),p=t.filter(u=>n||u.createdUserId===e).sort((u,d)=>y(u).localeCompare(y(d)));if(l(p)===l(s)&&c.options.length)return;s=p;const b=c.value;c.innerHTML='<option value="">No token (name only)</option>'+le.map(u=>{const d=s.filter(k=>k.layer===u);return d.length?`<optgroup label="${$e[u]}">${d.map(k=>`<option value="${k.id}">${O(y(k))}</option>`).join("")}</optgroup>`:""}).join(""),c.value=s.some(u=>u.id===b)?b:"",H(r),a&&(c.classList.remove("changed"),c.offsetWidth,c.classList.add("changed"))},z=async t=>{X(L?await i.scene.items.getItems(Y):[],t)};await z(!1);const G=await i.player.getSelection(),J=s.find(t=>G==null?void 0:G.includes(t.id));J&&(c.value=J.id),c.addEventListener("change",()=>{c.classList.remove("changed");const t=B();ie.placeholder=t?y(t):"Name to show",T()}),c.dispatchEvent(new Event("change")),i.scene.items.onChange(t=>X(t.filter(Y),!0)),i.scene.onReadyChange(async t=>{L=t,await z(!0)}),o("portrait-choose").addEventListener("click",async()=>{try{const[t]=await i.assets.downloadImages(!1);if(!t)return;w[R()]={url:t.image.url,name:t.name||"Chosen image"},f("portraits",w),T()}catch(t){console.error(t),m("Couldn't open images",!0)}}),o("handout-choose").addEventListener("click",async()=>{try{const t=await i.assets.downloadImages(!0);if(!t.length)return;g=t.slice(0,D).map(a=>({url:a.image.url,width:a.image.width,height:a.image.height,name:a.name||"Image"})),j()}catch(t){console.error(t),m("Couldn't open images",!0)}});const Q=async()=>{const t=await i.player.getSelection()??[];if(!t.length)return[];const a=await i.scene.items.getItems(t);return t.map(l=>a.find(p=>p.id===l)).filter(l=>!!l&&se(l)&&l.image.mime.startsWith("image/"))};o("portrait-map").addEventListener("click",async()=>{const[t]=await Q();if(!t)return m("Select an image on the map",!0);w[R()]={url:t.image.url,name:y(t)},f("portraits",w),T()}),o("handout-map").addEventListener("click",async()=>{const t=await Q();if(!t.length)return m("Select images on the map",!0);g=t.slice(0,D).map(a=>({url:a.image.url,width:a.image.width,height:a.image.height,name:y(a)})),j()});const Z=t=>{const a=E.value||"ALL";E.innerHTML='<option value="ALL">Entire party</option>'+t.map(l=>`<option value="${l.id}">${O(l.name)}${l.role==="GM"?" (GM)":""}</option>`).join("")+`<option value="${e}">Only me (preview)</option>`,E.value=[...E.options].some(l=>l.value===a)?a:"ALL"};Z(await i.party.getPlayers()),i.party.onChange(Z);const ee=t=>{const a=t[ne];S={...de};for(const l of K){const p=a==null?void 0:a[l];typeof p=="number"&&p>=0&&(S[l]=p)}F()};ee(await i.room.getMetadata()),i.room.onMetadataChange(ee),o("range-lock").hidden=n;for(const t of be)t.disabled=!n,t.addEventListener("change",()=>{const a=Number(t.value);if(!Number.isFinite(a)||a<0)return F();S={...S,[t.dataset.range]:a},i.room.setMetadata({[ne]:S}).catch(()=>m("Couldn't save ranges",!0))});if(L){const a=(ae=(te=(await i.scene.grid.getScale()).parsed)==null?void 0:te.unit)==null?void 0:ae.trim();a&&(o("range-unit").textContent=`in ${a}`)}o("clear-bubbles").addEventListener("click",()=>{Le({type:"clear-bubbles"}),m("Bubbles cleared")}),P.addEventListener("submit",async t=>{var u;t.preventDefault();const a=B(),l=await i.player.getName(),p=M.value.trim(),b={id:Se(),kind:r,name:ie.value.trim()||(a?y(a):l),subtitle:r==="notice"&&Ae.value.trim()||void 0,image:((u=w[R()])==null?void 0:u.url)??V(),tint:N.checked,pages:[],colour:$,reveal:x.reveal,speed:x.speed,effect:x.effect,target:r==="bubble"?"ALL":E.value||"ALL",from:{id:e,name:l}};if(r==="handout"){if(!g.length)return m("Choose an image",!0);b.name=xe.value.trim()||"Handout",b.image=void 0,b.images=g.map(({url:d,width:k,height:ye})=>({url:d,width:k,height:ye}))}else if(!p||(b.pages=r==="bubble"?[p.split(re).join(" ").slice(0,600)]:Ee(p),b.pages.length===0))return m("No message",!0);if(r==="bubble"){if(!a)return m("Pick a token",!0);const d=await i.scene.grid.getDpi(),k=a.position.y-a.grid.offset.y*(d/a.grid.dpi)*Math.abs(a.scale.y);b.bubble={tokenId:a.id,x:a.position.x,y:a.position.y,top:k,volume:A,range:S[A],viewOnSend:q.checked}}try{await Promise.all([i.broadcast.sendMessage(oe,b,{destination:"REMOTE"}),i.broadcast.sendMessage(oe,b,{destination:"LOCAL"})]),r!=="handout"&&(M.value="",M.focus()),m("Transmitted")}catch(d){console.error(d),m("Send failed",!0)}})});
