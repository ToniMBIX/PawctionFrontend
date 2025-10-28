import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'

export default function Auctions() {
  const [items, setItems] = useState<any[]>([])
  useEffect(() => {
    api.get('/auctions').then(r => setItems(r.data.data || r.data))
  }, [])

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Subastas</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map(it => (
          <Link key={it.id} to={`/subastas/${it.id}`} className="bg-white rounded-lg shadow p-4">
            <img src={it.image_url} alt={it.title} className="w-full h-40 object-cover rounded" />
            <h3 className="mt-2 font-semibold">{it.title}</h3>
            <p className="text-gray-700">Precio actual: €{(it.current_price/100).toFixed(2)}</p>
            <p className="text-sm text-gray-500">Termina: {new Date(it.ends_at).toLocaleString()}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
