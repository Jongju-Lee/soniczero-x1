---
description: Figma MCP 기반 디자인 구현 필수 가이드라인
---

# Figma MCP 디자인 구현 가이드라인

Figma MCP를 통해 디자인을 구현할 때 **반드시 지켜야 할** 작업 규칙입니다.

---

## 📐 1. Pixel-Perfect 구현 (최우선)

Figma 디자인과 **1픽셀도 다르지 않게** 구현합니다:

- ✅ `font-weight`: Figma 값 그대로 적용 (300, 400, 500, 600, 700 등)
- ✅ `letter-spacing`: 정확한 px 값 적용 (-0.2px, 0.2px 등)
- ✅ `line-height`: **단위 없이** 적용 (1, 1.1, 1.2 등)
- ✅ `gap`, `padding`, `margin`: 정확한 spacing 값
- ✅ `border-radius`, `box-shadow`: 모든 수치 정확히

**예시:**
```css
.element {
  font-weight: 600;  /* Figma: 600 */
  letter-spacing: -0.2px;  /* Figma: -0.2px */
  line-height: 1.2;  /* Figma: 120% → 1.2 (단위 없음) */
}
```

---

## 🧹 2. 공통 SCSS 최적화

`_common.scss`나 `style.scss`, `reset.scss`를 먼저 확인하여 **중복 코드 제거**:

- ❌ 이미 전역(SCSS/Reset)에 있는 스타일은 명시하지 않음
- ✅ 필요한 override만 작성
- ✅ React 단위 컴포넌트 내에서의 코드 양 최소화

**확인 사항:**
- Reset SCSS 적용 범위
- 전역 폰트 설정
- 공통 믹스인(`@mixin`) / 유틸리티 클래스

---

## 🎨 3. Variables / Mixins 활용 (디자인 일관성)

`_variables.scss`나 `:root`의 변수들을 **최대한 활용**:

```scss
/* ✅ 좋은 예 */
.card {
  padding: var(--spacing-36);
  color: var(--text-color-title);
  font-family: var(--font-EN);
  box-shadow: var(--shadow-glass);
}

/* ❌ 나쁜 예 */
.card {
  padding: 36px;  /* spacing 변수 사용 안함 */
  color: #333333;  /* text-color 변수 사용 안함 */
}
```

**활용 대상:**
- Colors: `--color-*`, `--text-color-*`
- Spacing: `--spacing-*` (margin, padding만)
- Typography: `--font-*`, `--font-size-*`
- Shadows: `--shadow-*`

---

## 📏 4. Spacing Variables 적용 범위

**Spacing 변수는 margin과 padding에만 사용:**

```scss
/* ✅ 좋은 예 */
.element {
  margin: var(--spacing-24);
  padding: var(--spacing-16);
  gap: var(--spacing-12);  /* gap도 OK */
}

/* ❌ 나쁜 예 */
.element {
  width: var(--spacing-100);  /* width에는 사용 안함 */
  height: var(--spacing-80);  /* height에는 사용 안함 */
}
```

**Width/Height는 Figma 값 그대로 하드코딩**

---

## 📱 5. 반응형 Breakpoints 및 기기 대응

React + SCSS 환경에서는 주로 Mixin(`@include respond-to(tablet)`) 또는 미디어 쿼리를 SCSS로 작성합니다:

**필수 적용:**

| Breakpoint | Media Query / Mixin | 파일 위치 | 우선순위 |
|------------|-------------|------|----------|
| Desktop | 기본 (1025px+) | Component별 `.scss` 파일 | - |
| Tablet | `@media (max-width: 1024px)` | Component별 `.scss` 파일 내 | **필수** |
| Mobile | `@media (max-width: 768px)` | Component별 `.scss` 파일 내 | **필수** |

**작성 순서:**
1. Desktop (기본) SCSS 작성
2. 1024px (tablet) 중첩 미디어 쿼리(또는 `@include`) 작성
3. 768px (mobile) 중첩 미디어 쿼리 작성

---

## 🏗️ 6. BEM 방법론 적용

**SCSS (BEM) 예시:**

```scss
/* Block */
.section-name {
  /* Element */
  &__title { }
  &__content { }
  &__item { 
    /* Modifier */
    &--large { }
  }
}
```

**JSX Component 예시:**
```jsx
<section className="section-name">
  <div className="section-name__inner inner">
    <h2 className="section-name__title">Title</h2>
    <div className="section-name__content">
      <div className="section-name__item">
        <span className="section-name__dot"></span>
        <span>Text</span>
      </div>
    </div>
  </div>
</section>
```

**참고할 섹션:**
- `#about` (about, about-text, about-visual 등)
- `#core` (core-card, core-card__title 등)
- `#skill` (skill-item, skill-item__visual 등)

---

## 🔤 7. UTF-8 인코딩 (매우 중요!)

**한글이 깨지지 않도록 주의:**

### React JSX(TSX)
- ✅ 한글은 **직접 입력** (이스케이프 시퀀스 사용 안함)
- ✅ 파일 저장 시 UTF-8 인코딩 확인
- ✅ 주석도 한글로 작성 가능

**올바른 예시:**
```jsx
<h3 className="core-card__title font-kr">웹 표준 및 웹 접근성 기반 마크업</h3>
```

**잘못된 예시:**
```jsx
{/* 이스케이프 시퀀스 사용 금지 */}
<h3>\uC6F9 \uD45C\uC900...</h3>
```

---

## ✅ 작업 체크리스트

Figma MCP 작업 시 다음 항목들을 **반드시 확인**:

- [ ] Figma와 pixel-perfect 일치 (font-weight, letter-spacing, line-height)
- [ ] `common.css` 확인하여 중복 코드 제거
- [ ] Variables 최대한 활용 (colors, fonts, shadows)
- [ ] Spacing variables는 margin/padding/gap만
- [ ] 1024px, 768px 반응형 필수 작성
- [ ] BEM 방법론 기존 패턴과 동일하게 적용
- [ ] UTF-8 인코딩으로 한글 깨짐 방지

---

## 🎯 작업 순서

1. **Figma 데이터 분석** → Pixel-perfect 수치 확인
2. **Common SCSS 검토** → 중복 제거할 스타일 확인
3. **Variables 매핑** → 사용할 SCSS/CSS 변수 미리 파악
4. **Desktop SCSS 작성** → Pixel-perfect 구현
5. **JSX 작성** → BEM 방법론 적용
6. **Tablet 반응형** (1024px) → 필수
7. **Mobile 반응형** (768px) → 필수
8. **검증** → 브라우저에서 픽셀 단위 확인

---

이 가이드라인을 `/figma-mcp` 명령어로 언제든 참조할 수 있습니다.
