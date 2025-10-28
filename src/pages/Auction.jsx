import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAuction, placeBid } from '../lib/auctionApi'
export default function Auction(){
  const { id } = useParams(); const [auction,setAuction]=useState(null); const [inc,setInc]=useState(1)
  useEffect(()=>{ let stop=false; (async function loop(){ while(!stop){ try{ setAuction(await getAuction(id)) }catch(e){} await new Promise(r=>setTimeout(r,1000)) } })(); return ()=>{stop=true} },[id])
  if(!auction) return <div className="card">Cargando…</div>
  return (<div className="grid md:grid-cols-2 gap-6">
    <div className="card"><img alt={auction.title} src="/placeholder.png" className="rounded-xl"/></div>
    <div className="card flex flex-col gap-4">
      <h1 className="text-2xl font-bold">{auction.title}</h1>
      <div className="flex justify-between">
        <div><div className="text-sm text-slate-500">Precio actual</div><div className="text-2xl font-bold">€{auction.currentPrice.toFixed(2)}</div></div>
      </div>
      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <label className="text-sm text-slate-600">Incremento (mín. €{auction.minIncrement})</label>
          <input type="number" className="input mt-1" min={auction.minIncrement} value={inc} onChange={e=>setInc(parseFloat(e.target.value||auction.minIncrement))} />
        </div>
        <button className="btn" onClick={async()=>{ try{ await placeBid(auction.id,inc); setAuction(await getAuction(auction.id)) }catch(e){ alert(e.message) } }}>Pujar</button>
      </div>
    </div>
  </div>)
}