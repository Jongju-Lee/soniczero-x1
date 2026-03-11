import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Button from '../../components/ui/Button';

const Main = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // prefers-reduced-motion: 사용자가 애니메이션 줄이기 설정 시 즉시 표시
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(
        ['.hero__badge', '.hero__title', '.hero__desc', '.hero__desc--sub', '.hero__actions', '.hero__visual-image'],
        { opacity: 1, y: 0, scale: 1 }
      );
      return;
    }

    // 5단계 순차 등장 타임라인 (물 흐르듯 짧은 겹침으로 연결)
    const tl = gsap.timeline({ delay: 0.2 });

    // 1. badge
    tl.fromTo('.hero__badge',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 2.0, ease: 'power4.out' }
    )
    // 2. 타이틀 (title-text, title-highlight 하나로 통합)
    .fromTo('.hero__title',
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 2.3, ease: 'power4.out' },
      '<0.15'
    )
    // 3. 설명 문단 두 개 동시 등장
    .fromTo(['.hero__desc', '.hero__desc--sub'],
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 2.1, ease: 'power4.out' },
      '<0.15'
    )
    // 4. 버튼 영역
    .fromTo('.hero__actions',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 2.0, ease: 'power4.out' },
      '<0.15'
    )
    // 5. 헤드폰 이미지
    .fromTo('.hero__visual-image',
      { scale: 0.94, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2.5, ease: 'power4.out' },
      '<0.15'
    );

  }, { scope: containerRef });

  return (
    <section className="hero" id="home" ref={containerRef}>
      <div className="container hero__inner">
        <div className="hero__content">
          <div className="hero__badge">
            <img src="./assets/icons/main-headphone.svg" alt="" aria-hidden="true" className="hero__badge-icon" />
            <span className="hero__badge-text">Introducing SonicZero X1</span>
          </div>

          <h1 className="hero__title">
            <span className="hero__title-text">SILENCE</span>
            <span className="hero__title-highlight">REVOLUTION</span>
          </h1>

          <p className="hero__desc">
            차세대 노이즈 캔슬링 기술로 소음의 한계를 넘어선 정적을 경험해 보세요. 프리미엄 오디오,
            몰입감 있는 사운드, 하루 종일 편안한 착용감
          </p>
          <p className="hero__desc hero__desc--sub">
            헤드폰의 새로운 기준을 제시합니다.
          </p>

          <div className="hero__actions">
            <Button to="/shop" size="md" variant="primary">Pre-order Now — $399</Button>
            <Button to="/technology" size="md" variant="outline">Explore Technology</Button>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__visual-glow"></div>
          <img 
            src="./assets/images/hero-img.webp" 
            alt="SonicZero X1 Midnight Black" 
            className="hero__visual-image"
            fetchpriority="high"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
};

export default Main;
