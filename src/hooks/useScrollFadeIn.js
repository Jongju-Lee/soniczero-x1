import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * 스크롤 등장 애니메이션(Fade-in Up)을 일괄 적용하는 커스텀 GSAP 훅
 * @param {boolean} disabled - 애니메이션 강제 비활성화 여부
 * @param {object} options - GSAP 및 ScrollTrigger 추가 옵션
 * @returns {object} containerRef - 적용할 컴포넌트에 감싸줄 최상위 ref
 */
export const useScrollFadeIn = (disabled = false, options = {}) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // 1. 접근성 및 강제 비활성화 가드
    if (disabled || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(containerRef.current, { opacity: 1, y: 0 });
      return;
    }

    const { 
      duration = 0.8, 
      delay = 0, 
      y = 50,
      stagger = 0, 
      ease = "power2.out", 
      target = containerRef.current, // 기본값은 컨테이너 자체
      start = "top 85%",
      toggleActions = "play none none reverse"
    } = options;

    // target이 배열이나 문자열(클래스명)일 수 있으므로 일괄 적용
    gsap.fromTo(target, 
      { y: y, opacity: 0 },
      { 
        y: 0, opacity: 1, duration, delay, stagger, ease,
        scrollTrigger: {
          trigger: containerRef.current,
          start: start,
          toggleActions: toggleActions
        }
      }
    );
  }, { scope: containerRef, dependencies: [disabled, options] });

  return containerRef;
};
