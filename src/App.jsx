import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TaskNav from './components/TaskNav'
import MenuAll from './components/MenuAll'
import Chatbot from './components/Chatbot'
import Footer from './components/Footer'
import SearchDialog from './components/SearchDialog'

function App() {
  const [openSearch, setOpenSearch] = useState(false)
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar onOpenSearch={() => setOpenSearch(true)} />
      <main>
        <Hero />
        <TaskNav />
        <MenuAll />
        <Chatbot />
      </main>
      <Footer />
      <SearchDialog open={openSearch} onClose={() => setOpenSearch(false)} />
    </div>
  )
}

export default App