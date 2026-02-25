---
description: SCSS 파일 수정 시 포맷팅 및 규칙 (React + Vite + SCSS)
---

# SCSS 포맷팅 규칙

## 1. Vite + SCSS 환경 특징 및 Autoprefixer 설정
- **Autoprefixer 등 PostCSS 지원**: Vite 환경에서 Autoprefixer를 사용하려면 **별도 설치 및 설정이 필요**합니다. (Vite 기본 템플릿에는 포함되어 있지 않습니다.)
  - 설치: `npm install -D postcss autoprefixer`
  - 설정: 프로젝트 루트에 `postcss.config.js` 또는 `postcss.config.cjs` 파일을 만들고 아래 코드를 추가합니다.
    ```javascript
    module.exports = {
      plugins: [
        require('autoprefixer')
      ]
    }
    ```
  - **설정 후에는 `-webkit-` 등 Vendor Prefix를 수동으로 작성하지 않습니다.** (빌드 시 알아서 추가됨)
- **모듈화**: SCSS 파일 분할 및 불러오기 시 **반드시 `@use`만 사용**합니다. (`@import`는 더 이상 권장되지 않으며 프로젝트에서 사용을 금지합니다.)

## 2. Nesting(중첩) 규칙

### 최대 중첩 깊이 (Depth Limit)
- **최대 3 Depth**까지만 중첩을 허용합니다. (유지보수성과 가독성을 위해)
- 그 이상 필요하다면 클래스를 분리하거나 BEM 구조를 재설정합니다.

```scss
/* ✅ 올바른 예시 (최대 3 Depth) */
.card {
  &__header {
    > .title {
      /* ... */
    }
  }
}

/* ❌ 잘못된 예시 (4 Depth 이상) */
.card {
  &__header {
    .title {
      span {
        /* 이렇게까지 깊게 들어가지 말 것 */
      }
    }
  }
}
```

### 부모 참조자 (`&`) 활용
- 가상 클래스(`:hover`, `:active`) 및 가상 요소(`::before`, `::after`)는 항상 `&`와 붙여서 작성합니다.
- BEM 방식 사용 시 요소와 모디파이어는 `&__element`, `&--modifier` 형태로 연결하여 작성합니다.

```scss
/* ✅ 올바른 예시 */
.button {
  background: var(--color-primary);

  &:hover {
    background: var(--color-primary-dark);
  }

  &--large {
    padding: 16px 32px;
  }
}
```

### 자식 선택자 (`>`)
- `>` 앞뒤로 띄어쓰기와 함께 작성합니다. (예: `& > span`)

## 3. 빈 줄 규칙

### 파트/섹션 구분 시
- 주석 상단에만 빈 줄 1개 추가.
- 상위 루트 클래스가 달라지거나 크게 파트가 변경될 때.

### 중첩 블록(Nesting Block) 내부
- 속성과 중첩 선택자 사이에는 빈 줄을 1줄 추가하여 가독성을 높입니다.

```scss
/* ✅ 올바른 예시 */
.card {
  display: flex;
  padding: 20px;
  
  /* 속성들과 중첩 블록 사이에 빈 줄을 넣습니다 */
  &__title {
    font-size: 1.2rem;
  }
}
```

## 4. 속성 작성 순서

속성은 다음 순서대로 작성합니다. 각 그룹 내에서는 관련 속성끼리 묶어서 작성합니다. (이전 CSS 규칙과 동일)

1. **SCSS 지시어**: `@extend`, `@include`
2. **레이아웃 (Position & Display)**
3. **박스 모델 (Box Model)**
4. **시각 효과 (Visual)**
5. **타이포그래피 (Typography)**
6. **트랜지션 & 애니메이션 (Transition & Animation)**
7. **기타 (Misc)**
8. **의사 클래스/요소 (Pseudo-classes/Pseudo-elements)**: `&:hover`, `&::before`
9. **중첩 선택자 (Nested Selectors)**: `&__element`, `> child`

```scss
.element {
  /* 1. SCSS 지시어 */
  @include flex-center;
  
  /* 2. Position & Display */
  position: absolute;
  top: 0;
  left: 50%;
  z-index: 10;
  
  /* 3. Box Model */
  width: 100%;
  padding: var(--spacing-lg);
  border-radius: var(--spacing-md);
  
  /* 4. Visual */
  background-color: var(--color-background);
  box-shadow: var(--shadow-normal);
  
  /* 5. Typography */
  color: var(--text-color-body);
  
  /* 6. Transition & Animation */
  transition: transform 0.3s ease;
  
  /* 7. Misc */
  cursor: pointer;
  
  /* 8. Pseudo-classes */
  &:hover {
    transform: translateY(-5px);
  }
  
  /* 9. Nested Selectors */
  &__inner {
    display: block;
  }
}
```

## 5. 변수(Variables) 혼용 지침
- **SCSS 변수(`$var`)**: 컴파일 시점에 결정되는 값, 미디어 쿼리 breakpoint, 믹스인 인자 등에 주로 사용.
- **CSS 변수(`var(--var)`)**: 런타임에 동적으로 변경되는 테마(Dark mode 등) 및 레이아웃 관련 주요 값에 사용.
- **권장 사항**: 테마나 글로벌 컬러/스페이싱은 `var()` 사용, 환경 설정 성격이나 믹스인 내부는 `$var` 사용을 권장합니다.

## 6. 단위(Units) 사용 규칙
- **rem 단위 최우선 사용**: 텍스트 크기(`font-size`), 내부 요소에 따라 크기가 유연하게 바뀌어야 하는 영역의 높이(`height`), 패딩, 마진 등 거의 모든 수치는 항상 **`rem`** 기준 단위로 코드를 작성합니다.
  - 홀수 px 단위(`73px` 등)는 가급적 짝수(`74px`, `76px` 등) 기반으로 변환 후 `rem`(`4.625rem`, `4.75rem`)으로 계산하여 적용합니다. (1rem = 16px 기준)
- **px 단위 예외적 허용**: `border` 두께(`1px`)와 같이 아주 작은 `px`이 필요한 경우나, 배경 블러 필터(`blur(128px)`)처럼 특별히 아주 큰 수치를 사용하는 경우에만 예외적으로 `px`를 허용합니다. 이외에 `px`를 사용해야 하는 특별한 부분이 있다면 사용자(USER)가 직접 명시할 것입니다.
