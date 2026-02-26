import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomSelect from '../../components/ui/CustomSelect';

gsap.registerPlugin(ScrollTrigger);

const faqData = [
  {
    q: "페어링 방법이 궁금합니다",
    a: "SonicZero X1의 전원을 켠 후 Bluetooth 버튼을 3초간 길게 누르면 페어링 모드로 진입합니다. 스마트폰이나 노트북의 Bluetooth 설정에서 'SonicZero X1'을 선택하면 자동으로 연결됩니다. 최대 3대의 디바이스에 동시 멀티포인트 연결이 가능합니다."
  },
  {
    q: "배터리 수명은 얼마나 되나요?",
    a: "가득 충전 시 ANC 켬 기준 최대 60시간, ANC 끔 기준 최대 80시간 동안 사용이 가능합니다. 15분 고속 충전으로 최대 5시간 사용이 가능한 빠른 충전 기능을 지원합니다."
  },
  {
    q: "노이즈 캔슬링은 어떻게 작동하나요?",
    a: "SonicZero X1은 8개의 내외부 마이크를 사용하여 주변 소음을 실시간으로 감지하고, AI 알고리즘이 반대 파장을 생성하여 소음을 차단합니다. 전용 앱을 통해 노이즈 캔슬링 강도를 조절할 수 있습니다."
  },
  {
    q: "보증 기간과 서비스 정책은 어떻게 되나요?",
    a: "구매일로부터 1년 간 무상 보증 서비스를 제공합니다. 제품 결함 시 무상 수리 또는 교환이 가능하며, 사용자 과실로 인한 파손의 경우 유상 수리로 진행됩니다."
  },
  {
    q: "펌웨어 업데이트는 어떻게 하나요?",
    a: "스마트폰에 전용 'SonicZero App'을 설치하고 기기를 연결하면, 새로운 펌웨어가 있을 때 자동으로 알림이 표시됩니다. 지침에 따라 무선(OTA)으로 쉽게 업데이트할 수 있습니다."
  },
  {
    q: "반품 및 환불 정책이 궁금합니다",
    a: "제품 수령 후 14일 이내, 미개봉 또는 제품 불량 시 반품/환불이 가능합니다. 고객 변심에 의한 반품의 경우 왕복 배송비가 청구될 수 있습니다."
  }
];

const contactTypeOptions = [
  { value: 'product', label: 'Product Inquiry (제품 문의)' },
  { value: 'order', label: 'Order & Shipping (주문 / 배송)' },
  { value: 'warranty', label: 'Warranty & Repair (보증 / 수리)' },
  { value: 'technical', label: 'Technical Support (기술 지원)' },
  { value: 'feedback', label: 'Feedback & Suggestions (피드백)' },
];

const Support = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [contactType, setContactType] = useState('');
  
  const sectionRef = useRef(null);
  const elementsRef = useRef([]);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const addToRefs = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  useEffect(() => {
    const elements = elementsRef.current;
    
    // Create a GSAP Context for proper React cleanup
    const ctx = gsap.context(() => {
      elements.forEach((el) => {
        gsap.fromTo(el, 
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="support" id="support" ref={sectionRef}>
      <div className="container support__inner">
        
        {/* Hero / Search */}
        <div className="support__hero" ref={addToRefs}>
          <div className="support__hero-badge">Support Center</div>
          <h2 className="support__hero-title">HOW CAN WE HELP?</h2>
          <p className="support__hero-desc">SonicZero X1에 대한 모든 궁금증을 해결해 드립니다.</p>
          
          <div className="support__search">
            <div className="support__search-bar">
              <img src="./assets/icons/magnifier.svg" alt="Search" style={{width: '24px', height: '24px', marginRight: '16px'}} />
              <input type="text" placeholder="도움이 필요하신 내용을 검색해 보세요." />
              <button type="button">Search</button>
            </div>
            <div className="support__search-tags">
              <span>Popular:</span>
              <button>정품 등록</button>
              <button>서비스 상태</button>
              <button>매뉴얼 다운로드</button>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="support__faq" ref={addToRefs}>
          <div className="support__faq-header">
            <h2>Frequently Asked Questions</h2>
            <p>SonicZero X1에 대해 가장 많이 문의하시는 질문들입니다.</p>
          </div>
          
          <div className="support__faq-list">
            {faqData.map((faq, index) => {
              const isActive = openFaqIndex === index;
              return (
                <div key={index} className={`support__faq-item ${isActive ? 'is-active' : ''}`}>
                  <button 
                    className={`support__faq-question ${isActive ? 'is-active' : ''}`}
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{faq.q}</span>
                    <img src={`./assets/icons/${isActive ? 'minus' : 'plus'}.svg`} alt={isActive ? "Collapse" : "Expand"} />
                  </button>
                  <div className="support__faq-answer">
                    <div className="support__faq-answer-inner">
                      <div className="support__faq-answer-content">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Downloads */}
        <div className="support__downloads" ref={addToRefs}>
          <div className="support__downloads-header">
            <h2>Downloads</h2>
            <p>최신 매뉴얼, 펌웨어, 보증 가이드를 다운로드하세요.</p>
          </div>
          
          <div className="support__downloads-grid">
            <div className="support__downloads-card">
              <div className="icon-box">
                <img src="./assets/icons/paper.svg" alt="Manual Icon" />
              </div>
              <h3>사용자 매뉴얼</h3>
              <div className="meta">
                <span className="format">PDF</span>
                <span className="size">12.4 MB</span>
              </div>
              <p className="desc">SonicZero X1 사용 설명서 전체 버전</p>
              <button className="download-btn">
                <span>Download</span>
                <img src="./assets/icons/download.svg" alt="Download Icon" />
              </button>
            </div>

            <div className="support__downloads-card">
              <div className="icon-box">
                <img src="./assets/icons/core.svg" alt="Firmware Icon" />
              </div>
              <h3>최신 펌웨어 v1.2.4</h3>
              <div className="meta">
                <span className="format">BIN</span>
                <span className="size">48.2 MB</span>
              </div>
              <p className="desc">최신 안정화 펌웨어 (2026.02 릴리즈)</p>
              <button className="download-btn">
                <span>Download</span>
                <img src="./assets/icons/download.svg" alt="Download Icon" />
              </button>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="support__contact" ref={addToRefs}>
          <div className="support__contact-header">
            <h2>Contact Us</h2>
            <p>FAQ에서 답을 찾지 못하셨나요? 직접 문의해 주세요.</p>
          </div>
          
          <form className="support__contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <div className="form-group">
                <label>성함 <span className="required">*</span></label>
                <input type="text" placeholder="홍길동" required />
              </div>
              <div className="form-group">
                <label>이메일 <span className="required">*</span></label>
                <input type="email" placeholder="email@example.com" required />
              </div>
            </div>
            
            <div className="form-group">
              <label>문의 유형 <span className="required">*</span></label>
              <CustomSelect
                options={contactTypeOptions}
                placeholder="문의 유형을 선택해 주세요"
                value={contactType}
                onChange={setContactType}
              />
            </div>

            <div className="form-group">
              <label>문의 내용 <span className="required">*</span></label>
              <textarea placeholder="문의하실 내용을 상세히 적어주세요." required></textarea>
            </div>

            <button type="submit" className="submit-btn btn btn--primary btn--lg" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}}>
              <span>문의하기</span>
              <img src="./assets/icons/paper-plane.svg" alt="Send" style={{width: '20px', height: '20px'}} />
            </button>
          </form>
        </div>
        
      </div>
    </section>
  );
};

export default Support;
