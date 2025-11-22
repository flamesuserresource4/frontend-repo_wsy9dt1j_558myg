import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

function DetailRow({ label, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-2">
      <dt className="w-32 shrink-0 text-slate-400 text-sm">{label}</dt>
      <dd className="text-slate-100/90 text-sm sm:text-base">{children}</dd>
    </div>
  )
}

function MenuItemDetail({ item }) {
  return (
    <article className="rounded-xl overflow-hidden bg-white text-slate-900 shadow-sm focus-within:ring-2 focus-within:ring-blue-500" aria-labelledby={`item-${item._id || item.id}-title`}>
      <div className="grid grid-cols-1 sm:grid-cols-[320px,1fr]">
        <div className="bg-slate-100 aspect-[4/3] sm:aspect-auto sm:h-full">
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="p-5 sm:p-6">
          <header className="flex items-start justify-between gap-4">
            <div>
              <h3 id={`item-${item._id || item.id}-title`} className="text-xl font-semibold text-slate-900">{item.name}</h3>
              <p className="mt-1 text-slate-600">
                {item.description}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}</p>
              <p className="text-xs text-slate-500 mt-0.5">{item.category}</p>
            </div>
          </header>

          <dl className="mt-4 space-y-2">
            {Array.isArray(item.tags) && item.tags.length > 0 && (
              <DetailRow label="Tags">
                <ul className="flex flex-wrap gap-2" aria-label="tags">
                  {item.tags.map((t, idx) => (
                    <li key={idx} className="px-2 py-1 rounded-full bg-slate-900/5 text-slate-700 text-xs border border-slate-200">{t}</li>
                  ))}
                </ul>
              </DetailRow>
            )}
            {item.category && (
              <DetailRow label="Category">{item.category}</DetailRow>
            )}
          </dl>
        </div>
      </div>
    </article>
  )
}

export default function MenuAll() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
    fetch(`${API_BASE}/api/menu?limit=500`)
      .then(async (r) => {
        if (!r.ok) throw new Error(`Request failed: ${r.status}`)
        return r.json()
      })
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="menu" className="py-10 sm:py-14 bg-slate-950" aria-labelledby="menu-heading">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-6">
          <h2 id="menu-heading" className="text-xl sm:text-2xl font-semibold text-white">All menu items</h2>
          <p className="text-blue-200 mt-2">A complete list with images and details. No search required.</p>
        </header>

        {loading && <p className="text-blue-200">Loading…</p>}
        {error && <p role="alert" className="text-red-300">{error}</p>}

        {!loading && !error && (
          <>
            <p className="text-blue-200 mb-4">{items.length} item{items.length === 1 ? '' : 's'}</p>
            <div className="space-y-6">
              {items.map((item) => (
                <MenuItemDetail key={item._id || item.id} item={item} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
