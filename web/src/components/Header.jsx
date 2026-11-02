import { useEffect, useState } from 'react'
import Seal from './Seal.jsx'

const LINKS = [
  { href: '#elements', label: '오행' },
  { href: '#series', label: '콘텐츠' },
  { href: '#channels', label: '채널' },
  { href: '#contact', label: '문의' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-paper transition-colors duration-300 ${
        solid || open ? 'bg-indigo-deep/95 backdrop-blur' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Seal className="h-9 w-9 text-[13px]" />
          <span className="font-display text-xl tracking-wide">천명연구소</span>
        </a>

        <nav className="hidden md:block" aria-label="주요 메뉴">
          <ul className="flex gap-8 text-[15px]">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a className="opacity-80 hover:opacity-100" href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="md:hidden -mr-2 p-2"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-6">
            <span className={`absolute left-0 h-px w-6 bg-current transition-transform duration-300 ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
            <span className={`absolute left-0 h-px w-6 bg-current transition-transform duration-300 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
          </span>
        </button>
      </div>

      <nav
        id="mobile-menu"
        aria-label="모바일 메뉴"
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${open ? 'max-h-80' : 'max-h-0'}`}
      >
        <ul className="px-4 pb-6">
          {LINKS.map((l) => (
            <li key={l.href} className="border-t border-paper/10">
              <a className="block py-4 font-display text-2xl" href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
