import { CHANNELS } from '../channels.js'

export default function Channels() {
  return (
    <section id="channels" className="bg-indigo-deep py-24 text-paper sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-[clamp(2rem,5vw,3.2rem)] leading-[1.2]">
          보기 편한 곳에서 만나세요
        </h2>
        <p className="mt-5 max-w-[52ch] text-[17px] leading-[1.85] text-paper/70">
          같은 이야기를 플랫폼에 맞는 길이와 형식으로 올립니다.
        </p>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-lg bg-paper/15 sm:grid-cols-2">
          {CHANNELS.map((c) => {
            const inner = (
              <>
                <span className="font-display text-3xl sm:text-4xl">{c.name}</span>
                <span className="mt-3 block text-paper/70">{c.format}</span>
                <span className={`mt-8 inline-block text-sm ${c.url ? 'text-ochre underline underline-offset-4' : 'text-paper/45'}`}>
                  {c.url ? `${c.name}에서 보기` : '채널 주소를 곧 안내합니다'}
                </span>
              </>
            )
            return (
              <li key={c.name} className="bg-indigo-deep">
                {c.url ? (
                  <a href={c.url} target="_blank" rel="noopener noreferrer"
                    className="block h-full p-7 transition-colors hover:bg-indigo-ink sm:p-10">
                    {inner}
                  </a>
                ) : (
                  <div className="h-full p-7 sm:p-10">{inner}</div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
