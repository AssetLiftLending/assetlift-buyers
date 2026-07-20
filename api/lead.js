export default async function handler(req,res){
  if(req.method!=="POST")return res.status(405).json({error:"Method not allowed"});
  const data=req.body||{}; if(!data.name||!data.email||!data.address)return res.status(400).json({error:"Required fields missing"});
  // Add RESEND_API_KEY in Vercel to enable delivery. Until then, submissions return
  // a setup status and the browser opens a pre-addressed email as a safe fallback.
  if(!process.env.RESEND_API_KEY)return res.status(503).json({error:"Email delivery not configured"});
  const rows=Object.entries(data).map(([k,v])=>`<tr><td style="padding:6px;font-weight:bold">${escapeHtml(k)}</td><td style="padding:6px">${escapeHtml(String(v))}</td></tr>`).join('');
  const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:process.env.LEAD_FROM_EMAIL||'AssetLift Website <onboarding@resend.dev>',to:['info@assetliftlending.com'],reply_to:data.email,subject:`New property lead: ${data.address}`,html:`<h2>New AssetLift property lead</h2><table>${rows}</table>`})});
  if(!response.ok)return res.status(502).json({error:"Delivery failed"}); return res.status(200).json({ok:true});
}
function escapeHtml(s){return s.replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
