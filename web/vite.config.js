import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// 빌드 결과를 저장소 루트로 출력합니다. (GitHub Pages가 루트를 서빙)
// terms.html, privacy.html, TikTok 인증 파일 등 기존 파일은 지우지 않습니다.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: '..',
    emptyOutDir: false,
  },
})
