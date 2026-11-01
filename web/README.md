# 천명연구소 홈페이지

React + Tailwind CSS(v4) + Vite로 만든 소스입니다. 빌드 결과는 저장소 루트(`../index.html`, `../assets/`)에 출력되어 GitHub Pages에서 그대로 서빙됩니다. `terms.html`, `privacy.html`, TikTok 인증 파일 등 기존 파일은 건드리지 않습니다.

```bash
cd web
npm install
npm run dev     # 개발 서버
npm run build   # 루트에 index.html, assets/ 생성 (기존 assets/는 지운 뒤 다시 생성)
```

- 채널 주소: `src/channels.js`의 `url`을 채우면 카드가 링크로 바뀝니다.
- 연주 계산: `src/ganji.js` (양력 연도 기준, 입춘 경계는 안내 문구로만 표시)
