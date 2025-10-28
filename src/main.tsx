import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles.css'
import App from './App'
import Auctions from './pages/Auctions'
import AuctionDetail from './pages/AuctionDetail'
import Login from './pages/Login'
import Favorites from './pages/Favorites'
import Profile from './pages/Profile'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/subastas', element: <Auctions /> },
  { path: '/subastas/:id', element: <AuctionDetail /> },
  { path: '/login', element: <Login /> },
  { path: '/favoritos', element: <Favorites /> },
  { path: '/perfil', element: <Profile /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
