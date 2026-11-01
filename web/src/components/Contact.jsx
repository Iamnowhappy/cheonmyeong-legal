import { CONTACT_EMAIL } from '../channels.js'
import Seal from './Seal.jsx'

export default function Contact() {
  return (
    <section id="contact" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 md:grid-cols-[1.2fr_1fr] md:items-start">
        <div>
          <h2 className="font-display text-[clamp(2rem,5vw,3.2rem)] leading-[1.2] text-indigo-ink">
            다뤘으면 하는 주제가 있나요?
          </h2>
          <p className="mt-5 max-w-[50ch] text-[17px] leading-[1.85] text-ink/75">
            궁금한 용어, 영상으로 보고 싶은 주제, 협업 제안은 메일로 보내 주세요.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-8 inline-flex items-center gap-3 rounded-md bg-indigo-ink px-6 py-4 text-paper transition-colors hover:bg-indigo-deep"
          >
            메일 보내기
            <span className="text-paper/60">{CONTACT_EMAIL}</span>
          </a>
        </div>

        <aside className="flex gap-5 rounded-lg border border-ink/15 p-6 sm:p-8">
          <Seal className="h-12 w-12 shrink-0 text-base" />
          <p className="text-[15px] leading-[1.8] text-ink/70">
            천명연구소의 콘텐츠는 재미와 정보를 위해 만들어졌으며,
            의료·법률·재무 등 전문적인 상담을 대신하지 않습니다.
            중요한 결정은 전문가와 상의하세요.
          </p>
        </aside>
      </div>
    </section>
  )
}
