import { useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Elements from './components/Elements.jsx'
import Series from './components/Series.jsx'
import Channels from './components/Channels.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import { yearPillar } from './ganji.js'

export default function App() {
  const [year, setYear] = useState(() => new Date().getFullYear())
  const element = yearPillar(year).stem.el

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-paper focus:px-4 focus:py-2 focus:text-ink">
        본문으로 건너뛰기
      </a>
      <Header />
      <main id="main">
        <Hero year={year} onYearChange={setYear} />
        <Elements highlight={element} />
        <Series />
        <Channels />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
