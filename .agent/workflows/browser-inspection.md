---
description: 웹사이트 점검 시 agent-browser CLI와 browser_subagent 중 올바른 도구를 선택하는 규칙
---

## 🚨 자동 적용 규칙 (MUST READ FIRST)

사용자가 아래 키워드를 포함한 요청을 하면, **별도 언급이 없어도** 이 워크플로우를 즉시 적용한다.

**자동 트리거 키워드:**
- "직접 봐주세요", "실제로 확인", "직접 확인"

**자동 적용 우선순위:**
1. 구조·링크·텍스트 점검 → **무조건 `agent-browser` 먼저** 사용
2. 시각·인터랙션 점검 → `browser_subagent` 사용
3. 복합 점검 → `agent-browser` 먼저, 필요 시 `browser_subagent` 추가

> 사용자가 "browser_subagent 써줘" 라고 명시한 경우에만 직접 `browser_subagent`를 사용한다.

# 웹사이트 점검 도구 선택 규칙

## 환경 전제조건

- `agent-browser` CLI가 **글로벌 설치**되어 있다 (프로젝트 `package.json`과 무관)
- 로컬 개발 서버(`npm run dev`)가 실행 중이어야 localhost 점검 가능
- 이 프로젝트는 **React SPA + GSAP 스크롤 애니메이션** 구조임

설치 여부 확인:
```bash
agent-browser --version
```

미설치 시 설치 방법:
```bash
npm install -g agent-browser   # CLI 설치
agent-browser install          # Chromium 다운로드 (playwright 설치 확인 메시지 → y 입력)
```

---

## 두 도구의 근본적 차이

| 항목 | `agent-browser` | `browser_subagent` |
|------|-----------------|-------------------|
| 실행 방식 | `run_command`로 CLI 호출 | 내장 브라우저 에이전트 도구 |
| 데이터 형식 | 의미론적 트리(refs) + 스크린샷 | 원시 HTML DOM + 시각 렌더링 |
| 토큰 소모 | 적음 (~70~80% 절감) | 많음 |
| 애니메이션 | 헤드리스 실행, 스크롤 트리거 가능 | 실시간 시각 확인 가능 |
| hover/인터랙션 | ❌ 불가 | ✅ 가능 |

---

## 도구 선택 기준

### ✅ agent-browser를 사용하는 경우

다음 작업은 반드시 `run_command`로 `agent-browser`를 호출한다:

- 링크(URL/href) 유효성 확인
- 텍스트 콘텐츠·오탈자 확인
- 페이지 DOM 의미 구조 파악
- footer, header, nav 등 구조 점검
- 전체 페이지 스크린샷 (스크롤 애니메이션 포함 가능)
- 라우팅 이동 후 페이지 구조 확인

### ✅ browser_subagent를 사용하는 경우

다음 작업은 `browser_subagent` 도구를 사용한다:

- hover/focus 인터랙션 시각 확인 (메뉴, 버튼 효과 등)
- 반응형 레이아웃 실시간 리사이즈 확인
- 드롭다운·모달 등 클릭 후 상태 시각 확인
- 전체 사용자 인터랙션 흐름 테스트

---

## agent-browser 명령어 전체 레퍼런스

### 1. 페이지 접속 확인
```bash
agent-browser open http://localhost:5173
# 출력 예: ✓ SonicZero X1 / http://localhost:5173/
```

### 2. 스냅샷 (가장 토큰 효율적인 구조 점검)
```bash
agent-browser snapshot http://localhost:5173
```
출력 형태: HTML 없이 의미 구조만 반환
```
- document:
  - heading "SILENCE REVOLUTION" [ref=e1]
  - link "Pre-order Now" [ref=e3]:
      /url: "/shop"
  - paragraph: © 2026 SonicZero. All rights reserved.
```
> GSAP으로 숨겨진 요소(opacity:0)도 DOM에 존재하므로 스냅샷에서 읽힘

### 3. 스크린샷

#### 기본 전체 페이지 스크린샷 (애니메이션 없는 정적 페이지용)
```bash
agent-browser open http://localhost:5173 ; agent-browser screenshot --full C:\Users\user\Desktop\output.png
```

#### ✅ GSAP/스크롤 애니메이션 포함 전체 페이지 스크린샷 (이 프로젝트 기본 패턴)
```bash
agent-browser open http://localhost:5173 ; agent-browser scroll down 99999 ; agent-browser wait --timeout 2000 ; agent-browser screenshot --full C:\Users\user\Desktop\output.png
```
- `scroll down 99999` → 최하단까지 스크롤하여 모든 IntersectionObserver·GSAP ScrollTrigger 트리거
- `wait --timeout 2000` → 애니메이션 duration 완료 대기 (애니메이션이 길면 3000으로 조정)
- 결과: 모든 섹션이 완전히 렌더링된 상태로 캡처됨 (실제 테스트로 검증됨)

#### 주석 포함 스크린샷 (요소 레이블 확인용)
```bash
agent-browser open http://localhost:5173 ; agent-browser screenshot --annotate C:\Users\user\Desktop\output.png
```

### 4. 스크롤
```bash
agent-browser scroll down 500          # 500px 스크롤
agent-browser scroll down 99999        # 최하단까지
agent-browser scroll up 200            # 위로 200px
```

### 5. 대기
```bash
agent-browser wait --timeout 2000      # 2초 대기
agent-browser wait --text "Welcome"    # 특정 텍스트 등장 대기
```

### 6. 다른 페이지 점검
React SPA는 페이지 이동 시 스냅샷을 새로 찍어야 한다:
```bash
# /shop 페이지 점검 예시
agent-browser open http://localhost:5173/shop ; agent-browser scroll down 99999 ; agent-browser wait --timeout 2000 ; agent-browser screenshot --full C:\Users\user\Desktop\shop.png
```

---

## 혼용 전략 (복합 점검 시 권장 순서)

1. **agent-browser** → 구조·링크·텍스트 1차 점검 (토큰 절약)
2. **browser_subagent** → hover·인터랙션 등 시각 2차 점검

전체 점검의 약 90%는 `agent-browser`만으로 처리 가능하다.

---

## 중요 제한사항 (실제 테스트로 확인된 사실)

| 제한사항 | 내용 |
|----------|------|
| `--headed` 옵션 | 브라우저 UI 창 표시용일 뿐, 애니메이션 추가 트리거 안 됨 |
| 즉시 스크린샷 | 페이지 로드 직후 찍으면 GSAP 초기상태(opacity:0)로 캡처됨 |
| hover 효과 | 마우스 인터랙션 불가, browser_subagent 사용 |
| React SPA | 페이지 이동 시마다 스냅샷 재취득 필요 |
| 애니메이션 duration 대기 | wait --timeout을 애니메이션 길이보다 길게 설정해야 함 |

---

## 설치 정보

```bash
# 설치
npm install -g agent-browser
agent-browser install

# 제거 (잔여물 없이 깔끔하게 제거됨)
npm uninstall -g agent-browser
```

- 라이선스: **Apache 2.0 (완전 무료 오픈소스)**
- 지원 OS: Windows / macOS / Linux
- 설치 경로: 글로벌 npm → 프로젝트 `package.json`에 영향 없음
- Chromium 저장 위치: `C:\Users\user\AppData\Local\ms-playwright\`