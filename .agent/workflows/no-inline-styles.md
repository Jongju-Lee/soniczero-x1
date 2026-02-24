---
description: HTML inline-style 금지 규칙
---

# JSX Inline-Style 금지 규칙

## 규칙

**절대 React JSX 요소에 `style` 속성을 직접 사용하지 않는다.**

## 이유

1. **유지보수성**: SCSS 파일 모듈화를 통해 컴포넌트 단위로 스타일 관리
2. **재사용성**: 동일한 스타일을 여러 컴포넌트에 적용 가능
3. **성능**: CSS 파일 캐싱으로 렌더링 성능 향상
4. **우선순위 문제**: inline-style은 specificity가 매우 높아 override가 어려움
5. **코드 일관성**: 프로젝트 전체의 스타일 규칙 일관성 유지

## 잘못된 예시

```jsx
<!-- ❌ 절대 사용 금지 -->
<div style={{ color: "red", margin: "10px" }}>Content</div>
<p style={{ fontSize: "16px" }}>Text</p>
<button style={{ backgroundColor: "blue" }}>Click</button>
```

## 올바른 예시

```jsx
<!-- ✅ SCSS/CSS 모듈 클래스 사용 -->
<div className="error-message">Content</div>
<p className="body-text">Text</p>
<button className="primary-button">Click</button>
```

```css
/* CSS 파일에서 정의 */
.error-message {
  margin: 10px;
  color: red;
}

.body-text {
  font-size: 16px;
}

.primary-button {
  background-color: blue;
}
```

## 예외 상황

**예외는 없습니다.** 모든 스타일은 SCSS 파일에서 관리해야 합니다.

동적 스타일이 필요한 경우:
- 조건부 렌더링으로 클래스(`className`)를 전환: `classnames` 라이브러리 연동 또는 템플릿 리터럴 사용
- CSS 변수(Custom Properties) 사용
- data-* 속성과 SCSS 선택자 조합 사용

```jsx
// ✅ 클래스 토글 (템플릿 리터럴)
<div className={`card ${isActive ? 'active' : ''}`} />

// ✅ CSS 변수 사용 (React style prop으로 변수 전달)
<div style={{ '--dynamic-color': color }} className="dynamic-box" />
```

```scss
.dynamic-box {
  color: var(--dynamic-color, #000000);
}
```

## 코드 수정 시

기존 코드에서 inline-style을 발견하면:
1. 해당 스타일을 SCSS 모듈 또는 글로벌 SCSS 파일로 이동
2. 적절한 BEM 클래스명 생성
3. JSX에서 `style={{...}}` 속성 제거 후 `className="..."` 속성 추가

## UI 수정 시 우선순위

**CSS 우선, 필요시에만 JavaScript 사용**

### 원칙

1. **CSS 우선**: UI 변경이 필요할 때 먼저 CSS로 해결 가능한지 검토
2. **JavaScript는 필요시에만**: CSS로 불가능하거나 JS가 더 효율적인 경우에만 사용

### CSS로 해결 가능한 경우

```scss
/* ✅ SCSS로 충분 */
/* 호버 효과 */
.button {
  &:hover {
    background-color: blue;
  }
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
}

/* 애니메이션 */
.fade-in {
  animation: fadeIn 0.3s ease;
}

/* 상태 변경 (React className 토글에 반응) */
.modal.active {
  display: block;
}
```

### React/JS 상태 관리가 필요한 경우

```jsx
// ✅ React 컴포넌트에서 효율적인 제어
// 1. 단순한 사용자 인터랙션 및 계산 값 반영
// progress를 CSS 변수로 전달하고 레이아웃 변경은 SCSS에 일임
<div style={{ '--progress': `${progress}%` }} className="progress-bar" />

// 2. 조건부 클래스 토글
<div className={`form-field ${isValid ? 'valid' : 'error'}`}>

// 3. API 응답에 따른 UI 변경 (상태 플래그 활용)
<button className={isLoading ? 'loading' : 'loaded'}>
```

### 판단 기준

| 상황 | 사용 도구 |
|------|----------|
| 정적 스타일, 호버, 포커스 | CSS |
| 미디어 쿼리, 반응형 | CSS |
| 단순 애니메이션, 트랜지션 | CSS |
| 상태 기반 스타일 (클래스 토글) | CSS + JS (클래스만) |
| 복잡한 계산 기반 스타일 | JS + CSS 변수 |
| 사용자 입력 검증 피드백 | JS + CSS 클래스 |
| 동적 데이터 렌더링 | JS |
| 복잡한 인터랙션 로직 | JS |

