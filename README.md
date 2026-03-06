# 🎧 SonicZero X1 - Premium Wireless Headphones
> 완벽한 침묵 속에서 깨어나는 압도적인 사운드. 가상의 프리미엄 오디오 브랜드 'SonicZero'의 플래그십 무선 헤드폰 제품 소개 및 쇼핑몰 랜딩 페이지입니다.

🔗 **[웹사이트 바로가기 (Live Demo)](https://soniczero-x1.vercel.app/)**

---

## 👨‍💻 프로젝트 소개
2년 차 프론트엔드 퍼블리셔로서의 HTML/CSS 마크업 전문성과 React 기반의 컴포넌트 설계, 그리고 동적인 UI/UX 구현 역량을 종합적으로 보여주기 위해 제작된 포트폴리오 프로젝트입니다. 

기획부터 디자인 시스템 설계, 퍼블리싱, 애니메이션 연출, 배포까지 전 과정을 주도적으로 수행했습니다.

## 💡 핵심 구현 사항 (Key Highlights)

### 1. 확장성과 협업을 극대화한 토큰(Token) 기반 디자인 시스템 구축
*   **중앙 집중형 스타일 딕셔너리:** 컬러, 4px/8px 배수 기반의 Spacing, Radius 등의 디자인 원소를 `_variables.scss`에 CSS 변수로 토큰화하여 전역 관리함으로써 전체적인 UI 일관성을 확보했습니다.
*   **Sass Map & Mixin 고도화:** 복잡한 타이포그래피 세트를 Sass의 `Map` 객체로 추상화하고, `@mixin text-style`로 한 번에 호출하는 모듈형 아키텍처를 설계하여 압도적인 유지보수성을 구현했습니다. (👉 [코드 보기](https://github.com/Jongju-Lee/soniczero-x1/blob/main/src/styles/abstracts/_variables.scss))

### 2. 웹 접근성(A11y) 지침을 고려한 UI 마크업
*   **시맨틱 마크업과 스크린 리더기 대응:** 스크린 리더 사용자를 고려하여 시맨틱 태그로 문서 구조를 짰습니다. 모든 이미지 태그에 요소의 의미를 담아 `alt` 속성을 부여하고, 화면 디자인을 위한 단순 장식용 요소들은 `aria-hidden` 처리하여 정보의 혼선을 방지했습니다.

### 3. 다양한 디바이스 환경을 고려한 반응형(Responsive) 웹 최적화
*   **Clamp 기반 반응형 폰트 시스템:** CSS `clamp()` 함수를 통해 화면 크기에 비례하여 자연스럽게 조절되는 가변 폰트 시스템을 적용했습니다.
*   **모바일 브라우저 이슈 대응:** 아이폰 Safari 등의 모바일 브라우저에서 하단 탭바에 UI가 가려지는 문제를 막기 위해 `100dvh` 단위와 `env(safe-area-inset-bottom)` 속성을 사용하여 레이아웃을 설계했습니다.

### 4. 인터랙티브 UX를 위한 시각적 제어 (GSAP)
*   **Scroll 애니메이션 연출:** 몰입감 높은 스크롤 애니메이션을 구현하되, 렌더링 부하를 줄이고 재사용성을 높이기 위해 로직을 `useScrollFadeIn` 커스텀 훅(Hook)으로 분리했습니다.

---

## 🛠 운영 및 기술 스택 (Tech Stack)

### Core
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

### Styling & Animation
![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)

### Deployment & Tooling
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)

---

## ⚙️ 로컬 실행 방법 (How to run locally)

```bash
# 1. 패키지 설치
npm install

# 2. 로컬 개발 서버 실행
npm run dev

# 3. 빌드 테스트
npm run build
npm run preview
```
