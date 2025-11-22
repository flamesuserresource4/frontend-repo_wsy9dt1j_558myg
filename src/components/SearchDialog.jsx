import { useEffect, useRef, useState } from 'react'
import { Search, Loader2 } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function SearchDialog({ open, onClose }){
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const inputRef = useRef(null)

  useEffect(()=>{ if (open) setTimeout(()=> inputRef.current?.focus(), 50) }, [open])

  useEffect(()=>{
    if (!open) return
    const ctrl = new AbortController()
    async function run(){
      setLoading(true)
      try {
        const res = await fetch(`${API_BASE}/api/menu?q=${encodeURIComponent(q)}&limit=10`, { signal: ctrl.signal })
        const data = await res.json()
        setResults(Array.isArray(data) ? data : [])
      } catch (e) {
        // ignore
      } finally {
        setLoading(false)
      }
    }
    const t = setTimeout(run, 200)
    return ()=>{ clearTimeout(t); ctrl.abort() }
  }, [q, open])

  if (!open) return null
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/60">
      <div className="w-full max-w-xl rounded-xl bg-slate-900 border border-white/10">
        <div className="p-3 border-b border-white/10 flex items-center gap-2">
          <Search className="w-4 h-4 text-blue-200" />
          <input ref={inputRef} value={q} onChange={e=>setQ(e.target.value)} placeholder="Search tasks, menu, help…" className="flex-1 bg-transparent outline-none text-white placeholder:text-blue-200/60" aria-label="Search" />
          {loading && <Loader2 className="w-4 h-4 animate-spin text-blue-200" />}
        </div>
        <ul role="listbox" className="max-h-80 overflow-y-auto divide-y divide-white/5">
          {results.map(r => (
            <li key={r.id || r._id} className="p-3 hover:bg-white/5">
              <a href="#menu" className="block">
                <div className="flex items-center gap-3">
                  <img src={r.image_url} alt="" className="w-12 h-12 rounded object-cover" />
                  <div>
                    <p className="text-white font-medium">{r.name}</p>
                    <p className="text-blue-200 text-sm">{r.category} • ${r.price?.toFixed?.(2)}</p>
                  </div>
                </div>
              </a>
            </li>
          ))}
          {!loading && results.length === 0 && (
            <li className="p-3 text-blue-200">No results.</li>
          )}
        </ul>
        <div className="p-3 text-right">
          <button onClick={onClose} className="px-3 py-2 rounded-md bg-white/10 text-white hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">Close</button>
        </div>
      </div>
    </div>
  )
}
