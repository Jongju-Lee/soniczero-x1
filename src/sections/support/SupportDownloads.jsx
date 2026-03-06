import React from 'react';
import { useScrollFadeIn } from '../../hooks/useScrollFadeIn';
import Button from '../../components/ui/Button';

const SupportDownloads = () => {
  const sectionRef = useScrollFadeIn();

  return (
    <section className="support__downloads section-sm" ref={sectionRef}>
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
