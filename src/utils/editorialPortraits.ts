export interface PortraitSpec {
  id: string;
  bgTop: string;
  bgBottom: string;
  accentGlow: string;
  skin: string;
  skinShadow: string;
  hair: string;
  hairStyle: 'wavy' | 'short' | 'bob' | 'curly' | 'bun' | 'parted';
  shirt: string;
  shirtAccent: string;
  glasses?: boolean;
  beard?: boolean;
  earrings?: boolean;
  scene: 'cafe' | 'rooftop' | 'gallery' | 'park' | 'coastal' | 'studio' | 'loft';
}

function renderSceneBackdrop(spec: PortraitSpec): string {
  switch (spec.scene) {
    case 'cafe':
      return `
        <circle cx="255" cy="95" r="56" fill="#FFE6C7" opacity="0.42" />
        <rect x="28" y="40" width="90" height="220" rx="14" fill="#FFFFFF" opacity="0.14" />
        <path d="M10 380 Q150 320 300 370 L300 400 L0 400 Z" fill="#1F172A" opacity="0.16" />
      `;
    case 'rooftop':
      return `
        <circle cx="235" cy="88" r="68" fill="${spec.accentGlow}" opacity="0.32" />
        <rect x="22" y="210" width="38" height="190" rx="4" fill="#1C192E" opacity="0.22" />
        <rect x="70" y="185" width="46" height="215" rx="4" fill="#1C192E" opacity="0.16" />
        <rect x="226" y="195" width="54" height="205" rx="4" fill="#1C192E" opacity="0.2" />
        <circle cx="52" cy="94" r="8" fill="#FFF3D6" opacity="0.45" />
        <circle cx="92" cy="76" r="5" fill="#FFF3D6" opacity="0.35" />
      `;
    case 'gallery':
      return `
        <rect x="30" y="54" width="84" height="110" rx="8" fill="#FFFFFF" opacity="0.24" />
        <rect x="40" y="64" width="64" height="90" rx="4" fill="${spec.accentGlow}" opacity="0.22" />
        <circle cx="248" cy="112" r="44" fill="#FFFFFF" opacity="0.18" />
      `;
    case 'park':
      return `
        <circle cx="62" cy="92" r="54" fill="#FFFFFF" opacity="0.22" />
        <circle cx="252" cy="128" r="64" fill="${spec.accentGlow}" opacity="0.22" />
        <ellipse cx="44" cy="240" rx="68" ry="52" fill="#2A5C48" opacity="0.22" />
        <ellipse cx="268" cy="255" rx="66" ry="58" fill="#2A5C48" opacity="0.2" />
      `;
    case 'coastal':
      return `
        <circle cx="228" cy="108" r="58" fill="#FFD4B8" opacity="0.52" />
        <path d="M0 288 Q90 274 180 288 T300 284 L300 400 L0 400 Z" fill="#FFFFFF" opacity="0.14" />
      `;
    case 'studio':
      return `
        <rect x="206" y="42" width="70" height="190" rx="12" fill="#FFFFFF" opacity="0.2" />
        <line x1="241" y1="42" x2="241" y2="232" stroke="#FFFFFF" stroke-opacity="0.25" stroke-width="2" />
        <circle cx="58" cy="106" r="42" fill="${spec.accentGlow}" opacity="0.24" />
      `;
    default:
      return `
        <circle cx="242" cy="96" r="64" fill="${spec.accentGlow}" opacity="0.26" />
        <rect x="24" y="64" width="76" height="150" rx="10" fill="#FFFFFF" opacity="0.16" />
      `;
  }
}

function renderHairBack(spec: PortraitSpec): string {
  switch (spec.hairStyle) {
    case 'wavy':
      return `
        <path d="M84 150 C76 92 114 60 150 60 C188 60 224 92 216 150 C224 196 226 248 206 276 C192 260 184 246 184 216 L116 216 C116 246 108 260 94 276 C74 248 76 196 84 150 Z" fill="${spec.hair}" />
      `;
    case 'bob':
      return `
        <path d="M84 148 C82 92 114 62 150 62 C186 62 218 92 216 148 C220 184 214 222 194 234 L106 234 C86 222 80 184 84 148 Z" fill="${spec.hair}" />
      `;
    case 'curly':
      return `
        <g fill="${spec.hair}">
          <circle cx="102" cy="112" r="30" />
          <circle cx="198" cy="112" r="30" />
          <circle cx="92" cy="156" r="28" />
          <circle cx="208" cy="156" r="28" />
          <circle cx="98" cy="198" r="24" />
          <circle cx="202" cy="198" r="24" />
          <circle cx="150" cy="86" r="46" />
        </g>
      `;
    case 'bun':
      return `
        <circle cx="150" cy="56" r="26" fill="${spec.hair}" />
        <path d="M94 144 C94 94 118 68 150 68 C182 68 206 94 206 144 Z" fill="${spec.hair}" />
      `;
    default:
      return `
        <path d="M96 142 C94 92 118 68 150 68 C182 68 206 92 204 142 Z" fill="${spec.hair}" />
      `;
  }
}

function renderHairFront(spec: PortraitSpec): string {
  switch (spec.hairStyle) {
    case 'wavy':
      return `
        <path d="M96 138 C98 92 126 72 154 74 C182 76 202 100 202 138 C192 116 174 104 150 104 C128 104 108 118 96 138 Z" fill="${spec.hair}" />
      `;
    case 'bob':
      return `
        <path d="M95 140 C98 92 126 74 150 74 C178 74 202 96 204 140 C192 118 176 108 154 108 C126 108 112 122 95 140 Z" fill="${spec.hair}" />
      `;
    case 'curly':
      return `
        <g fill="${spec.hair}">
          <circle cx="122" cy="96" r="20" />
          <circle cx="150" cy="88" r="22" />
          <circle cx="178" cy="96" r="20" />
        </g>
      `;
    case 'short':
      return `
        <path d="M98 134 C96 92 122 70 150 70 C180 70 204 92 202 134 C194 108 176 96 150 96 C126 96 106 108 98 134 Z" fill="${spec.hair}" />
      `;
    case 'parted':
      return `
        <path d="M98 136 C96 90 124 70 152 70 C180 70 204 94 202 136 C192 112 174 98 144 98 C124 98 108 114 98 136 Z" fill="${spec.hair}" />
      `;
    case 'bun':
      return `
        <path d="M98 136 C100 94 124 76 150 76 C176 76 200 94 202 136 C190 110 172 100 150 100 C128 100 110 110 98 136 Z" fill="${spec.hair}" />
      `;
  }
}

export function buildPortraitSvg(spec: PortraitSpec): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" width="600" height="800">
      <defs>
        <linearGradient id="bg_${spec.id}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${spec.bgTop}" />
          <stop offset="100%" stop-color="${spec.bgBottom}" />
        </linearGradient>
        <radialGradient id="glow_${spec.id}" cx="0.72" cy="0.22" r="0.65">
          <stop offset="0%" stop-color="${spec.accentGlow}" stop-opacity="0.45" />
          <stop offset="100%" stop-color="${spec.accentGlow}" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="300" height="400" fill="url(#bg_${spec.id})" />
      <rect width="300" height="400" fill="url(#glow_${spec.id})" />
      ${renderSceneBackdrop(spec)}

      <!-- Hair Back -->
      ${renderHairBack(spec)}

      <!-- Shoulders & Outfit -->
      <path d="M46 400 C50 310 88 272 150 272 C212 272 250 310 254 400 Z" fill="${spec.shirt}" />
      <path d="M116 274 L150 330 L184 274 C172 271 128 271 116 274 Z" fill="${spec.shirtAccent}" opacity="0.88" />

      <!-- Neck & Jaw Shadow -->
      <rect x="131" y="220" width="38" height="62" rx="18" fill="${spec.skin}" />
      <path d="M131 232 Q150 248 169 232 L169 220 L131 220 Z" fill="${spec.skinShadow}" opacity="0.35" />

      <!-- Ears -->
      <ellipse cx="99" cy="166" rx="9" ry="14" fill="${spec.skinShadow}" />
      <ellipse cx="201" cy="166" rx="9" ry="14" fill="${spec.skinShadow}" />
      ${
        spec.earrings
          ? `<circle cx="99" cy="182" r="4.5" fill="#FDE68A" /><circle cx="201" cy="182" r="4.5" fill="#FDE68A" />`
          : ''
      }

      <!-- Face -->
      <rect x="102" y="96" width="96" height="134" rx="46" fill="${spec.skin}" />

      <!-- Subtle cheek warmth -->
      <ellipse cx="122" cy="176" rx="12" ry="7" fill="#FF6B81" opacity="0.2" />
      <ellipse cx="178" cy="176" rx="12" ry="7" fill="#FF6B81" opacity="0.2" />

      <!-- Eyes & Brows -->
      <path d="M118 144 Q129 138 140 144" fill="none" stroke="${spec.hair}" stroke-width="3.2" stroke-linecap="round" />
      <path d="M160 144 Q171 138 182 144" fill="none" stroke="${spec.hair}" stroke-width="3.2" stroke-linecap="round" />
      <circle cx="129" cy="156" r="4.8" fill="#252333" />
      <circle cx="171" cy="156" r="4.8" fill="#252333" />
      <circle cx="130.6" cy="154.5" r="1.5" fill="#FFFFFF" />
      <circle cx="172.6" cy="154.5" r="1.5" fill="#FFFFFF" />

      <!-- Nose -->
      <path d="M150 154 L147 175 Q150 179 155 176" fill="none" stroke="${spec.skinShadow}" stroke-width="2.6" stroke-linecap="round" />

      <!-- Beard (optional) -->
      ${
        spec.beard
          ? `<path d="M104 172 C104 214 124 232 150 232 C176 232 196 214 196 172 C188 186 174 192 150 192 C126 192 112 186 104 172 Z" fill="${spec.hair}" opacity="0.24" />`
          : ''
      }

      <!-- Warm Smile -->
      <path d="M134 191 Q150 205 166 191" fill="none" stroke="#9B4B5A" stroke-width="3.2" stroke-linecap="round" />
      <path d="M138 192 Q150 200 162 192" fill="#FFFFFF" opacity="0.82" />

      <!-- Glasses (optional) -->
      ${
        spec.glasses
          ? `
            <rect x="113" y="146" width="32" height="22" rx="7" fill="none" stroke="#252333" stroke-width="2.6" />
            <rect x="155" y="146" width="32" height="22" rx="7" fill="none" stroke="#252333" stroke-width="2.6" />
            <line x1="145" y1="156" x2="155" y2="156" stroke="#252333" stroke-width="2.6" />
          `
          : ''
      }

      <!-- Hair Front -->
      ${renderHairFront(spec)}
    </svg>
  `.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function buildHeroCoupleSvg(): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520" width="1600" height="1040">
      <defs>
        <linearGradient id="heroSky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#F3ECFF" />
          <stop offset="52%" stop-color="#FFEAF2" />
          <stop offset="100%" stop-color="#FFF4EA" />
        </linearGradient>
        <radialGradient id="sunGlow" cx="0.78" cy="0.22" r="0.55">
          <stop offset="0%" stop-color="#FF6B81" stop-opacity="0.28" />
          <stop offset="55%" stop-color="#7028E8" stop-opacity="0.1" />
          <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0" />
        </radialGradient>
      </defs>

      <rect width="800" height="520" fill="url(#heroSky)" />
      <rect width="800" height="520" fill="url(#sunGlow)" />

      <!-- Architectural Window & Café Terrace -->
      <rect x="44" y="42" width="240" height="330" rx="24" fill="#FFFFFF" opacity="0.58" />
      <rect x="520" y="54" width="236" height="310" rx="24" fill="#FFFFFF" opacity="0.46" />
      <circle cx="655" cy="118" r="62" fill="#FFD1B3" opacity="0.5" />
      <path d="M0 405 Q220 375 420 398 T800 392 L800 520 L0 520 Z" fill="#EAE4F7" />

      <!-- Left Person -->
      <g transform="translate(150, 75)">
        <path d="M84 148 C76 92 114 60 150 60 C188 60 222 92 216 148 C222 192 224 238 206 264 L94 264 C76 238 78 192 84 148 Z" fill="#2A1D3D" />
        <path d="M44 420 C52 308 88 268 150 268 C212 268 248 308 256 420 Z" fill="#7028E8" />
        <rect x="132" y="218" width="36" height="56" rx="18" fill="#E6AC8C" />
        <rect x="104" y="96" width="92" height="128" rx="44" fill="#E6AC8C" />
        <ellipse cx="122" cy="172" rx="11" ry="6" fill="#FF6B81" opacity="0.22" />
        <ellipse cx="178" cy="172" rx="11" ry="6" fill="#FF6B81" opacity="0.22" />
        <path d="M120 144 Q130 138 140 144" fill="none" stroke="#2A1D3D" stroke-width="3" stroke-linecap="round" />
        <path d="M162 144 Q172 138 182 144" fill="none" stroke="#2A1D3D" stroke-width="3" stroke-linecap="round" />
        <circle cx="130" cy="156" r="4.5" fill="#252333" />
        <circle cx="172" cy="156" r="4.5" fill="#252333" />
        <path d="M135 188 Q152 202 169 187" fill="none" stroke="#9B4B5A" stroke-width="3.2" stroke-linecap="round" />
        <path d="M98 136 C100 92 126 72 154 74 C180 76 200 98 202 136 C190 112 172 102 150 102 C128 102 110 114 98 136 Z" fill="#2A1D3D" />
      </g>

      <!-- Right Person -->
      <g transform="translate(350, 58)">
        <path d="M96 142 C94 92 118 68 150 68 C182 68 206 92 204 142 Z" fill="#1F192E" />
        <path d="M40 436 C48 318 88 274 150 274 C212 274 252 318 260 436 Z" fill="#252333" />
        <path d="M120 276 L150 332 L180 276 Z" fill="#FFFFFF" opacity="0.92" />
        <rect x="131" y="220" width="38" height="60" rx="18" fill="#C98A6B" />
        <rect x="102" y="96" width="96" height="132" rx="46" fill="#C98A6B" />
        <path d="M104 174 C104 214 124 230 150 230 C176 230 196 214 196 174 C188 186 174 192 150 192 C126 192 112 186 104 174 Z" fill="#1F192E" opacity="0.22" />
        <path d="M118 144 Q129 138 140 144" fill="none" stroke="#1F192E" stroke-width="3" stroke-linecap="round" />
        <path d="M160 144 Q171 138 182 144" fill="none" stroke="#1F192E" stroke-width="3" stroke-linecap="round" />
        <circle cx="129" cy="156" r="4.5" fill="#252333" />
        <circle cx="171" cy="156" r="4.5" fill="#252333" />
        <path d="M133 190 Q149 203 165 190" fill="none" stroke="#7A3642" stroke-width="3.2" stroke-linecap="round" />
        <path d="M98 134 C96 90 122 70 150 70 C180 70 204 92 202 134 C194 108 176 96 150 96 C126 96 106 108 98 134 Z" fill="#1F192E" />
      </g>

      <!-- Café Table & Espresso Cups -->
      <rect x="200" y="424" width="400" height="22" rx="11" fill="#FFFFFF" />
      <rect x="215" y="446" width="370" height="74" fill="#F5F3FA" />
      <rect x="315" y="392" width="38" height="32" rx="8" fill="#FFFFFF" stroke="#DCD8EC" stroke-width="2" />
      <rect x="442" y="392" width="38" height="32" rx="8" fill="#FFFFFF" stroke="#DCD8EC" stroke-width="2" />
      <path d="M396 364 C396 355 408 352 412 361 C416 352 428 355 428 364 C428 375 412 385 412 385 C412 385 396 375 396 364 Z" fill="#FF4F87" />
    </svg>
  `.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const PORTRAIT_GALLERY = {
  heroCouple: buildHeroCoupleSvg(),
  camila1: buildPortraitSvg({
    id: 'camila1',
    bgTop: '#EFE7FF',
    bgBottom: '#FFE6EF',
    accentGlow: '#FF6B81',
    skin: '#E6AE8F',
    skinShadow: '#C78A6B',
    hair: '#2A1D3D',
    hairStyle: 'wavy',
    shirt: '#FFFFFF',
    shirtAccent: '#7028E8',
    earrings: true,
    scene: 'cafe',
  }),
  camila2: buildPortraitSvg({
    id: 'camila2',
    bgTop: '#E6F0FF',
    bgBottom: '#FCE8F2',
    accentGlow: '#7028E8',
    skin: '#E6AE8F',
    skinShadow: '#C78A6B',
    hair: '#2A1D3D',
    hairStyle: 'bun',
    shirt: '#FF4F87',
    shirtAccent: '#FFFFFF',
    earrings: true,
    scene: 'gallery',
  }),
  rafael1: buildPortraitSvg({
    id: 'rafael1',
    bgTop: '#292246',
    bgBottom: '#5B347A',
    accentGlow: '#FF6B81',
    skin: '#D69775',
    skinShadow: '#B37353',
    hair: '#1E1A2D',
    hairStyle: 'short',
    shirt: '#2E4039',
    shirtAccent: '#E2E8F0',
    beard: true,
    scene: 'rooftop',
  }),
  rafael2: buildPortraitSvg({
    id: 'rafael2',
    bgTop: '#EDEBF8',
    bgBottom: '#D9DCF2',
    accentGlow: '#7028E8',
    skin: '#D69775',
    skinShadow: '#B37353',
    hair: '#1E1A2D',
    hairStyle: 'parted',
    shirt: '#252333',
    shirtAccent: '#FF6B81',
    beard: true,
    scene: 'studio',
  }),
  sofia1: buildPortraitSvg({
    id: 'sofia1',
    bgTop: '#FFF0E6',
    bgBottom: '#F5E4F7',
    accentGlow: '#FF4F87',
    skin: '#F1C1A6',
    skinShadow: '#D29B7E',
    hair: '#6B3429',
    hairStyle: 'bob',
    shirt: '#7028E8',
    shirtAccent: '#FFD6E4',
    earrings: true,
    scene: 'gallery',
  }),
  sofia2: buildPortraitSvg({
    id: 'sofia2',
    bgTop: '#E9F5EE',
    bgBottom: '#F5ECFF',
    accentGlow: '#7028E8',
    skin: '#F1C1A6',
    skinShadow: '#D29B7E',
    hair: '#6B3429',
    hairStyle: 'wavy',
    shirt: '#252333',
    shirtAccent: '#FF4F87',
    scene: 'park',
  }),
  lucas1: buildPortraitSvg({
    id: 'lucas1',
    bgTop: '#E5F2EE',
    bgBottom: '#DCE9FA',
    accentGlow: '#7028E8',
    skin: '#9E6648',
    skinShadow: '#7D4B32',
    hair: '#191624',
    hairStyle: 'short',
    shirt: '#26386B',
    shirtAccent: '#FFFFFF',
    beard: true,
    scene: 'park',
  }),
  marina1: buildPortraitSvg({
    id: 'marina1',
    bgTop: '#F7EBF6',
    bgBottom: '#FFEBE6',
    accentGlow: '#FF6B81',
    skin: '#B97C5B',
    skinShadow: '#945B3E',
    hair: '#1C1726',
    hairStyle: 'curly',
    shirt: '#FF6B81',
    shirtAccent: '#FFFFFF',
    earrings: true,
    scene: 'cafe',
  }),
  gabriel1: buildPortraitSvg({
    id: 'gabriel1',
    bgTop: '#EAF0FA',
    bgBottom: '#EFEAF8',
    accentGlow: '#7028E8',
    skin: '#ECC0A7',
    skinShadow: '#C7977D',
    hair: '#3F2B25',
    hairStyle: 'parted',
    shirt: '#4A4661',
    shirtAccent: '#F8F8FC',
    glasses: true,
    scene: 'studio',
  }),
  beatriz1: buildPortraitSvg({
    id: 'beatriz1',
    bgTop: '#FFE9DE',
    bgBottom: '#F6E6F9',
    accentGlow: '#FF4F87',
    skin: '#D69977',
    skinShadow: '#B37656',
    hair: '#2B1F2E',
    hairStyle: 'wavy',
    shirt: '#FFFFFF',
    shirtAccent: '#FF4F87',
    earrings: true,
    scene: 'coastal',
  }),
  currentUser: buildPortraitSvg({
    id: 'currentUser',
    bgTop: '#EAE4FC',
    bgBottom: '#FFEAF2',
    accentGlow: '#7028E8',
    skin: '#E0A484',
    skinShadow: '#BC8162',
    hair: '#241D35',
    hairStyle: 'parted',
    shirt: '#7028E8',
    shirtAccent: '#FFFFFF',
    scene: 'loft',
  }),
  chatDinner: buildPortraitSvg({
    id: 'chatDinner',
    bgTop: '#FFE9E0',
    bgBottom: '#F1E8FF',
    accentGlow: '#FF4F87',
    skin: '#E6AE8F',
    skinShadow: '#C78A6B',
    hair: '#2A1D3D',
    hairStyle: 'wavy',
    shirt: '#252333',
    shirtAccent: '#FF6B81',
    scene: 'rooftop',
  }),
};
