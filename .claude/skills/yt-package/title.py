#!/usr/bin/env python3
"""title.py - lint a YouTube title and thumbnail pairing before you publish it.

    python3 title.py --title "..." --thumb "AI RAN IT"
    python3 title.py titles.txt            # one per line, ranked
    python3 title.py --title "..." --json

The pairing is the unit, not the title. A title that repeats the thumbnail text wastes half the
click surface, and that is the single most common mistake this checks for.

Length: YouTube truncates around 60 characters on desktop search and around 40 on a mobile home
feed. Both limits are reported because they are different failures - a desktop truncation loses the
tail, a mobile one can lose the subject.
"""
import json, re, sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "yt-edit"))
from kotext import STOP_KO, tokens, width, cut_to_width  # noqa: E402

DESKTOP, MOBILE, HARD = 60, 40, 100
# The cut is in pixels. In em that is about 33 and 22, which is 60 and 40 Latin characters or about 33
# and 22 Korean syllables. Width is what gets checked; HARD stays a character count (YouTube's limit).
DESKTOP_EM, MOBILE_EM = DESKTOP * 0.55, MOBILE * 0.55
VAGUE_KO = ["대박","역대급","미친","충격","놀라운","엄청난","완벽","최고의","끝판왕","레전드","비밀","무조건",
            "모든 것","소름","경악","필수","꿀팁"]
VAGUE = {"amazing","incredible","insane","crazy","huge","massive","ultimate","best","powerful",
         "secret","revolutionary","mindblowing","epic","perfect","complete","everything"}
STOP = {"the","a","an","of","for","to","in","on","and","or","is","are","with","your","you","my","i",
        "this","that","it","how","what","why"}

def words(t):
    # English exactly as before; Korean words with a trailing particle removed (see kotext.py)
    return [w for w in tokens(t) if not re.search(r"[%$.]", w)] if re.search(r"[가-힣]", t) else re.findall(r"[a-z0-9']+", t.lower())

def check(title, thumb=None):
    t = title.strip()
    n = len(t)
    issues, good = [], []
    w = width(t)
    if n > HARD: issues.append(("length", f"{n} characters - YouTube's hard limit is {HARD}"))
    elif w > DESKTOP_EM and re.search(r"[가-힣]", t):
        issues.append(("length", f"{n} characters ({w:.0f} em) - desktop search cuts near {DESKTOP_EM:.0f} em (about {DESKTOP_EM:.0f} Korean syllables)"))
    elif w > DESKTOP_EM: issues.append(("length", f"{n} characters - desktop search cuts near {DESKTOP}"))
    elif re.search(r"[가-힣]", t): good.append(f"{n} characters ({w:.0f} em), inside the desktop cut")
    else: good.append(f"{n} characters, inside the {DESKTOP}-character desktop cut")
    if w > MOBILE_EM:
        head = cut_to_width(t, MOBILE_EM)
        head = head.rsplit(" ", 1)[0] if " " in head else head
        issues.append(("mobile", f'a mobile feed shows about "{head}..." - check the subject survives'))
    caps = [w for w in t.split() if len(w) > 2 and w.isupper()]
    if len(caps) > 2: issues.append(("shouting", f"{len(caps)} all-caps words - two is the ceiling before it reads as spam"))
    elif caps: good.append(f"{len(caps)} all-caps word for emphasis")
    v = [x for x in words(t) if x in VAGUE] + [x for x in VAGUE_KO if x in t]
    if v: issues.append(("vague", f"{', '.join(sorted(set(v)))} - swap for a number, a name or a date"))
    nums = re.findall(r"\d[\d,.]*%?", t)
    if nums: good.append(f"carries a concrete figure ({', '.join(nums[:3])})")
    else: issues.append(("no-number", "no number, date or name - the most reliable single fix"))
    if t.endswith("?"): good.append("open question in the title")
    front = [x for x in words(t)[:3] if x not in STOP and x not in STOP_KO]
    if not front: issues.append(("front-load", "the first three words are all filler - move the subject forward"))
    if thumb:
        tw, hw = set(words(t)) - STOP - STOP_KO, set(words(thumb)) - STOP - STOP_KO
        shared = tw & hw
        if shared:
            issues.append(("duplicate", f"thumbnail repeats the title on {', '.join(sorted(shared))} - "
                                        "the thumbnail should say what the title does not"))
        else:
            good.append("thumbnail and title carry different words")
        if len(words(thumb)) > 4:
            issues.append(("thumb-length", f"{len(words(thumb))} words on the thumbnail - three is the ceiling at feed size"))
    score = max(0, min(100, 100 - 14 * len(issues) + 4 * len(good)))
    return {"title": t, "chars": n, "score": score, "issues": issues, "good": good}

def show(r):
    print(f'\n  "{r["title"]}"')
    print(f"  {r['chars']} chars   score {r['score']}/100")
    for k, m in r["issues"]: print(f"    x  {k:<12} {m}")
    for m in r["good"]:      print(f"    ok              {m}")

def main():
    a = sys.argv[1:]
    as_json = "--json" in a; a = [x for x in a if x != "--json"]
    thumb = a[a.index("--thumb") + 1] if "--thumb" in a else None
    if "--title" in a:
        rows = [check(a[a.index("--title") + 1], thumb)]
    elif a and os.path.exists(a[0]):
        rows = [check(l, thumb) for l in open(a[0], encoding="utf-8").read().splitlines() if l.strip()]
    else:
        print(__doc__); sys.exit(1)
    rows.sort(key=lambda r: -r["score"])
    if as_json: print(json.dumps(rows, indent=1)); return
    for r in rows: show(r)
    print()

if __name__ == "__main__":
    main()
