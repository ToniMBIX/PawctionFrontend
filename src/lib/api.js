export const API_URL = import.meta.env.VITE_API_URL || '/api'
async function handle(res){ if(!res.ok){ let msg = 'API '+res.status; try{ const j=await res.json(); if(j?.error) msg+=': '+j.error }catch{} throw new Error(msg) } return res.json() }
export function api(path, options={}){ const url = (API_URL.replace(/\/$/,'') + path); return fetch(url, { headers:{'Content-Type':'application/json'}, ...options }).then(handle) }
