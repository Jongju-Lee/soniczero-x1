import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Tech = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Phase 3: ScrollTrigger Card Staggering Interaction
    const cards = cardsRef.current;

    const ctx = gsap.context(() => {
      gsap.fromTo(cards, 
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2, // cards appear sequentially
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%", // Triggers when the top of section hits 75% down viewport
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    // Cleanup ScrollTrigger
    return () => ctx.revert();
  }, []);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section className="tech" id="technology" ref={sectionRef}>
      <div className="container tech__inner">
        {/* Placeholder for Card Data from Figma */}
        <div className="tech__grid">
          <div className="tech__card" ref={addToRefs}>
            <div className="tech__card-visual">
              <img src="./assets/images/tech-anc.png" alt="Active Noise Cancellation" />
            </div>
            <div className="tech__card-content">
              <div className="tech__card-badge">
                <img src="./assets/icons/main-shield.svg" alt="" className="tech__card-badge-icon" />
                <span>ACTIVE NOISE CANCELLATION</span>
              </div>
              <h2 className="tech__card-title">Engineered for Silence</h2>
              <p className="tech__card-desc">자체 개발한 AI 기반 ANC 시스템이 초당 10,000회 주변 소음을 분석하고 실시간으로 중화합니다. 붐비는 거리에서든 비행기 안에서든, 전에 없던 완벽한 정적을 경험하세요.</p>
            </div>
          </div>

          <div className="tech__card tech__card--reverse" ref={addToRefs}>
            <div className="tech__card-visual">
              <img src="./assets/images/stellar-silver.png" alt="40mm Custom Drivers" />
            </div>
            <div className="tech__card-content">
              <div className="tech__card-badge">
                <img src="./assets/icons/main-wave.svg" alt="" className="tech__card-badge-icon" />
                <span>40MM CUSTOM DRIVERS</span>
              </div>
              <h2 className="tech__card-title">Sound, Perfected</h2>
              <p className="tech__card-desc">모든 음표, 모든 비트, 모든 속삭임까지 — 커스텀 튜닝된 40mm 네오디뮴 드라이버가 숨 막히는 선명함으로 전달합니다. 우렁찬 저음부터 수정처럼 맑은 고음까지, 아티스트가 의도한 그대로의 음악을 들어보세요.</p>
            </div>
          </div>

          <div className="tech__card" ref={addToRefs}>
            <div className="tech__card-visual">
              <img src="./assets/images/midnight-black.png" alt="High-Capacity Battery" />
            </div>
            <div className="tech__card-content">
              <div className="tech__card-badge">
                <img src="./assets/icons/main-charge.svg" alt="" className="tech__card-badge-icon" />
                <span>HIGH-CAPACITY BATTERY</span>
              </div>
              <h2 className="tech__card-title">Power That Lasts</h2>
              <p className="tech__card-desc">단 한 번의 충전으로 ANC를 켠 상태에서도 최대 60시간 동안 재생이 가능합니다. 장시간 비행이나 끊임없는 영화 감상 등 어떤 상황에서도 음악이 멈추지 않도록 설계되었습니다.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tech;
