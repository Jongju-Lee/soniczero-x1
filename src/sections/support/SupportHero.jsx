import React from 'react';
import { useScrollFadeIn } from '../../hooks/useScrollFadeIn';
import Button from '../../components/ui/Button';

const SupportHero = () => {
  const sectionRef = useScrollFadeIn();

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
