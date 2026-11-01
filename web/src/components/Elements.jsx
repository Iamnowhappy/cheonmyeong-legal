import { ELEMENTS, ELEMENT_ORDER } from '../ganji.js'

const DARK_TEXT = new Set(['earth', 'metal'])

export default function Elements({ highlight }) {
  return (
    <section id="elements" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-end">
          <h2 className="font-display text-[clamp(2rem,5vw,3.2rem)] leading-[1.2] text-indigo-ink">
            다섯 가지 기운으로<br />읽습니다
          </h2>
          <p className="max-w-[60ch] text-[17px] leading-[1.85] text-ink/75">
            명리학은 사람이 태어난 때를 목·화·토·금·수의 균형으로 봅니다.
            나무가 불을 키우고, 불이 흙을 만들고, 흙에서 쇠가 나고, 쇠에 물이 맺히고,
            물이 다시 나무를 기르는 흐름을 상생이라고 부릅니다.
          </p>
        </div>

        <ol className="mt-14 grid overflow-hidden rounded-lg border border-ink/15 md:grid-cols-5">
          {ELEMENT_ORDER.map((key) => {
            const el = ELEMENTS[key]
            const mine = key === highlight
            const dark = DARK_TEXT.has(key)
            return (
              <li
                key={key}
                className={`relative flex min-h-0 flex-row items-center gap-5 px-5 py-6 md:min-h-[360px] md:flex-col md:items-start md:justify-between md:px-6 md:py-8 ${
                  dark ? 'text-ink' : 'text-paper'
                } ${key === 'metal' ? 'md:border-x border-ink/10' : ''}`}
                style={{ background: el.color }}
              >
                <span className="font-display text-6xl leading-none md:text-8xl" aria-hidden="true">{el.han}</span>
                <div className="flex-1 md:flex-none">
                  <h3 className="font-display text-2xl">
                    {el.ko}
                    {mine && (
                      <span className={`ml-2 inline-block rounded-full px-2 py-0.5 align-middle font-sans text-xs ${
                        dark ? 'bg-ink text-paper' : 'bg-paper text-ink'
                      }`}>
                        입력한 해의 기운
                      </span>
                    )}
                  </h3>
                  <p className="mt-1 text-[15px] opacity-80">{el.season}, {el.direction}</p>
                  <p className="mt-3 text-[15px] leading-relaxed">{el.trait}</p>
                </div>
                {mine && <span className="pointer-events-none absolute inset-2 rounded border-2 border-dashed border-current opacity-50" aria-hidden="true" />}
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
