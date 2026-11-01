import { useEffect, useRef } from 'react'
import { CYCLE } from '../ganji.js'

const SIZE = 600
const C = SIZE / 2

// 60갑자 원형 다이얼. 선택한 해가 맨 위로 오도록 돌고, 스크롤하면 천천히 회전합니다.
export default function CycleRing({ index, accent }) {
  const scrollRef = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduce.matches) return
    let frame = 0
    const update = () => {
      frame = 0
      if (scrollRef.current) {
        scrollRef.current.style.transform = `rotate(${window.scrollY * 0.06}deg)`
      }
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  const current = CYCLE[index]

  return (
    <figure className="ring-in relative mx-auto aspect-square w-full max-w-[560px]" aria-label="60갑자 순환표">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full w-full overflow-visible" role="img"
        aria-label={`60갑자 중 ${index + 1}번째, ${current.stem.ko}${current.branch.ko}`}>
        {/* 상단 표시선 */}
        <path d={`M${C} 6 L${C - 7} -6 L${C + 7} -6 Z`} fill={accent} />

        <g ref={scrollRef} style={{ transformOrigin: `${C}px ${C}px`, transformBox: 'view-box' }}>
          <g
            className="motion-safe:transition-transform motion-safe:duration-[1200ms] motion-safe:ease-[cubic-bezier(.2,.7,.2,1)]"
            style={{ transform: `rotate(${-index * 6}deg)`, transformOrigin: `${C}px ${C}px`, transformBox: 'view-box' }}
          >
            <circle cx={C} cy={C} r={C - 4} fill="none" stroke="currentColor" strokeOpacity=".25" />
            <circle cx={C} cy={C} r={C - 96} fill="none" stroke="currentColor" strokeOpacity=".25" />
            {CYCLE.map((p, i) => {
              const active = i === index
              return (
                <g key={i} transform={`rotate(${i * 6} ${C} ${C})`}>
                  <line x1={C} y1={96} x2={C} y2={i % 10 === 0 ? 110 : 103}
                    stroke="currentColor" strokeOpacity={i % 10 === 0 ? 0.7 : 0.3} />
                  <text x={C} y={34} textAnchor="middle" fontSize="19"
                    className="font-display" fill={active ? accent : 'currentColor'} fillOpacity={active ? 1 : 0.7}>
                    {p.stem.han}
                  </text>
                  <text x={C} y={58} textAnchor="middle" fontSize="19"
                    className="font-display" fill={active ? accent : 'currentColor'} fillOpacity={active ? 1 : 0.7}>
                    {p.branch.han}
                  </text>
                </g>
              )
            })}
          </g>
        </g>

        <text x={C} y={C + 30} textAnchor="middle" fontSize="120" className="font-display" fill="currentColor">
          {current.stem.han}{current.branch.han}
        </text>
        <text x={C} y={C + 80} textAnchor="middle" fontSize="20" fill="currentColor" fillOpacity=".6">
          60갑자 중 {index + 1}번째
        </text>
      </svg>
    </figure>
  )
}
