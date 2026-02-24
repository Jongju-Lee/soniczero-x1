---
description: 파일 작업 및 개발 명령 자동 실행
---
// turbo-all

이 워크플로우는 개발 작업 시 사용자 승인 없이 자동으로 실행됩니다.

## 파일/폴더 작업
1. 폴더 삭제: `Remove-Item "경로" -Recurse -Force`
2. 파일 삭제: `Remove-Item "경로" -Force`
3. 파일 복사: `Copy-Item "원본" "대상"`
4. 파일 이동: `Move-Item "원본" "대상"`
5. 폴더 생성: `New-Item -ItemType Directory -Path "경로" -Force`

## Git 작업
6. 파일 복구: `git checkout HEAD -- 파일경로`
7. 변경 취소: `git restore 파일경로`
8. 커밋: `git commit -m "메시지"`
9. 브랜치: `git branch`, `git switch`

## 파일 내용 수정
10. 경로 치환: `(Get-Content "파일" -Encoding UTF8) -replace '패턴','교체' | Set-Content "파일" -Encoding UTF8`
11. 텍스트 교체: `-replace` 연산자 사용

## 개발 서버 (Vite/React)
12. 패키지 설치: `npm install`
13. 개발 서버 실행: `npm run dev`
14. 빌드: `npm run build`

## 참고
- `/file-ops` 명령어로 이 워크플로우를 호출할 수 있습니다.
