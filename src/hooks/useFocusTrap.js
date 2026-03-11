import { useEffect } from 'react';

// Tab 키로 이동 가능한 요소 셀렉터
const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * 포커스 트랩 훅 — dialog/modal 내부에서 Tab 키 포커스를 가둡니다.
 * @param {React.RefObject} containerRef - 포커스를 가둘 컨테이너 ref
 * @param {boolean} isActive - 포커스 트랩 활성 여부
 * @param {object} options
 * @param {React.RefObject} [options.initialFocusRef] - 활성화 시 최초 포커스 대상
 * @param {React.RefObject} [options.returnFocusRef]  - 비활성화 시 포커스 복귀 대상
 */
export const useFocusTrap = (containerRef, isActive, { initialFocusRef, returnFocusRef } = {}) => {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    // 트랩 활성 시: 초기 포커스 이동
    if (initialFocusRef?.current) {
      initialFocusRef.current.focus();
    } else {
      const focusable = containerRef.current.querySelectorAll(FOCUSABLE_SELECTORS);
      if (focusable.length > 0) focusable[0].focus();
    }

    // Tab / Shift+Tab 순환 처리
    const handleTabKey = (e) => {
      if (e.key !== 'Tab' || !containerRef.current) return;

      const focusable = Array.from(
        containerRef.current.querySelectorAll(FOCUSABLE_SELECTORS)
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        // Shift+Tab: 첫 번째 요소에서 마지막으로 순환
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        // Tab: 마지막 요소에서 첫 번째로 순환
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);

    return () => {
      document.removeEventListener('keydown', handleTabKey);
      // 트랩 해제 시: 트리거 요소로 포커스 복귀 (A3)
      returnFocusRef?.current?.focus();
    };
  }, [isActive]); // eslint-disable-line react-hooks/exhaustive-deps
};
