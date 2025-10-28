import { api } from './api'
export async function listAuctions(){ const list = await api('/auctions'); return list.map(a=>({ ...a, description:'Pack solidario con QR', image:'/placeholder.png' })) }
export async function getAuction(id){ return api(`/auctions/${id}`) }
export async function placeBid(id, amount){ return api(`/auctions/${id}/bids`, { method:'POST', body: JSON.stringify({ amount }) }) }
export async function createOrder(auctionId, buyer){ return api('/orders', { method:'POST', body: JSON.stringify({ auctionId, buyer }) }) }
export async function createStripeCheckout(auctionId, buyer, successUrl, cancelUrl){ return api('/payments/stripe/checkout', { method:'POST', body: JSON.stringify({ auctionId, buyer, successUrl, cancelUrl }) }) }
