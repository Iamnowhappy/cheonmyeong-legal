import { useId, useState } from 'react'
import { yearPillar } from '../ganji.js'
import CycleRing from './CycleRing.jsx'
import { SAJU_URL } from '../channels.js'

const MIN = 1900
const MAX = 2100

// 어두운 배경에서 보이도록 수(水) 기운만 밝은 색으로 바꿉니다.
export const accentOnDark = (el) => (el.ko === '수' ? '#8FA6D9' : el.color)

export default function Hero({ year, onYearChange }) {
  const inputId = useId()
  const [draft, setDraft] = useState(String(year))
  const [error, setError] = useState('')
  const p = yearPillar(year)
  const accent = accentOnDark(p.element)

  const commit = (value) => {
    setDraft(value)
    if (!/^\d{4}$/.test(value)) {
      setError(value.length >= 4 ? `${MIN}년부터 ${MAX}년 사이의 연도를 네 자리로 입력하세요.` : '')
      return
    }
    const n = Number(value)
    if (n < MIN || n > MAX) {
      setError(`${MIN}년부터 ${MAX}년 사이의 연도를 입력하세요.`)
      return
    }
    setError('')
    onYearChange(n)
  }

  const step = (d) => commit(String(Math.min(MAX, Math.max(MIN, year + d))))

  return (
    <section id="top" className="relative overflow-hidden bg-indigo-ink text-paper">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-28 pb-20 sm:px-6 lg:min-h-svh lg:grid-cols-[1fr_1.05fr] lg:gap-8 lg:pt-24 lg:pb-16">
        <div className="max-w-xl">
          <h1 className="font-display text-[clamp(2.6rem,7vw,4.6rem)] leading-[1.15]">
            태어난 해에도<br />이름이 있습니다
          </h1>
          <p className="mt-6 max-w-md text-[17px] leading-[1.8] text-paper/75">
            천명연구소는 사주와 명리학의 개념을 1분짜리 영상으로 풀어 냅니다.
            먼저 내가 태어난 해의 간지부터 확인해 보세요.
          </p>

          <form className="mt-10" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor={inputId} className="block text-sm text-paper/70">태어난 해 (양력)</label>
            <div className="mt-2 flex items-stretch gap-2">
              <button type="button" onClick={() => step(-1)} aria-label="한 해 이전"
                className="w-12 rounded-md border border-paper/25 text-xl hover:border-paper/60">−</button>
              <input
                id={inputId}
                inputMode="numeric"
                autoComplete="bday-year"
                maxLength={4}
                value={draft}
                onChange={(e) => commit(e.target.value.replace(/\D/g, ''))}
                aria-invalid={Boolean(error)}
                aria-describedby={`${inputId}-msg`}
                className="w-36 rounded-md border border-paper/25 bg-indigo-deep/60 px-4 py-3 text-center font-display text-3xl tracking-widest text-paper outline-none focus:border-ochre"
              />
              <button type="button" onClick={() => step(1)} aria-label="한 해 다음"
                className="w-12 rounded-md border border-paper/25 text-xl hover:border-paper/60">+</button>
            </div>
            <p id={`${inputId}-msg`} className={`mt-2 min-h-5 text-sm ${error ? 'text-ochre' : 'text-paper/50'}`} aria-live="polite">
              {error || '사주에서는 입춘(2월 4일 무렵)이 지나야 새해로 봅니다.'}
            </p>
          </form>

          <div className="mt-6 border-l-2 pl-5" style={{ borderColor: accent }} aria-live="polite">
            <p className="font-display text-[1.55rem] leading-snug sm:text-3xl">
              {year}년은 {p.name}, <span style={{ color: accent }}>{p.nickname}</span>의 해
            </p>
            <p className="mt-2 leading-relaxed text-paper/75">
              천간 {p.stem.han}({p.stem.ko})은 {p.element.ko}({p.element.han}) 기운, 지지 {p.branch.han}({p.branch.ko})는 {p.branch.animal}띠입니다.
            </p>
          </div>

          <a href={SAJU_URL} target="_blank" rel="noopener"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-ochre px-6 py-3.5 font-display text-lg text-indigo-ink transition-opacity hover:opacity-90">
            생년월일로 내 사주 무료로 보기 <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="mx-auto w-full max-w-[min(100%,560px)] px-2 sm:px-6 lg:px-0">
          <CycleRing index={p.index} accent={accent} />
        </div>
      </div>
    </section>
  )
}
