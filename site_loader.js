// Shared site loader - reads from Supabase site_settings
const SB_URL='https://mnmjfzjfuvlvkhhfauzg.supabase.co';
const SB_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ubWpmempmdXZsdmtoaGZhdXpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxMDI2NjIsImV4cCI6MjA4ODY3ODY2Mn0.1qQGm-FQk8tnCbBhdmJX-cXqTaEHPqITAsdphfkwg8I';

async function loadSiteSettings(){
  try{
    const r=await fetch(`${SB_URL}/rest/v1/site_settings?select=*`,{headers:{'apikey':SB_KEY,'Authorization':'Bearer '+SB_KEY}});
    const data=await r.json();
    const ss={};
    if(Array.isArray(data))data.forEach(row=>{ss[row.key]=row.value||'';});
    return ss;
  }catch(e){return{};}
}

function applySiteSettings(ss){
  // Phone & WhatsApp links
  const wa=ss.whatsapp||'905XXXXXXXXX';
  const phone=ss.phone||'+90 5XX XXX XX XX';
  const email=ss.email||'info@torfvetoprak.com';

  document.querySelectorAll('[data-ss]').forEach(el=>{
    const key=el.dataset.ss;
    if(ss[key]!==undefined)el.textContent=ss[key];
  });
  document.querySelectorAll('[data-ss-href]').forEach(el=>{
    const key=el.dataset.ssHref;
    if(key==='whatsapp')el.href='https://wa.me/'+wa;
    else if(key==='phone')el.href='tel:'+phone;
    else if(key==='email')el.href='mailto:'+email;
    else if(ss[key])el.href=ss[key];
  });
  document.querySelectorAll('[data-ss-wa]').forEach(el=>{
    const msg=el.dataset.ssWa||'';
    el.href='https://wa.me/'+wa+(msg?'?text='+encodeURIComponent(msg):'');
  });

  // Address & hours
  if(ss.address)document.querySelectorAll('[data-ss-address]').forEach(el=>el.innerHTML=ss.address.replace(/\n/g,'<br>'));
  if(ss.working_hours)document.querySelectorAll('[data-ss-hours]').forEach(el=>el.textContent=ss.working_hours);

  // Reviews
  [1,2,3].forEach(n=>{
    const name=ss[`review_${n}_name`];
    const role=ss[`review_${n}_role`];
    const text=ss[`review_${n}_text`];
    if(name)document.querySelectorAll(`[data-ss-r${n}-name]`).forEach(el=>el.textContent=name);
    if(role)document.querySelectorAll(`[data-ss-r${n}-role]`).forEach(el=>el.textContent=role);
    if(text)document.querySelectorAll(`[data-ss-r${n}-text]`).forEach(el=>el.textContent='"'+text+'"');
    // Avatar first letter
    if(name)document.querySelectorAll(`[data-ss-r${n}-avatar]`).forEach(el=>el.textContent=name.charAt(0).toUpperCase());
  });

  // Stats
  if(ss.stat_customers)document.querySelectorAll('[data-ss-stat-customers]').forEach(el=>el.textContent=ss.stat_customers);

  // Google Maps
  if(ss.google_maps_url){
    document.querySelectorAll('[data-ss-maps-url]').forEach(el=>el.href=ss.google_maps_url);
    document.querySelectorAll('[data-ss-maps-iframe]').forEach(el=>{
      // If it's an embed URL, create iframe
      if(ss.google_maps_url.includes('embed')){
        el.innerHTML=`<iframe src="${ss.google_maps_url}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`;
      }
    });
  }
}

(async()=>{
  const ss=await loadSiteSettings();
  applySiteSettings(ss);
})();
