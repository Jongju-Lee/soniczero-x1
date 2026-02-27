import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../../components/ui/Button';

gsap.registerPlugin(ScrollTrigger);

const SupportHero = () => {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    // prefers-reduced-motion: 애니메이션 축소 모드일 시 정적 표시
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(sectionRef.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="support__hero" ref={sectionRef}>
      <div className="support__hero-badge">Support Center</div>
      <h1 className="support__hero-title">HOW CAN WE HELP?</h1>
      <p className="support__hero-desc">SonicZero X1에 대한 모든 궁금증을 해결해 드립니다.</p>

      <div className="support__search">
        <div className="support__search-bar">
          <img src="/assets/icons/support-magnifier.svg" alt="" className="support__search-icon" />
          <input type="text" placeholder="도움이 필요하신 내용을 검색해 보세요." />
          <Button size="sm" variant="primary">Search</Button>
        </div>
        <div className="support__search-tags">
          <span>Popular:</span>
          <Button size="sm" variant="outline">정품 등록</Button>
          <Button size="sm" variant="outline">서비스 상태</Button>
          <Button size="sm" variant="outline">매뉴얼 다운로드</Button>
        </div>
      </div>
    </section>
  );
};

export default SupportHero;
