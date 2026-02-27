import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../../components/ui/Button';

gsap.registerPlugin(ScrollTrigger);

const SupportDownloads = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
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
    <section className="support__downloads" ref={sectionRef}>
      <div className="support__downloads-header">
        <h2>Downloads</h2>
        <p>최신 매뉴얼, 펌웨어, 보증 가이드를 다운로드하세요.</p>
      </div>

      <div className="support__downloads-grid">
        <div className="support__downloads-card">
          <div className="icon-box">
            <img src="/assets/icons/downloads-paper.svg" alt="Manual Icon" />
          </div>
          <h3>사용자 매뉴얼</h3>
          <div className="meta">
            <span className="format">PDF</span>
            <span className="size">12.4 MB</span>
          </div>
          <p className="desc">SonicZero X1 사용 설명서 전체 버전</p>
          <Button size="sm" variant="primary" className="download-btn">
            <img src="/assets/icons/downloads-btn.svg" alt="" />
            <span>Download</span>
          </Button>
        </div>

        <div className="support__downloads-card">
          <div className="icon-box">
            <img src="/assets/icons/downloads-core.svg" alt="Firmware Icon" />
          </div>
          <h3>최신 펌웨어 v1.2.4</h3>
          <div className="meta">
            <span className="format">BIN</span>
            <span className="size">48.2 MB</span>
          </div>
          <p className="desc">최신 안정화 펌웨어 (2026.02 릴리즈)</p>
          <Button size="sm" variant="primary" className="download-btn">
            <img src="/assets/icons/downloads-btn.svg" alt="" />
            <span>Download</span>
          </Button>
        </div>

        <div className="support__downloads-card">
          <div className="icon-box">
            <img src="/assets/icons/downloads-shield.svg" alt="Warranty Icon" />
          </div>
          <h3>제품 보증 안내</h3>
          <div className="meta">
            <span className="format">PDF</span>
            <span className="size">3.1 MB</span>
          </div>
          <p className="desc">보증 정책 및 서비스 안내 문서</p>
          <Button size="sm" variant="primary" className="download-btn">
            <img src="/assets/icons/downloads-btn.svg" alt="" />
            <span>Download</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SupportDownloads;
