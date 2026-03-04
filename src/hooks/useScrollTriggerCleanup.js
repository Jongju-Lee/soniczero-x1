/**
 * 페이지 이동 직전 스크롤을 즉시 최상단으로 이동시킵니다.
 * CSS scroll-behavior: smooth 를 우회하여 ScrollTrigger가
 * 잘못된 스크롤 위치에서 발동되는 문제를 방지합니다.
 */
export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'instant' });
};
