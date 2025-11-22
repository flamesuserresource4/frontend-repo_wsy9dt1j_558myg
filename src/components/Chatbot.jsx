import { useEffect, useMemo, useRef, useState } from 'react'
import { Send, Loader2 } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

function Message({ m }){
  return (
    <div className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${m.role==='user' ? 'bg-blue-600 text-white self-end' : 'bg-white/10 text-white self-start'}`}>
      <p className="whitespace-pre-wrap">{m.text}</p>
    </div>
  )
}

function Chatbot(){
  const [messages, setMessages] = useState([{ role: 'assistant', text: 'Hi! How can I help you today? I can answer in many languages.' }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scroller = useRef(null)

  useEffect(()=>{
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const sessionId = useMemo(()=>{
    const id = localStorage.getItem('d2-session')
    if (id) return id
    const n = crypto.randomUUID()
    localStorage.setItem('d2-session', n)
    return n
  }, [])

  async function onSend(e){
    e.preventDefault()
    if (!input.trim()) return
    const userMsg = { role: 'user', text: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)
    try {
      await fetch(`${API_BASE}/api/chat`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ session_id: sessionId, message: userMsg.text }) })
      // Simple local echo for demo; can be replaced with real LLM API.
      const reply = { role: 'assistant', text: "Thanks! We'll get back to you. For now, try the search above to find what you need." }
      setMessages(prev => [...prev, reply])
    } catch (e){
      setMessages(prev => [...prev, { role: 'assistant', text: 'Sorry, something went wrong.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="chat" className="py-10 sm:py-14 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-white">AI help</h2>
        <p className="text-blue-200 mt-2">24/7 assistant with multi-language support.</p>

        <div className="mt-6 rounded-xl border border-white/10 bg-white/5">
          <div ref={scroller} className="h-72 overflow-y-auto p-4 flex flex-col gap-2" aria-live="polite" aria-busy={loading}>
            {messages.map((m, idx) => <Message key={idx} m={m} />)}
          </div>
          <form onSubmit={onSend} className="flex items-center gap-2 p-3 border-t border-white/10">
            <label htmlFor="chat-input" className="sr-only">Type your message</label>
            <input id="chat-input" value={input} onChange={e=>setInput(e.target.value)} placeholder="Type your message" className="flex-1 px-3 py-2 rounded-md bg-white/10 border border-white/10 text-white placeholder:text-blue-200/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400" />
            <button type="submit" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Chatbot