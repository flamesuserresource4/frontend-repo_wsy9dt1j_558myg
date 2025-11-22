function Footer(){
  return (
    <footer id="about" className="bg-slate-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
          <div>
            <h3 className="text-white font-semibold">District 2nd</h3>
            <p className="text-blue-200 mt-2 text-sm">Public service and cafe hub. Minimal, fast, and accessible for everyone.</p>
          </div>
          <div>
            <h4 className="text-white font-medium">Hours</h4>
            <p className="text-blue-200 text-sm mt-2">Mon–Fri: 7:00–19:00<br/>Sat–Sun: 8:00–18:00</p>
          </div>
          <div>
            <h4 className="text-white font-medium">Contact</h4>
            <p className="text-blue-200 text-sm mt-2">123 Main St, District 2<br/>Phone: (000) 000-0000</p>
          </div>
        </div>
        <p className="text-blue-300/70 text-xs mt-6">Built to meet WCAG 2.2 AA: high contrast, keyboard focus, clear language, and responsive layout.</p>
      </div>
    </footer>
  )
}

export default Footer