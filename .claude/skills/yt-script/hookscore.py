#!/usr/bin/env python3
"""hookscore.py - score a YouTube hook before you waste a take on it.

Five properties, 0-100 each, and a verdict that is 60% the mean and 40% the weakest one. The
weakest-link weighting is deliberate: a hook with four strong properties and one dead one is a hook
that leaks at the dead one, and averaging hides that.

    python3 hookscore.py hooks.txt            # one hook per line, ranked
    python3 hookscore.py --hook "one line"    # score a single hook
    python3 hookscore.py --json hooks.txt     # machine-readable

WHAT THIS CAN AND CANNOT TELL YOU. Measured against 74 real short-form hooks (first 15 seconds of
auto-captions, top-8 and bottom-8 by views across five channels): it separates deliberately bad
hooks from real ones well, and it separates a creator's own hits from their own misses barely at
all. Treat a low score as a reason to look again, never a high score as a promise.
"""
import json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
FORMULAS = json.load(open(os.path.join(HERE, "hooks.json"), encoding="utf-8"))["hooks"]
sys.path.insert(0, os.path.join(HERE, "..", "yt-edit"))
from kotext import is_korean, tokens  # noqa: E402

FILLER = {"basically","actually","literally","just","really","very","so","kind","sort","like",
          "guys","hey","welcome","today","video","subscribe","channel"}
VAGUE = {"amazing","incredible","insane","crazy","huge","massive","game","changer","secret",
         "powerful","ultimate","best","revolutionary","mind","blowing","unbelievable"}
CONCRETE = re.compile(r"\b(\d[\d,.]*\s?(%|k|m|x|s|m|h)?|\$\d|\d+\s?(second|minute|hour|day|week|month|year)s?)\b", re.I)
YOU = re.compile(r"\b(you|your|you're|youre|yourself)\b", re.I)
STAKE = re.compile(r"\b(lose|lost|wasting|waste|quit|fail|broke|cost|risk|before|stop|never|die|dying|dead)\b", re.I)
CURIOSITY = re.compile(r"\b(why|how|what|which|until|before|but|nobody|almost|except|reason|actually)\b", re.I)

# Korean. No \b here: Hangul counts as a word character, so "3가지" has no boundary after the 3, and
# particles attach to the word ("당신의", "손해를"), so these match inside words on purpose.
FILLER_KO = ["그냥","진짜","약간","이제","일단","뭐","안녕하세요","오늘은","여러분 안녕","구독","좋아요","영상"]
VAGUE_KO = ["대박","역대급","미친","충격","놀라운","엄청난","완벽","최고의","끝판왕","레전드","소름","무조건"]
CONCRETE_KO = re.compile(r"\d[\d,.]*\s?(%|초|분|시간|일|주|개월|달|년|살|세|가지|명|배|만|억|원|번|개|위|등)")
YOU_KO = re.compile(r"(당신|여러분|너는|너의|네가|니가|님[은이의도]|본인|내 사주|당신의|자기 사주)")
STAKE_KO = re.compile(r"(손해|잃|망하|망치|실패|놓치|후회|절대|하기 전|그만|조심|위험|낭비|틀리|틀렸|오해|모르면|"
                      r"늦기 전|큰일|피해야|안 좋|나쁜)")
CURIOSITY_KO = re.compile(r"(왜|어떻게|무엇|뭐가|뭘까|어떤|이유|사실은|사실|아무도|그런데|근데|하지만|알고 보면|"
                          r"숨은|숨겨진|진짜 의미|정체|까요\??$|나요\??$)")
HAS_KO = re.compile(r"[가-힣]")  # the Korean checks only run on text that has Korean in it
CLOSED_KO = re.compile(r"(때문에|그래서|즉,|라는 뜻)")

def words(t): return tokens(t)

def specificity(t):
    w = words(t)
    if not w: return 0
    nums = len(CONCRETE.findall(t))
    vague = sum(1 for x in w if x in VAGUE)
    filler = sum(1 for x in w if x in FILLER)
    if HAS_KO.search(t):
        nums += len(CONCRETE_KO.findall(t))
        vague += sum(1 for x in VAGUE_KO if x in t)
        filler += sum(1 for x in FILLER_KO if x in t)
    s = 34 + nums * 22 - vague * 16 - filler * 5
    # proper nouns that are not sentence-initial read as named things
    s += min(18, 6 * sum(1 for x in t.split()[1:] if x[:1].isupper()))
    # Korean has no capitals; named things are hanja terms, ganji and the twelve animals
    if HAS_KO.search(t): s += min(18, 6 * len(re.findall(r"(갑|을|병|정|무|기|경|신|임|계)(자|축|인|묘|진|사|오|미|신|유|술|해)년|"
                                     r"[쥐소범호랑이토끼용뱀말양원숭이닭개돼지]+띠|용신|대운|세운|십신|일주|오행|"
                                     r"[목화토금수]\s?기운|[一-鿿]", t)))
    return max(0, min(100, s))

def address(t):
    n = len(YOU.findall(t)) + (len(YOU_KO.findall(t)) if HAS_KO.search(t) else 0)
    head = " ".join(t.split()[:6 if not is_korean(t) else 4])
    first = 30 if (YOU.search(head) or YOU_KO.search(head)) else 0
    return max(0, min(100, 26 + n * 20 + first))

def stakes(t):
    ko = bool(HAS_KO.search(t))
    n = len(STAKE.findall(t)) + (len(STAKE_KO.findall(t)) if ko else 0)
    return max(0, min(100, 22 + n * 26 + (14 if (CONCRETE.search(t) or (ko and CONCRETE_KO.search(t))) else 0)))

def curiosity(t):
    ko = bool(HAS_KO.search(t))
    n = len(CURIOSITY.findall(t)) + (len(CURIOSITY_KO.findall(t)) if ko else 0)
    q = 18 if t.strip().endswith("?") else 0
    # a hook that resolves itself has no gap left
    closed = -18 if (re.search(r"\b(because|so that|which means)\b", t, re.I) or (ko and CLOSED_KO.search(t))) else 0
    return max(0, min(100, 24 + n * 17 + q + closed))

def brevity(t):
    n = len(words(t))
    if n == 0: return 0
    # 9-24 words is the band a spoken hook lands in at ~150wpm inside 10 seconds. Korean words carry
    # their particles and endings, so the same ten seconds is about 6-16 words (어절).
    lo, hi = (6, 16) if is_korean(t) else (9, 24)
    if lo <= n <= hi: return 100
    if n < lo: return max(30, 100 - (lo - n) * 11)
    return max(10, 100 - (n - hi) * 7)

PROPS = [("SPECIFICITY", specificity), ("ADDRESS", address), ("STAKES", stakes),
         ("CURIOSITY", curiosity), ("BREVITY", brevity)]

def classify(t):
    best, hits = None, 0
    for f in FORMULAS:
        pats = f["match"] + (f.get("match_ko", []) if HAS_KO.search(t) else [])
        n = sum(1 for p in pats if re.search(p, t, re.I))
        if n > hits: best, hits = f, n
    return (best["name"] if best else "Unclassified"), hits

def score(t):
    parts = {n: fn(t) for n, fn in PROPS}
    vals = list(parts.values())
    verdict = round(0.6 * (sum(vals) / len(vals)) + 0.4 * min(vals))
    name, hits = classify(t)
    return parts, verdict, name, hits

def band(v): return "STRONG" if v >= 72 else "WORKABLE" if v >= 55 else "WEAK"

def report(t, parts, verdict, name, hits):
    print(f"\n  {t.strip()}")
    print(f"  {'-' * min(72, max(20, len(t.strip())))}")
    for k, v in parts.items():
        print(f"    {k:<12} {v:3d}  {'#' * (v // 5)}")
    print(f"    {'VERDICT':<12} {verdict:3d}  {band(verdict)}")
    print(f"    formula      {name}" + (f"  ({hits} pattern{'s' if hits != 1 else ''} matched)" if hits else "  (no formula matched - that is usually a summary, not a hook)"))
    low = min(parts, key=parts.get)
    print(f"    weakest      {low} - {(FIX_KO if HAS_KO.search(t) else FIX)[low]}")

FIX = {
 "SPECIFICITY": "swap one adjective for a number, a name or a date",
 "ADDRESS": "say 'you' in the first six words",
 "STAKES": "name what it costs them to keep doing it the current way",
 "CURIOSITY": "cut the half of the sentence that answers itself",
 "BREVITY": "9 to 24 words. Read it out loud and stop where you run out of breath",
}

FIX_KO = {
 "SPECIFICITY": "꾸미는 말 하나를 숫자 · 이름 · 날짜(예: 2027년, 3가지, 정미년)로 바꾸세요",
 "ADDRESS": "첫 네 어절 안에 '당신' · '여러분' · '내 사주'처럼 보는 사람을 부르세요",
 "STAKES": "지금처럼 하면 무엇을 잃는지(손해 · 후회 · 놓치는 것)를 말하세요",
 "CURIOSITY": "스스로 답해 버리는 뒷부분을 자르세요 ('때문에' · '그래서' 이하)",
 "BREVITY": "6~16어절. 소리 내어 읽고 숨이 찰 때 끊으세요",
}

def main():
    a = sys.argv[1:]
    as_json = "--json" in a
    a = [x for x in a if x != "--json"]
    if "--hook" in a:
        lines = [a[a.index("--hook") + 1]]
    elif a and os.path.exists(a[0]):
        lines = [l for l in open(a[0], encoding="utf-8").read().splitlines() if l.strip()]
    else:
        print(__doc__); sys.exit(1 if not a else 0)
    out = []
    for t in lines:
        parts, verdict, name, hits = score(t)
        out.append({"hook": t.strip(), "properties": parts, "verdict": verdict,
                    "band": band(verdict), "formula": name, "matched": hits})
    out.sort(key=lambda r: -r["verdict"])
    if as_json:
        print(json.dumps([{k: v for k, v in r.items() if k != "matched"} for r in out], indent=1)); return
    for r in out:
        report(r["hook"], r["properties"], r["verdict"], r["formula"], r["matched"])
    if len(out) > 1:
        print(f"\n  winner: {out[0]['hook'].strip()}  ({out[0]['verdict']}, {out[0]['band']})\n")

if __name__ == "__main__":
    main()
