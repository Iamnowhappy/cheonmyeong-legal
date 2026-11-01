// 낙관(도장) 형태의 로고 마크
export default function Seal({ className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex flex-col items-center justify-center bg-seal text-paper font-display leading-[1.05] rounded-[3px] ${className}`}
    >
      <span>天</span>
      <span>命</span>
    </span>
  )
}
