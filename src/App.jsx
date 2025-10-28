import { Routes, Route, Link, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import Auction from './pages/Auction'
import Checkout from './pages/Checkout'
export default function App(){
  return (<div className="min-h-screen">
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto p-4 flex items-center gap-6">
        <Link to="/" className="text-2xl font-bold text-emerald-700">Pawction</Link>
        <nav className="flex gap-4">
          <NavLink to="/" className={({isActive})=>isActive?'text-emerald-700 font-semibold':'text-slate-700'}>Inicio</NavLink>
        </nav>
      </div>
    </header>
    <main className="max-w-6xl mx-auto p-4">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/auction/:id" element={<Auction/>}/>
        <Route path="/checkout/:id" element={<Checkout/>}/>
      </Routes>
    </main>
  </div>)
}