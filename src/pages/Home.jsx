import { useEffect, useState } from 'react'
import { listAuctions } from '../lib/auctionApi'
import { Link } from 'react-router-dom'
export default function Home(){
  const [auctions,setAuctions]=useState([])
  useEffect(()=>{ let stop=false; (async function loop(){ while(!stop){ try{ setAuctions(await listAuctions()) }catch(e){} await new Promise(r=>setTimeout(r,1000)) } })(); return ()=>{stop=true} },[])
  return (<div className="grid md:grid-cols-3 gap-6">
    {auctions.map(a => <div className="card" key={a.id}>
      <img alt={a.title} src="/placeholder.png" className="aspect-video object-cover rounded-xl"/>
      <div className="mt-3"><h3 className="text-lg font-semibold">{a.title}</h3></div>
      <div className="flex items-center justify-between mt-3">
        <div><div className="text-sm text-slate-500">Precio actual</div><div className="text-xl font-bold">€{a.currentPrice.toFixed(2)}</div></div>
        <Link to={`/auction/${a.id}`} className="btn">Pujar</Link>
      </div>
    </div>)}
  </div>)
}