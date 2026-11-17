import{e as x,d as A,f as T,S as Z,O as o,R as U,s as ee,C as K}from"./prefs-BezfaWcc.js";import{P as te,a as ae}from"./base-s3LpW-87.js";import{P as F,M as ne,D as W,s as se,n as oe}from"./protocol-BL70eVvH.js";function _(e){return e.type==="IMAGE"}const Y=[{kind:"dialogue",label:"Dialogue",hint:"Comms bar along the bottom of the screen, typed out line by line."},{kind:"notice",label:"Notice",hint:"A solid poster in the middle of the screen. Good for briefings and handouts."},{kind:"monologue",label:"Monologue",hint:"Like a notice, but see-through so the words sit over the scene."},{kind:"bubble",label:"Bubble",hint:"A speech bubble on the map, seen only by players with a token in range."}],N=["whisper","talk","yell"],k=document.querySelector("#app");k.innerHTML=`
  <form class="panel" autocomplete="off">
    <header>
      <h1>Lancer <span>//</span> Comms</h1>
      <span class="status" id="status">Standby</span>
    </header>

    <label class="field">
      <span class="label">Speaker</span>
      <select id="token"></select>
    </label>

    <label class="field">
      <span class="label">Display name <small>optional - replaces the token's name</small></span>
      <input id="override" type="text" maxlength="60" placeholder="Token name" />
    </label>

    <div class="field">
      <span class="label">Style</span>
      <div class="segmented" id="styles" role="radiogroup" aria-label="Style">
        ${Y.map(e=>`<button type="button" role="radio" data-kind="${e.kind}">${e.label}</button>`).join("")}
      </div>
      <p class="hint" id="style-hint"></p>
    </div>

    <label class="field box-only">
      <span class="label">Frame colour</span>
      <select id="palette">
        ${te.map(e=>`<optgroup label="${e.title}">${e.keys.map(r=>`<option value="${r}">${x(ae[r].label)}</option>`).join("")}</optgroup>`).join("")}
      </select>
    </label>

    <div class="field bubble-only">
      <span class="label">Speech ranges <small id="range-unit">in map units</small> <small id="range-lock">GM only</small></span>
      <div class="ranges">
        ${N.map(e=>`<label class="range ${e}"><span>${e}</span><input type="number" min="0" step="1" data-range="${e}" /></label>`).join("")}
      </div>
    </div>

    <label class="field grow">
      <span class="label">Message <small class="box-only">type ${F} to start a new page</small></span>
      <textarea id="message" maxlength="${ne}" placeholder="Type your message"></textarea>
    </label>

    <label class="field box-only">
      <span class="label">Send to</span>
      <select id="target"></select>
    </label>

    <div class="field bubble-only">
      <span class="label">Volume</span>
      <div class="segmented" id="volumes" role="radiogroup" aria-label="Volume">
        ${N.map(e=>`<button type="button" role="radio" class="${e}" data-volume="${e}">${e}</button>`).join("")}
      </div>
      <label class="check"><input type="checkbox" id="view-on-send" /> <span>View on send <small>show the bubble on my own token</small></span></label>
    </div>

    <footer>
      <button type="button" class="ghost bubble-only" id="clear-bubbles">Clear my bubbles</button>
      <button type="submit" class="send" id="send">Transmit <span>&#9656;</span></button>
    </footer>
  </form>`;const c=e=>document.getElementById(e),E=k.querySelector("form"),l=c("token"),V=c("override"),w=c("palette"),y=c("target"),S=c("message"),$=c("view-on-send"),h=c("status"),X=[...k.querySelectorAll("[data-kind]")],z=[...k.querySelectorAll("[data-volume]")],J=[...k.querySelectorAll("[data-range]")];let i=A("kind","dialogue"),v=A("volume","talk"),g={...W};const le=e=>A(`palette:${e}`,e==="notice"?"alert":"comms");function P(e){i=e,T("kind",i);for(const d of X)d.setAttribute("aria-checked",String(d.dataset.kind===i));c("style-hint").textContent=Y.find(d=>d.kind===i).hint,E.dataset.kind=i,i!=="bubble"&&(w.value=le(i));const r=l.querySelector('option[value=""]');if(r&&(r.disabled=i==="bubble"),i==="bubble"&&l.value===""){const d=[...l.options].find(u=>u.value);d&&(l.value=d.value)}}function Q(e){v=e,T("volume",v);for(const r of z)r.setAttribute("aria-checked",String(r.dataset.volume===v))}function O(){for(const e of J)e.value=String(g[e.dataset.range])}function m(e,r=!1){h.textContent=e,h.classList.toggle("bad",r),h.classList.remove("pulse"),h.offsetWidth,h.classList.add("pulse")}for(const e of X)e.addEventListener("click",()=>P(e.dataset.kind));for(const e of z)e.addEventListener("click",()=>Q(e.dataset.volume));w.addEventListener("change",()=>T(`palette:${i}`,w.value));$.checked=A("viewOnSend",!0);$.addEventListener("change",()=>T("viewOnSend",$.checked));S.addEventListener("keydown",e=>{e.key==="Enter"&&(e.ctrlKey||e.metaKey)&&E.requestSubmit()});P(i);Q(v);O();Z?(document.documentElement.classList.add("standalone"),l.innerHTML='<option value="">No token (name only)</option><option selected>Kestrel-2</option><option>Cmdr. Okonkwo</option>',y.innerHTML="<option>Entire party</option><option>Only me (preview)</option>",E.addEventListener("submit",e=>e.preventDefault())):o.onReady(async()=>{var B,q;const e=o.player.id,d=await o.player.getRole()==="GM";let u=[],M=await o.scene.isReady();const b=n=>{var a,t;return((t=(a=n.text)==null?void 0:a.plainText)==null?void 0:t.trim())||n.name||"Unnamed token"},G=(n,a)=>{const t=u.map(s=>`${s.id}:${b(s)}`).join("|");u=n.filter(s=>d||s.createdUserId===e).sort((s,R)=>b(s).localeCompare(b(R)));const p=u.map(s=>`${s.id}:${b(s)}`).join("|");if(t===p&&l.options.length)return;const L=l.value;l.innerHTML='<option value="">No token (name only)</option>'+u.map(s=>`<option value="${s.id}">${x(b(s))}</option>`).join("");const f=u.some(s=>s.id===L);l.value=f?L:"",P(i),a&&(l.classList.remove("changed"),l.offsetWidth,l.classList.add("changed"))},j=async n=>{const a=M?await o.scene.items.getItems(t=>_(t)&&(t.layer==="CHARACTER"||t.layer==="MOUNT")):[];G(a,n)};await j(!1);const C=await o.player.getSelection(),H=u.find(n=>C==null?void 0:C.includes(n.id));H&&(l.value=H.id),l.addEventListener("change",()=>{l.classList.remove("changed");const n=u.find(a=>a.id===l.value);V.placeholder=n?b(n):"Name to show"}),l.dispatchEvent(new Event("change")),o.scene.items.onChange(n=>{G(n.filter(a=>_(a)&&(a.layer==="CHARACTER"||a.layer==="MOUNT")),!0)}),o.scene.onReadyChange(async n=>{M=n,await j(!0)});const I=n=>{const a=y.value||"ALL";y.innerHTML='<option value="ALL">Entire party</option>'+n.map(t=>`<option value="${t.id}">${x(t.name)}${t.role==="GM"?" (GM)":""}</option>`).join("")+`<option value="${e}">Only me (preview)</option>`,y.value=[...y.options].some(t=>t.value===a)?a:"ALL"};I(await o.party.getPlayers()),o.party.onChange(I);const D=n=>{const a=n[U];g={...W};for(const t of N){const p=a==null?void 0:a[t];typeof p=="number"&&p>=0&&(g[t]=p)}O()};D(await o.room.getMetadata()),o.room.onMetadataChange(D),c("range-lock").hidden=d;for(const n of J)n.disabled=!d,n.addEventListener("change",()=>{const a=Number(n.value);if(!Number.isFinite(a)||a<0)return O();g={...g,[n.dataset.range]:a},o.room.setMetadata({[U]:g}).catch(()=>m("Couldn't save ranges",!0))});if(M){const a=(q=(B=(await o.scene.grid.getScale()).parsed)==null?void 0:B.unit)==null?void 0:q.trim();a&&(c("range-unit").textContent=`in ${a}`)}c("clear-bubbles").addEventListener("click",()=>{ee({type:"clear-bubbles"}),m("Bubbles cleared")}),E.addEventListener("submit",async n=>{n.preventDefault();const a=S.value.trim();if(!a)return m("No message",!0);const t=u.find(s=>s.id===l.value),p=await o.player.getName(),L=V.value.trim()||(t?b(t):p),f={id:oe(),kind:i,name:L,image:t&&t.image.mime.startsWith("image/")?t.image.url:void 0,pages:i==="bubble"?[a.split(F).join(" ").slice(0,600)]:se(a),palette:w.value,target:i==="bubble"?"ALL":y.value||"ALL",from:{id:e,name:p}};if(i==="bubble"){if(!t)return m("Pick a token",!0);const s=await o.scene.grid.getDpi(),R=t.position.y-t.grid.offset.y*(s/t.grid.dpi)*Math.abs(t.scale.y);f.bubble={tokenId:t.id,x:t.position.x,y:t.position.y,top:R,volume:v,range:g[v],viewOnSend:$.checked}}if(f.pages.length===0)return m("No message",!0);try{await Promise.all([o.broadcast.sendMessage(K,f,{destination:"REMOTE"}),o.broadcast.sendMessage(K,f,{destination:"LOCAL"})]),S.value="",S.focus(),m("Transmitted")}catch(s){console.error(s),m("Send failed",!0)}})});
