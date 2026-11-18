// 명이 캐릭터와 오행 색 — 인스타툰 시리즈 공통
const EL = {
  wood: {h:'木', k:'목', name:'나무', c:'#4E9A5B'},
  fire: {h:'火', k:'화', name:'불',   c:'#E0603F'},
  earth:{h:'土', k:'토', name:'흙',   c:'#B8862F'},
  metal:{h:'金', k:'금', name:'쇠',   c:'#8C96A3'},
  water:{h:'水', k:'수', name:'물',   c:'#3567A8'},
};

/* 명이: 크림색 고양이, 남색 목도리 + 금색 매듭 */
function cat({mood='normal', prop=null, wave=false, size=420}={}){
  const O='#5B4330', C='#F7E6C4', P='#F2B8B0', D='#3A2A1E';
  const eyes = {
    normal:`<ellipse cx="92" cy="105" rx="7.5" ry="9.5" fill="${D}"/><ellipse cx="148" cy="105" rx="7.5" ry="9.5" fill="${D}"/>
            <circle cx="94.5" cy="101.5" r="2.6" fill="#fff"/><circle cx="150.5" cy="101.5" r="2.6" fill="#fff"/>`,
    happy:`<path d="M82 109 Q92 95 102 109" fill="none" stroke="${D}" stroke-width="5" stroke-linecap="round"/>
           <path d="M138 109 Q148 95 158 109" fill="none" stroke="${D}" stroke-width="5" stroke-linecap="round"/>`,
    surprised:`<circle cx="92" cy="104" r="11" fill="#fff" stroke="${D}" stroke-width="3.5"/><circle cx="92" cy="105" r="5" fill="${D}"/>
               <circle cx="148" cy="104" r="11" fill="#fff" stroke="${D}" stroke-width="3.5"/><circle cx="148" cy="105" r="5" fill="${D}"/>`,
  };
  eyes.worry = eyes.normal + `<path d="M80 91 L101 84" stroke="${D}" stroke-width="4.5" stroke-linecap="round"/>
                              <path d="M160 91 L139 84" stroke="${D}" stroke-width="4.5" stroke-linecap="round"/>`;
  const mouth = {
    normal:`<path d="M109 122 Q114.5 131 120 122 Q125.5 131 131 122" fill="none" stroke="${D}" stroke-width="3.5" stroke-linecap="round"/>`,
    happy:`<path d="M107 121 Q120 142 133 121 Z" fill="#B5473F" stroke="${D}" stroke-width="3.5" stroke-linejoin="round"/>`,
    surprised:`<ellipse cx="120" cy="131" rx="7" ry="9" fill="#B5473F" stroke="${D}" stroke-width="3.5"/>`,
  };
  mouth.worry = `<path d="M110 129 Q120 121 130 129" fill="none" stroke="${D}" stroke-width="3.5" stroke-linecap="round"/>`;
  const props = {
    wood:`<path d="M196 182 Q194 150 204 122" fill="none" stroke="#3E7A49" stroke-width="5" stroke-linecap="round"/>
          <ellipse cx="190" cy="140" rx="15" ry="8" fill="#5FB06C" stroke="#3E7A49" stroke-width="3" transform="rotate(-35 190 140)"/>
          <ellipse cx="214" cy="126" rx="17" ry="9" fill="#5FB06C" stroke="#3E7A49" stroke-width="3" transform="rotate(-20 214 126)"/>`,
    fire:`<path d="M200 118 C 224 146, 222 176, 200 178 C 178 176, 176 146, 200 118 Z" fill="#F07A3E" stroke="#B9472A" stroke-width="3.5"/>
          <path d="M200 146 C 210 158, 210 172, 200 172 C 190 172, 190 158, 200 146 Z" fill="#FFD36B"/>`,
    earth:`<path d="M174 138 L226 138 L218 180 L182 180 Z" fill="#C98A52" stroke="#7E5230" stroke-width="3.5" stroke-linejoin="round"/>
           <rect x="170" y="130" width="60" height="12" rx="5" fill="#B87943" stroke="#7E5230" stroke-width="3.5"/>
           <path d="M178 131 Q200 116 222 131 Z" fill="#7A5638"/>`,
    metal:`<circle cx="200" cy="152" r="20" fill="none" stroke="#C49A3A" stroke-width="8"/>
           <circle cx="200" cy="152" r="20" fill="none" stroke="#8C6A22" stroke-width="2" opacity=".6"/>
           <path d="M190 132 L200 120 L210 132 Z" fill="#EEF2F6" stroke="#8C96A3" stroke-width="3" stroke-linejoin="round"/>`,
    water:`<path d="M200 118 C 222 148, 222 178, 200 180 C 178 178, 178 148, 200 118 Z" fill="#6FA4E0" stroke="#2F5E9A" stroke-width="3.5"/>
           <ellipse cx="192" cy="160" rx="5" ry="8" fill="#fff" opacity=".7"/>`,
  };
  const rightPaw = wave
    ? `<ellipse cx="190" cy="132" rx="15" ry="13" fill="${C}" stroke="${O}" stroke-width="4"/>`
    : `<ellipse cx="180" cy="180" rx="15" ry="13" fill="${C}" stroke="${O}" stroke-width="4"/>`;
  return `<svg width="${size}" height="${size}" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
    <path d="M168 200 C 222 200, 228 150, 200 136" fill="none" stroke="${O}" stroke-width="24" stroke-linecap="round"/>
    <path d="M168 200 C 222 200, 228 150, 200 136" fill="none" stroke="${C}" stroke-width="15" stroke-linecap="round"/>
    <ellipse cx="96" cy="226" rx="20" ry="10" fill="${C}" stroke="${O}" stroke-width="4"/>
    <ellipse cx="144" cy="226" rx="20" ry="10" fill="${C}" stroke="${O}" stroke-width="4"/>
    <ellipse cx="120" cy="186" rx="62" ry="44" fill="${C}" stroke="${O}" stroke-width="4"/>
    <path d="M58 76 L48 20 L102 50 Z" fill="${C}" stroke="${O}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M182 76 L192 20 L138 50 Z" fill="${C}" stroke="${O}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M63 62 L58 35 L84 50 Z" fill="${P}"/><path d="M177 62 L182 35 L156 50 Z" fill="${P}"/>
    <ellipse cx="120" cy="104" rx="78" ry="62" fill="${C}" stroke="${O}" stroke-width="4"/>
    ${eyes[mood]}
    <ellipse cx="73" cy="124" rx="12" ry="7" fill="${P}" opacity=".8"/>
    <ellipse cx="167" cy="124" rx="12" ry="7" fill="${P}" opacity=".8"/>
    <path d="M116 114 L124 114 L120 119 Z" fill="${O}" stroke="${O}" stroke-width="2" stroke-linejoin="round"/>
    ${mouth[mood]}
    <path d="M66 152 Q120 182 174 152 L172 168 Q120 196 68 168 Z" fill="#1C2B5A" stroke="#14204A" stroke-width="3" stroke-linejoin="round"/>
    <path d="M146 176 L140 198 L152 194 Z" fill="#1C2B5A"/><path d="M150 176 L160 196 L166 186 Z" fill="#1C2B5A"/>
    <circle cx="148" cy="174" r="10" fill="#C49A3A" stroke="#8C6A22" stroke-width="3"/>
    <ellipse cx="62" cy="186" rx="15" ry="13" fill="${C}" stroke="${O}" stroke-width="4"/>
    ${prop ? props[prop] : ''}
    ${rightPaw}
  </svg>`;
}

const brand = `<div class="brand">천명연구소 · 재미로 보는 명리 상식</div>`;

function chips(){
  return `<div class="chips">${Object.values(EL).map(e=>
    `<div class="chip" style="background:${e.c}"><b>${e.h}</b><span>${e.name}</span></div>`).join('')}</div>`;
}

