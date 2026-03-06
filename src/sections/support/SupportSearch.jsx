import React from 'react';
import { useScrollFadeIn } from '../../hooks/useScrollFadeIn';
import Button from '../../components/ui/Button';

const SupportSearch = () => {
  const sectionRef = useScrollFadeIn(false, { delay: 0.2 });

  return (
    <section className="support__search" ref={sectionRef}>
      <div className='support__search-intro intro'>
        <div className="support__search-intro-badge">Support Center</div>
        <h1 className="support__search-intro-title">HOW CAN WE HELP?</h1>
        <p className="support__search-intro-desc">SonicZero X1에 대한 <span>모든 궁금증을 해결해 드립니다.</span></p>
      </div>

      <div className="support__search-wrapper">
        <div className="support__search-bar">
          <img src="/assets/icons/support-magnifier.svg" alt="" className="support__search-icon" />
          <input type="text" placeholder="도움이 필요하신 내용을 검색해 보세요." />
          <Button size="sm" variant="primary">Search</Button>
        </div>
        <div className="support__search-tags">
          <span>자주 찾는 :</span>
          <Button size="sm" variant="outline">정품 등록</Button>
          <Button size="sm" variant="outline">서비스 상태</Button>
          <Button size="sm" variant="outline">매뉴얼 다운로드</Button>
        </div>
      </div>
    </section>
  );
};

export default SupportSearch;
