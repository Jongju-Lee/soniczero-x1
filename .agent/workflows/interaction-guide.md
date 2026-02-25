---
description: [Interaction Guide] SonicZero X1 Microsite GSAP 및 CSS 기반 인터랙션 가이드라인
---

# [Interaction Guide] SonicZero X1 Microsite

이 문서는 React + SCSS 환경에서 GSAP 및 CSS를 사용하여 구현해야 할 핵심 인터랙션 가이드라인입니다.
모든 수치는 유지보수를 위해 CSS Variables로 관리합니다.

## 1. Global Motion Tokens (CSS Variables)

`_variables.scss`나 `:root` 영역에 다음 모션을 토큰화하여 관리합니다:

```scss
// SCSS 변수 (주로 GSAP 등 JS에서 import 하거나 CSS로 사용)
:root {
  --transition-base: 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  --scroll-reveal-distance: 50px;
}

// GSAP용 전용 이징 (React 컴포넌트 내에서 상수 처리 권장)
// --ease-premium: "expo.out"
```

## 2. Section Specific Interactions

### [Page 01: Hero Section]
- **Initial Load**: 페이지 로드 시 `SILENCE REVOLUTION` 타이틀이 아래에서 위로 `0.8초간` 부드럽게 나타남.
  - 적용 로직: `y: 50`, `opacity: 0` -> `y: 0`, `opacity: 1`
- **Product Entrance**: 헤드셋 메인 이미지가 타이틀 직후에 살짝 커지며 등장.
  - 적용 로직: `Scale 0.9` -> `1.0`

### [Page 02: Technology] (GSAP ScrollTrigger)
- **Scroll Reveal**: 각 카드(`.tech__card`)는 스크롤이 해당 위치에 도달했을 때 **순차적으로(Stagger)** 나타남.
- **ANC Visualization**: 사운드 파동(SVG)은 무한 루프 애니메이션을 적용하되, `'ANC ON'` 버튼 클릭 시 파동의 진폭이 작아지며 평탄해지는 효과 구현.

### [Page 03: Shop] (Micro-interactions)
- **Color Swatch**: 색상 버튼 클릭 시 메인 제품 이미지(`img`)가 자연스럽게 `Fade-in/out` 되며 교체됨.
- **Button Hover**: `'Add to Cart'` 버튼 마우스 오버 시 배경색이 서서히 밝아지며 미세하게 위로 뜸 (TranslateY `-4px`).
  - *참고: CSS의 `--transition-base` 변수 활용 권장*

### [Page 05: Support] (UI Logic)
- **FAQ Accordion**: 질문 클릭 시 답변 영역이 `max-height` 요소 애니메이션과 함께 부드럽게 열림.
  - *참고: GSAP 또는 CSS 트랜지션을 통해 렌더링 최적화 적용*
- **Form Focus**: Input 필드 포커스 시 테두리 색상이 `--color-primary`로 변경되며 라벨이 위로 살짝 이동.

## 3. Implementation Instructions for AI
1. 모든 스크롤 기반 애니메이션은 **GSAP ScrollTrigger**를 사용할 것.
2. 성능 최적화를 위해 CSS **`will-change: transform`** 속성을 적절히 활용할 것.
3. 모든 애니메이션 로직에는 **한글 주석을 상세히 달아** 유지보수를 고려할 것. (특히 React의 `useEffect` / `useGSAP` 훅 내부)
