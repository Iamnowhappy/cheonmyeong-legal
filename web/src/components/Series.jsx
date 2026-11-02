import { SAJU_URL } from '../channels.js'

// 카드뉴스는 사주앱에 올라가 있는 스레드 카드(1080×1350)를 그대로 씁니다.
const APP = 'https://saju-app-4c38.vercel.app/threads/'
const cards = (post, n, ext = 'jpg') => Array.from({ length: n }, (_, i) => `${APP}${post}/${i + 1}.${ext}`)

const SERIES = [
  {
    title: '오늘의 일진',
    hanja: '日辰',
    body: '그날의 간지가 어떤 기운인지, 하루를 보낼 때 무엇을 염두에 두면 좋을지 짧게 정리합니다.',
    cards: [...cards('w49', 5, 'png'), ...cards('w75', 5)],
    more: { href: `${SAJU_URL}&p=il`, label: '내 오늘의 운세 무료로 보기' },
  },
  {
    title: '띠별 이야기',
    hanja: '十二支',
    body: '열두 띠가 가진 성질과 서로 잘 맞는 띠, 부딪히는 띠를 예시와 함께 설명합니다.',
    cards: Array.from({ length: 6 }, (_, i) => `./cards/tti/0${i + 1}.png`),
    more: { href: 'https://www.instagram.com/cheonmyeong_lab/', label: '인스타그램에서 더 보기' },
  },
  {
    title: '1분 명리 사전',
    hanja: '用語',
    body: '용신, 대운, 십신처럼 어렵게 들리는 용어를 일상의 말로 바꿔 한 편에 하나씩 풀어 봅니다.',
    cards: [...cards('w68', 5), ...cards('w69', 5), ...cards('w70', 5)],
    more: { href: 'https://www.threads.com/@cheonmyeong_lab', label: '스레드에서 더 보기' },
  },
  {
    title: '궁합 읽는 법',
    hanja: '宮合',
    body: '두 사람의 오행이 어떻게 보완되고 충돌하는지, 궁합표를 보는 기본 순서를 알려 드립니다.',
    cards: [...cards('w61', 6), ...cards('w63', 6)],
    more: { href: `${SAJU_URL}&p=gh`, label: '내 사주부터 무료로 보기' },
  },
]

export default function Series() {
  return (
    <section id="series" className="border-t border-ink/10 bg-paper-dim py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-[clamp(2rem,5vw,3.2rem)] leading-[1.2] text-indigo-ink">
          1분이면 충분한 이야기들
        </h2>
        <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.85] text-ink/75">
          점을 쳐 드리기보다, 사주를 스스로 읽을 수 있도록 개념을 하나씩 쌓아 갑니다.
        </p>

        <dl className="mt-14 divide-y divide-ink/15 border-y border-ink/15">
          {SERIES.map((s) => (
            <div key={s.title} className="grid gap-3 py-8 md:grid-cols-[1fr_1.4fr] md:gap-10 md:py-10">
              <dt className="flex items-baseline gap-4">
                <span className="font-display text-[clamp(1.6rem,3.5vw,2.25rem)] text-indigo-ink">{s.title}</span>
                <span className="font-display text-lg text-seal" aria-hidden="true">{s.hanja}</span>
              </dt>
              <dd className="max-w-[56ch] text-[17px] leading-[1.85] text-ink/80">{s.body}</dd>
              <div className="min-w-0 md:col-span-2">
                <ul className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-3 sm:mx-0 sm:px-0" aria-label={`${s.title} 카드뉴스`}>
                  {s.cards.map((src, i) => (
                    <li key={src} className="w-40 shrink-0 snap-start sm:w-48">
                      <img src={src} alt={`${s.title} 카드 ${i + 1}`} loading="lazy" width="1080" height="1350"
                        className="aspect-[4/5] w-full rounded-md border border-ink/10 object-cover" />
                    </li>
                  ))}
                </ul>
                <a href={s.more.href} target="_blank" rel="noopener"
                  className="mt-3 inline-block text-[15px] text-seal underline underline-offset-4 hover:opacity-80">
                  {s.more.label} →
                </a>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
