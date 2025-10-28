import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAuction, createOrder, createStripeCheckout } from '../lib/auctionApi'
export default function Checkout(){
  const { id } = useParams(); const [auction,setAuction]=useState(null); const [form,setForm]=useState({nombre:'',email:'',direccion:''}); const [processing,setProcessing]=useState(false)
  useMemo(async()=>{ setAuction(await getAuction(id)) },[id])
  if(!auction) return <div className="card">Cargando…</div>
  async function payDirect(e){ e.preventDefault(); setProcessing(true); try{ const payload=await createOrder(auction.id,{ name:form.nombre,email:form.email,address:form.direccion }); alert('Pedido '+payload.orderId+' creado'); } finally { setProcessing(false) } }
  async function payStripe(e){ e.preventDefault(); setProcessing(true); try{ const success=window.location.origin+'/', cancel=window.location.href; const { checkoutUrl }=await createStripeCheckout(auction.id,{ name:form.nombre,email:form.email,address:form.direccion },success,cancel); window.location.href=checkoutUrl } catch(e){ alert(e.message); } finally { setProcessing(false) } }
  return (<div className="grid md:grid-cols-2 gap-6">
    <div className="card">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form className="flex flex-col gap-3" onSubmit={payDirect}>
        <input className="input" placeholder="Nombre" value={form.nombre} onChange={e=>setForm({...form,nombre:e.target.value})}/>
        <input className="input" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
        <textarea className="input" placeholder="Dirección" rows="3" value={form.direccion} onChange={e=>setForm({...form,direccion:e.target.value})}></textarea>
        <div className="flex gap-2">
          <button className="btn flex-1" disabled={processing}>Pagar directo (simulado)</button>
          <button className="btn flex-1" disabled={processing} onClick={payStripe} type="button">Stripe (test)</button>
        </div>
      </form>
    </div>
    <div className="card">
      <h2 className="font-semibold mb-2">Resumen</h2>
      <div className="flex gap-4">
        <img src="/placeholder.png" className="w-40 h-40 object-cover rounded-xl"/>
        <div>
          <div className="font-semibold">{auction.title}</div>
          <div className="text-slate-600">Importe: €{auction.currentPrice.toFixed(2)}</div>
        </div>
      </div>
    </div>
  </div>)
}