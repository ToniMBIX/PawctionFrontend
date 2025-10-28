import { useEffect, useState } from 'react'
import { api, authHeader } from '../api'
import { Link } from 'react-router-dom'

export default function Favorites() {
  const [items, setItems] = useState<any[]>([])
  useEffect(() => {
    api.get('/me/favorites', { headers: authHeader() }).then(r => setItems(r.data))
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Mis favoritos</h1>
      <ul className="space-y-3">
        {items.map(it => (
          <li key={it.id} className="bg-white p-4 rounded shadow flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{it.auction.title}</h3>
              <p className="text-sm text-gray-600">Precio actual: €{(it.auction.current_price/100).toFixed(2)}</p>
            </div>
            <Link to={`/subastas/${it.auction_id}`} className="text-blue-600 underline">Ver</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
