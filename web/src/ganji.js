// 천간·지지·오행 데이터와 연주(年柱) 계산
export const STEMS = [
  { han: '甲', ko: '갑', el: 'wood' }, { han: '乙', ko: '을', el: 'wood' },
  { han: '丙', ko: '병', el: 'fire' }, { han: '丁', ko: '정', el: 'fire' },
  { han: '戊', ko: '무', el: 'earth' }, { han: '己', ko: '기', el: 'earth' },
  { han: '庚', ko: '경', el: 'metal' }, { han: '辛', ko: '신', el: 'metal' },
  { han: '壬', ko: '임', el: 'water' }, { han: '癸', ko: '계', el: 'water' },
]

export const BRANCHES = [
  { han: '子', ko: '자', animal: '쥐' }, { han: '丑', ko: '축', animal: '소' },
  { han: '寅', ko: '인', animal: '호랑이' }, { han: '卯', ko: '묘', animal: '토끼' },
  { han: '辰', ko: '진', animal: '용' }, { han: '巳', ko: '사', animal: '뱀' },
  { han: '午', ko: '오', animal: '말' }, { han: '未', ko: '미', animal: '양' },
  { han: '申', ko: '신', animal: '원숭이' }, { han: '酉', ko: '유', animal: '닭' },
  { han: '戌', ko: '술', animal: '개' }, { han: '亥', ko: '해', animal: '돼지' },
]

export const ELEMENTS = {
  wood:  { han: '木', ko: '목', color: '#3E7D4F', tint: '푸른', season: '봄', direction: '동쪽', trait: '뻗어 나가고 자라는 기운' },
  fire:  { han: '火', ko: '화', color: '#C8372D', tint: '붉은', season: '여름', direction: '남쪽', trait: '드러나고 퍼지는 기운' },
  earth: { han: '土', ko: '토', color: '#D9A441', tint: '누런', season: '환절기', direction: '중앙', trait: '받쳐 주고 모으는 기운' },
  metal: { han: '金', ko: '금', color: '#F2F3EE', tint: '흰', season: '가을', direction: '서쪽', trait: '맺고 단단해지는 기운' },
  water: { han: '水', ko: '수', color: '#141F42', tint: '검은', season: '겨울', direction: '북쪽', trait: '스며들고 저장하는 기운' },
}

export const ELEMENT_ORDER = ['wood', 'fire', 'earth', 'metal', 'water']

const mod = (n, m) => ((n % m) + m) % m

// 60갑자 순서 (甲子 → 癸亥)
export const CYCLE = Array.from({ length: 60 }, (_, i) => ({
  stem: STEMS[i % 10],
  branch: BRANCHES[i % 12],
}))

// 양력 연도 기준 연주. 실제 사주는 입춘(2월 4일 전후)을 해의 경계로 봅니다.
export function yearPillar(year) {
  const index = mod(year - 4, 60)
  const { stem, branch } = CYCLE[index]
  const element = ELEMENTS[stem.el]
  return {
    index,
    stem,
    branch,
    element,
    name: `${stem.ko}${branch.ko}년`,
    hanja: `${stem.han}${branch.han}`,
    nickname: `${element.tint} ${branch.animal}`,
  }
}
