import { Menu, Search } from 'lucide-react'

function Navbar({ onOpenSearch }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/70 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 border-b border-white/10" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-md px-1" aria-label="District 2nd home">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-orange-400" aria-hidden="true" />
          <span className="text-white font-semibold">District 2nd</span>
        </a>
        <div className="flex items-center gap-2">
          <button onClick={onOpenSearch} className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-white/90 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
            <Search className="w-4 h-4" aria-hidden="true"/>
            <span className="hidden sm:inline">Search</span>
          </button>
          <button className="sm:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-white/90 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400" aria-label="Open menu">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar