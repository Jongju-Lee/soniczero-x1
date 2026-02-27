import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../components/ui/Button';

gsap.registerPlugin(ScrollTrigger);

const TechPage = () => {
  const containerRef = useRef(null);
  const svgPathRef = useRef(null);
  const animFrameRef = useRef(null);
  const [isAncActive, setIsAncActive] = useState(true);
  const isAncActiveRef = useRef(true);

  // requestAnimationFrame 루프에서 최신 값을 읽을 수 있도록 ref와 state 동기화
  useEffect(() => {
    isAncActiveRef.current = isAncActive;
  }, [isAncActive]);

  // SVG Wave 애니메이션 (requestAnimationFrame 사용) + IntersectionObserver 최적화
  useEffect(() => {
    // prefers-reduced-motion: 사용자가 애니메이션 줄이기 설정 시 정지
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let t = 0;
    let isVisible = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animFrameRef.current) {
          animFrameRef.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 } // 10% 이상 보일 때 활성화
    );

    if (svgPathRef.current) {
      observer.observe(svgPathRef.current.parentElement);
    }

    const animate = () => {
      // 화면에 보이지 않으면 루프 일시 정지 (다시 보일 때 observer가 재개함)
      if (!isVisible) {
        animFrameRef.current = null;
        return;
      }
      
      const path = svgPathRef.current;
      const glowPath = svgPathRef.current?.previousElementSibling; // 글로우 효과용 path
      if (!path || !glowPath) return;

      const width = 680; // viewBox 너비
      const centerY = 80; // viewBox의 중심 Y 좌표
      const points = 120;
      const anc = isAncActiveRef.current;

      // ANC 켜짐: 미세하게 불규칙한 파동이 있는 매우 낮은 진폭
      // ANC 꺼짐: 노이즈가 있는 중간 진폭 파동
      const amplitude = anc ? 4 : 20;
      const speed = anc ? 0.012 : 0.045;
      const noisy = !anc;

      let d = `M 0 ${centerY}`;
      for (let i = 0; i <= points; i++) {
        const x = (i / points) * width;
        let y = centerY + Math.sin(i * 0.18 + t) * amplitude;
        // ANC 켜짐: 약간의 불규칙성을 위해 미세한 2차 조화파 추가
        if (anc) {
          y += Math.sin(i * 0.37 + t * 1.3) * 1.5;
          y += Math.sin(i * 0.71 + t * 0.8) * 1.0;
        }
        if (noisy) {
          // 노이즈 효과를 위한 조화파 추가
          y += Math.sin(i * 0.45 + t * 1.7) * 8;
          y += Math.sin(i * 0.9 + t * 2.3) * 5;
          y += (Math.random() - 0.5) * 3;
        }
        d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
      }

      path.setAttribute('d', d);
      glowPath.setAttribute('d', d); // 동일한 path 궤적을 글로우에 적용
      t += speed;
      animFrameRef.current = requestAnimationFrame(animate);
    };

    return () => {
      observer.disconnect();
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []); // isAncActiveRef로 최신값 참조하므로 의존성 배열 불필요

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
  }, { scope: containerRef });

  return (
    <section className="tech" ref={containerRef}>
      <div className="tech__inner">
        {/* ANC Section: Intro + Widget */}
        <div className="tech__anc-section">
          {/* Intro Text */}
          <div className="tech__anc-intro tech-fade-up">
            <span className="tech__anc-badge">Technology</span>
            <h1 className="tech__anc-title">Science of Silence</h1>
            <p className="tech__anc-desc">
              혁신적인 엔지니어링과 최첨단 AI 기술이 만나 역대 가장 진보한 노이즈 캔슬링을 실현합니다.
            </p>
          </div>

          {/* Interactive ANC Widget */}
          <div className="tech__anc-widget tech-fade-up">
            <div className="tech__anc-panel">
              <div className="tech__anc-monitor-header">
                <div className="tech__anc-status-wrapper">
                  <h2 className="tech__anc-monitor-title">Sound Wave Monitor</h2>
                  <p className="tech__anc-monitor-subtitle" key={isAncActive}>
                    {isAncActive ? 'ANC 활성 — 소음이 중화되었습니다' : 'ANC 비활성 — 주변 소음이 감지됩니다'}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant={isAncActive ? 'primary' : 'outline'}
                  type="button"
                  className={`tech__btn-toggle ${isAncActive ? 'tech__btn-toggle--on' : 'tech__btn-toggle--off'}`}
                  onClick={() => setIsAncActive(!isAncActive)}
                >
                  <span className="tech__btn-labels">
                    <span
                      className={`tech__btn-label${isAncActive ? ' tech__btn-label--visible' : ''}`}
                      aria-hidden={!isAncActive}
                    >ANC ON</span>
                    <span
                      className={`tech__btn-label${!isAncActive ? ' tech__btn-label--visible' : ''}`}
                      aria-hidden={isAncActive}
                    >ANC OFF</span>
                  </span>
                </Button>
              </div>

              <div className="tech__wave-container">
                <svg
                  className="tech__wave-svg"
                  viewBox="0 0 680 160"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label={isAncActive
                    ? 'ANC 활성 상태 음파 — 조용하고 안정적인 파형'
                    : 'ANC 비활성 상태 음파 — 불규칙한 소음 파형'}
                >
                  {/* Horizontal guide lines */}
                  <line x1="0" y1="40" x2="680" y2="40" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
                  <line x1="0" y1="80" x2="680" y2="80" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
                  <line x1="0" y1="120" x2="680" y2="120" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
                  {/*
                    애니메이션 성능 최적화를 위해 CSS filter: drop-shadow 대신
                    두껍고 투명도가 있는 path 하나를 겹쳐서 글로우 효과를 표현합니다.
                  */}
                  <path
                    fill="none"
                    stroke={isAncActive ? 'rgba(0, 122, 255, 0.5)' : 'rgba(255, 59, 48, 0.5)'}
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="tech__wave-glow-path"
                  />
                  {/* 실제 메인 Animated wave path */}
                  <path
                    ref={svgPathRef}
                    fill="none"
                    stroke={isAncActive ? '#007AFF' : '#FF3B30'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="tech__wave-main-path"
                  />
                </svg>
              </div>

              <div className="tech__anc-footer">
                <div className="tech__anc-stats">
                  <span className={`tech__anc-stat-dot ${isAncActive ? 'tech__anc-stat-dot--active' : 'tech__anc-stat-dot--inactive'}`}></span>
                  <p className="tech__anc-monitor-desc" key={isAncActive}>
                    {isAncActive
                      ? '소음 차단율: 98.7%'
                      : '소음 차단율: 0%'}
                  </p>
                </div>
                <p className="tech__anc-latency" key={isAncActive}>
                  지연 시간: {isAncActive ? '0.3ms' : '—'}
                </p>
              </div>
            </div>
            <div className="tech__anc-visual">
              {/* Render Image */}
              <img
                src="/assets/images/tech-headphone-exploded.png"
                alt="SonicZero X1 Internal Components Render"
                className="tech__anc-image"
              />
            </div>
          </div>
        </div>

        {/* Feature Grid Section */}
        <section className="tech__features">
          <div className="tech__features-header tech-fade-up">
            <h2 className="tech__features-title">Built Different</h2>
            <p className="tech__features-desc">모든 부품이 최고의 성능을 위해 설계되었습니다.</p>
          </div>

          <div className="tech__grid">
            {/* Card 1: AI Chipset */}
            <article className="tech__feature">
              <div className="tech__feature-icon-wrapper">
                <img src="/assets/icons/tech-chip.svg" alt="" className="tech__feature-icon" />
              </div>
              <h3 className="tech__feature-title">AI Chipset</h3>
              <p className="tech__feature-desc">자체 개발 SonicZero SZ-1 프로세서가 머신 러닝을 활용하여 실시간으로 노이즈 캔슬링을 최적화합니다. 사용자의 환경을 학습하고 초당 10,000회 오디오 전달을 자동 조정합니다.</p>
            </article>

            {/* Card 2: Battery */}
            <article className="tech__feature">
              <div className="tech__feature-icon-wrapper">
                <img src="/assets/icons/tech-battery.svg" alt="" className="tech__feature-icon" />
              </div>
              <h3 className="tech__feature-title">60H Battery</h3>
              <p className="tech__feature-desc">ANC 활성화 상태에서 업계 최고 수준인 60시간 배터리 수명을 제공합니다. 급속 충전으로 10분 충전 시 5시간 재생이 가능하며, USB-C 고속 충전을 지원합니다.</p>
            </article>

            {/* Card 3: Bluetooth */}
            <article className="tech__feature">
              <div className="tech__feature-icon-wrapper">
                <img src="/assets/icons/tech-bluetooth.svg" alt="" className="tech__feature-icon" />
              </div>
              <h3 className="tech__feature-title">Bluetooth 5.4</h3>
              <p className="tech__feature-desc">최대 3대의 디바이스에 동시 멀티포인트 연결이 가능합니다. 20ms의 초저지연으로 영상 통화와 게이밍에서도 완벽한 립싱크를 보장합니다.</p>
            </article>

            {/* Card 4: Audio */}
            <article className="tech__feature">
              <div className="tech__feature-icon-wrapper">
                <img src="/assets/icons/tech-audio.svg" alt="" className="tech__feature-icon" />
              </div>
              <h3 className="tech__feature-title">Hi-Res Audio</h3>
              <p className="tech__feature-desc">LDAC, aptX Adaptive, AAC 코덱을 지원합니다. 40mm 커스텀 네오디뮴 드라이버가 4Hz~40kHz의 광대역 주파수로 스튜디오급 청취 경험을 제공합니다.</p>
            </article>
          </div>
        </section>
      </div>
    </section>
  );
};

export default TechPage;
