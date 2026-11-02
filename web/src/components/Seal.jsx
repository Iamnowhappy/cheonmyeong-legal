// 천명연구소 로고 마크 — 기존 채널 프로필(남보라 배경 · 금색 원 · 금색 命)과 같은 모양
export default function Seal({ className = '' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 64" className={`shrink-0 ${className}`}>
      <defs>
        <linearGradient id="seal-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#141833" />
          <stop offset="1" stopColor="#3A1D4A" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="32" fill="url(#seal-bg)" />
      <circle cx="32" cy="32" r="27" fill="none" stroke="#DEB96E" strokeWidth="1.6" />
      <text x="32" y="43" textAnchor="middle" fontSize="30" fontWeight="700" fill="#DEB96E"
        fontFamily="'Noto Sans KR','Malgun Gothic',sans-serif">命</text>
    </svg>
  )
}
