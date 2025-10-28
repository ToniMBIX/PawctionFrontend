import { Link } from 'react-router-dom'

export default function App() {
  return (
    <main className="max-w-5xl mx-auto p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">🐾 Pawction</h1>
        <nav className="space-x-4">
          <Link to="/subastas" className="text-blue-600 hover:underline">Subastas</Link>
          <Link to="/favoritos" className="text-blue-600 hover:underline">Favoritos</Link>
          <Link to="/perfil" className="text-blue-600 hover:underline">Perfil</Link>
        </nav>
      </header>
      <section className="mt-8">
        <h2 className="text-xl font-semibold">Subastas solidarias para adopción responsable</h2>
        <p className="mt-2 text-gray-700">Participa en subastas de packs (taza + llavero) con la imagen del animal en adopción. Cada nueva puja reinicia el temporizador a 24 horas.</p>
        <div className="mt-6">
          <Link to="/subastas" className="px-4 py-2 bg-blue-600 text-white rounded">Ver subastas</Link>
        </div>
      </section>
    </main>
  )
}
