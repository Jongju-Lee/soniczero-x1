import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    id: 'anc',
    badge: 'ACTIVE NOISE CANCELLATION',
    icon: './assets/icons/story-shield.svg',
    title: 'Engineered for Silence',
    desc: '자체 개발한 AI 기반 ANC 시스템이 초당 10,000회 주변 소음을 분석하고 실시간으로 중화합니다. 붐비는 거리에서도 비행기 안에서도, 전에 없던 완벽한 정적을 경험하세요.',
    image: './assets/images/tech-anc.webp',
    imageAlt: 'SonicZero X1 Active Noise Cancellation Technology',
    reverse: true,
  },
  {
    id: 'sound',
    badge: '40MM CUSTOM DRIVERS',
    icon: './assets/icons/story-wave.svg',
    title: 'Sound, Perfected',
    desc: '모든 음표, 모든 비트, 모든 속삭임까지 — 커스텀 튜닝된 40mm 네오디뮴 드라이버가 숨 막히는 선명함으로 전달합니다. 우렁찬 저음부터 수정처럼 맑은 고음까지, 아티스트가 의도한 그대로의 음악을 들어보세요.',
    image: './assets/images/stellar-silver.webp',
    imageAlt: 'SonicZero X1 Stellar Silver - 40mm Custom Drivers',
    reverse: false,
  },
  {
    id: 'battery',
    badge: '60-HOUR BATTERY LIFE',
    icon: './assets/icons/story-charge.svg',
    title: 'Power That Lasts',
    desc: '한 번의 충전으로 업계 최고 수준인 60시간 재생이 가능한 X1. 급속 충전 기술로 단 10분 충전만으로 5시간의 음악 감상이 가능합니다.',
    image: './assets/images/midnight-black.webp',
    imageAlt: 'SonicZero X1 Midnight Black - 60-Hour Battery Life',
    reverse: true,
  },
];

const Story = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // prefers-reduced-motion: 사용자가 애니메이션 줄이기 설정 시 즉시 표시
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(['.story__text', '.story__visual'], { opacity: 1, y: 0 });
      return;
    }

    const rows = gsap.utils.toArray('.story__row');

    rows.forEach((row) => {
      const textEl = row.querySelector('.story__text');
      const imageEl = row.querySelector('.story__visual');

      gsap.fromTo(
        textEl,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.8,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
      gsap.fromTo(
        imageEl,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.8,
          delay: 0.15,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section className="story" id="story" ref={containerRef}>
      {features.map((feature, index) => (
        <div
          key={feature.id}
          className={`story__row${feature.reverse ? ' story__row--reverse' : ''}`}
        >
          <div className="story__text">
            <div className="story__badge">
              <img src={feature.icon} alt="" className="story__badge-icon" aria-hidden="true" loading="lazy" />
              <span>{feature.badge}</span>
            </div>
            <h2 className="story__title">{feature.title}</h2>
            <p className="story__desc">{feature.desc}</p>
          </div>

          <div className="story__visual">
            <div className="story__image-wrap">
              <img src={feature.image} alt={feature.imageAlt} className="story__image" loading="lazy" />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Story;
