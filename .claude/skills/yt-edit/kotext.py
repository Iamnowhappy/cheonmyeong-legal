"""kotext.py - Korean helpers shared by the yt-* tools (added for 천명연구소).

The original tools only read English: their word regexes are [a-z], so Korean captions, titles and
hooks came out as empty word lists. These helpers let every tool read Korean without changing what
it does for English text.
"""
import re

HANGUL = "가-힣"
TOKEN = re.compile(r"[a-z0-9'%$.]+|[가-힣]+")

# Trailing particles, longest first. Stripping one lets "사주는" and "사주를" count as the same word.
PARTICLES = sorted("""에서는 으로는 에게서 이라는 이라고 이에요 입니다 에서 에게 으로 까지 부터 처럼 보다
이나 라는 라고 이란 에는 은 는 이 가 을 를 에 의 도 로 와 과 만 요 랑""".split(), key=len, reverse=True)

# Korean words too common to say anything about a topic (chapters) or a pairing (title + thumbnail).
STOP_KO = set("""그리고 그래서 그런데 그러면 하지만 그냥 이제 진짜 정말 너무 아주 이거 저거 그거 이것 저것 그것
여기 거기 저기 우리 저희 제가 내가 여러분 오늘 지금 이번 하나 있는 없는 있습니다 없습니다 합니다 했습니다
하는 해서 하고 되는 됩니다 이런 저런 그런 어떤 같은 같이 때문 그러니까 근데 뭐 좀 약간 다시 영상 채널""".split())

def stem(w):
    for p in PARTICLES:
        if w.endswith(p) and len(w) - len(p) >= 2:
            return w[: -len(p)]
    return w

def tokens(t):
    """Words in t, English lower-cased, Korean with one trailing particle removed."""
    return [stem(w) if re.match(f"[{HANGUL}]", w) else w for w in TOKEN.findall(t.lower())]

def is_korean(t):
    h = len(re.findall(f"[{HANGUL}]", t))
    a = len(re.findall(r"[A-Za-z]", t))
    return h > 0 and h >= a

def width(t):
    """Display width in em, roughly: Hangul and CJK are a full em, everything else about 0.55.

    YouTube truncates titles by pixels, not characters. 60 Latin characters is about 33 em and 40 is
    about 22 em, so a Korean title hits the same cut at about 33 and 22 syllables.
    """
    return sum(1.0 if ("ᄀ" <= c <= "ᇿ" or "　" <= c <= "鿿" or "가" <= c <= "힣"
                      or "＀" <= c <= "￯") else 0.55 for c in t)

def cut_to_width(t, em):
    out, w = "", 0.0
    for c in t:
        w += width(c)
        if w > em: break
        out += c
    return out
