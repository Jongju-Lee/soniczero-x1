import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TechAnc from '../sections/technology/TechAnc';
import TechFeatures from '../sections/technology/TechFeatures';

gsap.registerPlugin(ScrollTrigger);

const TechPage = () => {
  const containerRef = useRef(null);
  const [isAncActive, setIsAncActive] = useState(true);

  useGSAP(() => {
    // prefers-reduced-motion: 사용자가 애니메이션 줄이기 설정 시 즉시 표시
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(
        ['.tech__anc-intro', '.tech__anc-widget', '.tech__features-header', '.tech__feature'],
        { opacity: 1, y: 0 }
      );
      return;
    }

    // 1. 헤더는 페이지 로드 즉시 애니메이션 (ScrollTrigger 없음)
    gsap.fromTo(
      '.tech__anc-intro',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    );

    // 2. ANC + Feature Grid는 스크롤 트리거
    gsap.fromTo(
      '.tech__anc-widget',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.tech__anc-widget',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    gsap.fromTo(
      '.tech__features-header',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.tech__features',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 3. Feature Grid Staggered Animation
    gsap.fromTo(
      '.tech__feature',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.tech__grid',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, { scope: containerRef, dependencies: [isAncActive] });

  return (
    <article className="tech" ref={containerRef}>
      <TechAnc isAncActive={isAncActive} setIsAncActive={setIsAncActive} />
      <TechFeatures />
    </article>
  );
};

export default TechPage;
