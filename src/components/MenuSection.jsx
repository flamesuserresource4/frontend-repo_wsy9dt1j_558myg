import { useEffect, useMemo, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

function MenuCard({ item }) {
  return (
    <article className="group rounded-xl bg-white text-slate-900 overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-blue-500" role="article">
      <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="p-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-slate-900">{item.name}</h3>
          <p className="text-sm text-slate-600 line-clamp-2">{item.description}</p>
        </div>
        <div className="text-right">
          <p className="text-base font-bold">${item.price.toFixed(2)}</p>
          <p className="text-xs text-slate-500">{item.category}</p>
        </div>
      </div>
    </article>
  )
}

function MenuSection() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    let url = `${API_BASE}/api/menu?limit=100`
    if (category) url += `&category=${encodeURIComponent(category)}`
    if (query) url += `&q=${encodeURIComponent(query)}`
    fetch(url).then(r => r.json()).then(data => {
      setItems(Array.isArray(data) ? data : [])
    }).finally(() => setLoading(false))
  }, [query, category])

  const categories = useMemo(() => {
    const set = new Set(items.map(i => i.category))
    return ['All', ...Array.from(set).filter(Boolean)]
  }, [items])

  return (
    <section id="menu" className="py-10 sm:py-14 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-white">Cafe menu</h2>
            <p className="text-blue-200 mt-2">Images for each item. Clear prices. Simple filters.</p>
          </div>
          <div className="flex gap-2">
            <label className="sr-only" htmlFor="menu-search">Search menu</label>
            <input id="menu-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search menu" className="w-full md:w-64 px-3 py-2 rounded-md bg-white/10 border border-white/10 text-white placeholder:text-blue-200/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400" />
            <label className="sr-only" htmlFor="menu-category">Filter by category</label>
            <select id="menu-category" value={category} onChange={e=>setCategory(e.target.value === 'All' ? '' : e.target.value)} className="px-3 py-2 rounded-md bg-white/10 border border-white/10 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {loading ? (
          <p className="mt-6 text-blue-200">Loading…</p>
        ) : (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" role="list">
            {items.map(i => (
              <MenuCard key={i.id || i._id} item={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default MenuSection