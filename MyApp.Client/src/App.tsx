import './App.css'
import { useEffect, useState } from 'react'

type Product = { id: number; name: string; cost: number; imageUrl?: string }
type Category = { id: number; name: string; description: string; products: Product[] }

const prompts = [
  'A grande hot oat milk latte with light vanilla syrup',
  'Two cappuccinos and a warmed blueberry muffin with butter',
  'An iced venti decaf Americano with room',
]

function App() {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    fetch('/coffee-shop/menu', { headers: { Accept: 'application/json' } })
      .then(response => response.ok ? response.json() : Promise.reject(response))
      .then(data => setCategories(data.results ?? []))
      .catch(() => setCategories([]))
  }, [])

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#251b16]">
      <section className="hero relative overflow-hidden px-6 py-8 sm:px-10 lg:px-16">
        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between">
          <a href="/" className="flex items-center gap-3 text-xl font-semibold tracking-tight">
            <span className="grid size-10 place-items-center rounded-full bg-[#2f513f] text-xl text-white">☕</span>
            Common Ground
          </a>
          <div className="flex items-center gap-3">
            <a className="hidden rounded-full px-4 py-2 text-sm font-medium hover:bg-white/60 sm:block" href="/ui">API Explorer</a>
            <a className="rounded-full bg-[#251b16] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#3a2a21]" href="/chat">Order with AI</a>
          </div>
        </nav>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 pb-20 pt-20 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:pb-28 lg:pt-28">
          <div>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[.22em] text-[#a25132]">Coffee, made conversational</p>
            <h1 className="max-w-3xl font-serif text-6xl leading-[.95] tracking-[-.04em] sm:text-7xl lg:text-8xl">Your usual,<br/><em className="font-normal text-[#a25132]">just ask.</em></h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#66564d]">Tell our AI barista what you feel like. It knows every size, temperature and extra—and always shows your complete order for approval before placing it.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a className="rounded-full bg-[#2f513f] px-7 py-3.5 font-semibold text-white shadow-lg shadow-[#2f513f]/15 transition hover:-translate-y-0.5 hover:bg-[#244132]" href="/chat">Start an order <span aria-hidden="true">→</span></a>
              <a className="rounded-full border border-[#c9bdb0] bg-white/50 px-7 py-3.5 font-semibold transition hover:bg-white" href="#menu">Browse menu</a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-8 rounded-[3rem] bg-[#dfcbb0]/50 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2.2rem] border border-white/80 bg-white/70 p-4 shadow-2xl shadow-[#4d3728]/15 backdrop-blur">
              <img className="h-[430px] w-full rounded-[1.65rem] object-cover" src="/products/latte-drinks.jpg" alt="Freshly prepared latte" />
              <div className="absolute bottom-8 left-8 right-8 rounded-2xl bg-[#fffdf9]/95 p-5 shadow-xl backdrop-blur">
                <div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-full bg-[#e8eee9]">✦</span><div><p className="text-xs font-semibold uppercase tracking-wider text-[#7b6b60]">Try asking</p><p className="mt-1 font-medium">“{prompts[0]}”</p></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#ddd2c5] bg-[#2f513f] px-6 py-5 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-3 text-sm">
          <span>✦ AI understands the full menu</span><span>✦ You review every detail</span><span>✦ Prices come from the database</span>
        </div>
      </section>

      <section id="menu" className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div><p className="text-sm font-semibold uppercase tracking-[.2em] text-[#a25132]">Today’s menu</p><h2 className="mt-3 font-serif text-5xl tracking-tight">Made for your moment</h2></div>
          <a className="font-semibold text-[#2f513f] hover:underline" href="/chat">Ask what’s available →</a>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.flatMap(category => category.products.slice(0, 2)).map(product => (
            <article key={product.id} className="group overflow-hidden rounded-[1.5rem] bg-white shadow-sm ring-1 ring-[#e3d9cf] transition hover:-translate-y-1 hover:shadow-xl">
              <div className="overflow-hidden"><img className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" src={product.imageUrl} alt={product.name} /></div>
              <div className="flex items-center justify-between p-5"><h3 className="font-serif text-xl">{product.name}</h3><span className="rounded-full bg-[#f1ebe3] px-3 py-1 text-sm font-semibold">${product.cost.toFixed(2)}</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24 text-center">
        <div className="rounded-[2rem] bg-[#e8ded0] px-8 py-14 sm:px-14">
          <p className="text-sm font-semibold uppercase tracking-[.2em] text-[#a25132]">Human in the loop</p>
          <h2 className="mx-auto mt-3 max-w-2xl font-serif text-4xl sm:text-5xl">AI proposes. You approve.</h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-[#66564d]">The AI can safely explore and price the menu. Submitting an order pauses for an editable approval form, so nothing is placed until it looks exactly right.</p>
          <a className="mt-7 inline-block rounded-full bg-[#251b16] px-7 py-3.5 font-semibold text-white" href="/chat">Open AI Coffee Shop</a>
        </div>
      </section>
    </main>
  )
}

export default App
