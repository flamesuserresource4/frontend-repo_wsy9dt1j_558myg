import { ChevronRight, Coffee, Utensils, Info, MessageCircle } from 'lucide-react'

const tasks = [
  { title: 'Order a coffee', desc: 'Pick your drink and pay fast.', icon: Coffee, href: '#menu' },
  { title: 'Find a pastry', desc: 'Fresh daily options.', icon: Utensils, href: '#menu' },
  { title: 'Ask for help', desc: 'Chat with our AI assistant.', icon: MessageCircle, href: '#chat' },
  { title: 'About District 2nd', desc: 'Hours, location, contact.', icon: Info, href: '#about' },
]

function TaskNav() {
  return (
    <section id="tasks" className="py-10 sm:py-14 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-white">Do a task</h2>
        <p className="text-blue-200 mt-2">Quick links to common actions.</p>
        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" role="list">
          {tasks.map((t) => (
            <li key={t.title} className="group">
              <a href={t.href} className="block rounded-xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
                <div className="flex items-start gap-3">
                  <t.icon className="w-6 h-6 text-blue-300" aria-hidden="true"/>
                  <div>
                    <h3 className="text-white font-medium">{t.title}</h3>
                    <p className="text-blue-200 text-sm">{t.desc}</p>
                  </div>
                </div>
                <div className="mt-3 inline-flex items-center text-blue-200 text-sm">
                  Go <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default TaskNav