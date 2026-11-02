export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-ink/60 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>© {new Date().getFullYear()} 천명연구소 (Cheonmyeong Institute)</p>
        <ul className="flex gap-6">
          <li><a className="hover:text-ink" href="terms.html">이용약관</a></li>
          <li><a className="hover:text-ink" href="privacy.html">개인정보처리방침</a></li>
        </ul>
      </div>
    </footer>
  )
}
