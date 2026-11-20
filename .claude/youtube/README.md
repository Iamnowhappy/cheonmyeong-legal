# 유튜브 운영팀 스킬 11개 — 천명연구소용

원본: [Jakeschincariol/youtube-agent-skill](https://github.com/Jakeschincariol/youtube-agent-skill)
(MIT, 커밋 `a2feb21`). 라이선스는 `.claude/skills/LICENSE-youtube-agent-skill`에 있습니다.

이 저장소의 `.claude/skills/yt-*`에 들어 있어서, 이 저장소를 연 클로드 코드 세션(데스크톱 Code 탭 · 웹 · 클라우드)에서
바로 `/yt-script` 같은 명령을 쓸 수 있습니다. 새로 넣은 스킬은 **새 세션**에서 보입니다.

> **올리는 건 직접 합니다.** 11개 모두 초안과 분석만 만들고, 마지막에 "올릴까요, 고칠까요?(ship it, or change it?)"를 묻습니다.

## 원본에서 바꾼 것

| 바꾼 곳 | 내용 |
| --- | --- |
| 말투 파일 위치 | `~/.claude/youtube/voice.md` 대신 저장소 안 **`.claude/youtube/voice.md`**를 먼저 읽습니다(없으면 원래 위치). 클라우드 세션은 끝나면 홈 폴더가 지워지기 때문입니다. |
| 결과 언어 | 대본 · 제목 · 답장 · 설명을 한국어로 씁니다. |
| `yt-edit/kotext.py` (새 파일) | 한국어 낱말 나누기 · 조사 떼기 · 화면 너비 계산. 아래 도구들이 함께 씁니다. |
| `deadair.py` (편집) | 군말 "음 · 어 · 그 · 이제 · 뭐 · 약간 · 그러니까"를 잡고, 다시 찍은 문장을 한국어로도 찾습니다. |
| `chapters.py` (챕터) | 한국어 낱말로 주제가 바뀌는 곳을 찾습니다. |
| `title.py` (제목 · 썸네일) | 글자 수가 아니라 화면 너비로 잘림을 봅니다. 한글은 영어보다 넓어서 **데스크톱 약 33자 · 모바일 약 22자**에서 잘립니다. "대박 · 역대급 · 완벽" 같은 애매한 말, 제목과 썸네일의 같은 낱말도 잡습니다. |
| `hookscore.py` (훅 점수) | 숫자(3가지 · 2027년), 당신 · 여러분, 손해 · 놓치는, 왜 · 어떻게 · 아무도 같은 한국어 신호를 셉니다. 한국어 훅은 6~16어절이 적당합니다. |
| `hooks.json` | 훅 공식 21개마다 한국어 패턴(`match_ko`)을 붙였습니다. `swipe.py`(바이럴 분석)도 씁니다. |

영어 입력에 대한 결과는 원본과 같습니다(챕터 제목 순서만 매번 같게 고정).

## 11개 한눈에

| 역할 | 명령 | 넣을 것 |
| --- | --- | --- |
| 대본 | `/yt-script` | 아이디어 한 줄 |
| 제목 · 썸네일 | `/yt-package` | 제목 · 썸네일 문구 |
| 편집 | `/yt-edit` | 자막 파일(.srt) |
| 댓글 | `/yt-comment` | 댓글 복사 |
| 주간 계획 | `/yt-plan` | 한 주에 쓸 시간 |
| 바이럴 분석 | `/yt-viral` | 비슷한 채널 주소 3~5개 |
| 이탈 분석 | `/yt-retention` | 시청 지속 CSV |
| 쇼츠 | `/yt-shorts` | 자막 파일(.srt) |
| SEO | `/yt-seo` | 영상 내용 |
| 챕터 | `/yt-chapters` | 자막 파일(.srt) |
| 채널 진단 | `/yt-audit` | 채널 정보 |

## 처음 한 번 — 말투 파일

`.claude/youtube/voice.md`는 지금 **홈페이지 문구로 만든 초안**입니다. 영상 3개의 자막을 넣고 다시 쓰게 하세요.

```
작업 폴더에 내 영상 3개의 자막 파일을 넣었어.
이걸 읽고 내 말투로 .claude/youtube/voice.md를 다시 써 줘.
```

## 이렇게 시키세요 — { } 안만 바꾸기

```
/yt-script
아이디어: {2027년 정미년, 띠별로 무엇이 달라지는지}
보는 사람: {사주 용어가 어려운 30~40대}
꼭 들어갈 것: {입춘 기준 한 줄 · 마지막에 사주앱 무료 보기}
```

```
/yt-package
제목: {2027년 정미년, 붉은 양의 해에 조심할 띠 3가지}
썸네일 문구: {양띠 주의}
```

```
/yt-edit 영상1.srt
/yt-shorts 영상1.srt
/yt-chapters 영상1.srt
```

```
/yt-comment
아래 댓글들을 네 묶음으로 나누고 답장 초안을 써 줘. 고정할 댓글도 하나 골라 줘.
{댓글 붙여넣기}
```

```
/yt-plan
이번 주 쓸 수 있는 시간: {평일 저녁 1시간 · 토요일 3시간}
```

```
/yt-viral
내 분야: 사주 · 명리 숏폼
비슷한 채널: {채널 주소 3~5개}
평소 대비 2배 이상 나온 영상만 뽑고, 상위 5개의 제목 공식과 공통 구조를 정리해 줘.
```

```
/yt-retention 시청지속.csv
/yt-audit
```

## 도구만 직접 돌리기 (Python 3, 추가 설치 없음)

```bash
python3 .claude/skills/yt-script/hookscore.py --hook "2027년 정미년, 당신의 띠가 손해 보기 전에 꼭 알아야 할 3가지"
python3 .claude/skills/yt-package/title.py --title "2027년 정미년, 붉은 양의 해에 조심할 띠 3가지" --thumb "양띠 주의"
python3 .claude/skills/yt-edit/deadair.py 영상1.srt
python3 .claude/skills/yt-chapters/chapters.py 영상1.srt
python3 .claude/skills/yt-retention/retention.py 시청지속.csv --transcript 영상1.srt
python3 .claude/skills/yt-viral/swipe.py collected.json --min 2.0
```

## 꼭 아셔야 할 것

- **훅 점수는 참고용입니다.** 영어 숏폼 훅 74개로 맞춘 점수에 한국어 신호를 더한 것이라, 낮으면 다시 볼 이유일 뿐 높다고 조회수가 보장되지 않습니다.
- **바이럴 분석의 '공식'은 제목을 보고 판단한 것**이지, 왜 잘됐는지 증명하지 않습니다. 남의 영상은 구조만 참고하세요.
- **태그는 효과가 적습니다.** 제목 · 썸네일 · 첫 30초가 먼저입니다.
- 유튜브 천명연구소 채널은 2026-11-02에 삭제됐습니다. 대본 · 훅 · 편집 · 쇼츠 · 댓글 · 계획 스킬은 틱톡 · 릴스에도 그대로 쓸 수 있습니다. 이탈 분석 · SEO · 챕터는 유튜브용입니다.
