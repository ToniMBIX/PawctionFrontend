import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api, authHeader } from '../api'

export default function AuctionDetail() {
  const { id } = useParams()
  const [data, setData] = useState<any>(null)
  const [amount, setAmount] = useState('')

  const load = () => api.get(`/auctions/${id}`).then(r => setData(r.data))
  useEffect(() => {
    load()
    const t = setInterval(load, 5000) // polling simple
    return () => clearInterval(t)
  }, [id])

  const bid = async () => {
    await api.post(`/auctions/${id}/bids`, { amount: Number(amount) * 100 }, { headers: authHeader() })
    setAmount('')
    load()
  }

  const favorite = async () => {
    await api.post(`/auctions/${id}/favorite`, {}, { headers: authHeader() })
    load()
  }

  if (!data) return <div className="max-w-3xl mx-auto p-6">Cargando…</div>

  return (
    <div className="max-w-3xl mx-auto p-6">
      <img src={data.image_url} className="w-full h-64 object-cover rounded" />
      <h1 className="text-2xl font-bold mt-4">{data.title}</h1>
      <p className="text-gray-700">{data.description}</p>
      <p className="mt-2">Precio actual: <strong>€{(data.current_price/100).toFixed(2)}</strong></p>
      <p className="text-sm text-gray-500">Termina: {new Date(data.ends_at).toLocaleString()}</p>

      <div className="mt-4 flex gap-2">
        <input className="border rounded px-3 py-2 w-40" placeholder="Tu puja (€)" value={amount} onChange={e => setAmount(e.target.value)} />
        <button onClick={bid} className="px-4 py-2 bg-blue-600 text-white rounded">Pujar</button>
        <button onClick={favorite} className="px-4 py-2 bg-amber-500 text-white rounded">Favorito ★</button>
      </div>

      <div className="mt-6">
        <a className="text-blue-600 underline" href={data.qr_url} target="_blank">Ver QR del animal</a>
      </div>
    </div>
  )
}
