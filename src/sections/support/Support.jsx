import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomSelect from '../../components/ui/CustomSelect';
import Button from '../../components/ui/Button';


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
  
  // 폼 상태 관리
  const [formData, setFormData] = useState({
    contactName: '',
    contactEmail: '',
    contactType: '',
    contactMessage: ''
  });

  // 에러 상태 및 터치 상태 관리
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
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

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'contactName':
        if (!value.trim()) error = '이름을 입력해 주세요.';
        break;
      case 'contactEmail':
        if (!value.trim()) {
          error = '이메일을 입력해 주세요.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = '유효한 이메일 형식을 입력해 주세요.';
        }
        break;
      case 'contactType':
        if (!value) error = '문의 유형을 선택해 주세요.';
        break;
      case 'contactMessage':
        if (!value.trim()) error = '메시지를 입력해 주세요.';
        break;
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (touched[id]) {
      setErrors(prev => ({ ...prev, [id]: validateField(id, value) }));
    }
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, contactType: value }));
    if (touched.contactType) {
      setErrors(prev => ({ ...prev, contactType: validateField('contactType', value) }));
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    
    // 전체 폼 검증
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    
    // 모든 필드를 터치한 것으로 간주하여 에러 메시지 표시
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    if (Object.keys(newErrors).length === 0) {
      // 폼 제출 로직 (정상 제출)
      console.log('Form submitted successfully:', formData);
      alert('문의가 접수되었습니다.');
      // 폼 초기화 로직 등
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
      <div className="support__inner">

        {/* 1. Hero + Search */}
        <section className="support__hero" ref={addToRefs}>
          <div className="support__hero-badge">Support Center</div>
          <h1 className="support__hero-title">HOW CAN WE HELP?</h1>
          <p className="support__hero-desc">SonicZero X1에 대한 모든 궁금증을 해결해 드립니다.</p>

          <div className="support__search">
            <div className="support__search-bar">
              <img src="./assets/icons/magnifier.svg" alt="" className="support__search-icon" />
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

        {/* 2. FAQ */}
        <section className="support__faq" ref={addToRefs}>
          <div className="support__faq-header">
            <h2>Frequently Asked Questions</h2>
            <p>SonicZero X1에 대해 가장 많이 문의하시는 질문들입니다.</p>
          </div>

          <div className="support__faq-list">
            {faqData.map((faq, index) => {
              const isActive = openFaqIndex === index;
              const faqId = `faq-answer-${index}`;
              
              return (
                <div key={faq.q} className={`support__faq-item ${isActive ? 'is-active' : ''}`}>
                  <button
                    className={`support__faq-question ${isActive ? 'is-active' : ''}`}
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isActive}
                    aria-controls={faqId}
                  >
                    <span>{faq.q}</span>
                    <img src={`./assets/icons/${isActive ? 'minus' : 'plus'}.svg`} alt={isActive ? "Collapse" : "Expand"} />
                  </button>
                  <div className="support__faq-answer" id={faqId}>
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
        </section>

        {/* 3. Downloads */}
        <section className="support__downloads" ref={addToRefs}>
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
              <Button size="sm" variant="primary" className="download-btn">
                <img src="./assets/icons/download.svg" alt="" />
                <span>Download</span>
              </Button>
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
              <Button size="sm" variant="primary" className="download-btn">
                <img src="./assets/icons/download.svg" alt="" />
                <span>Download</span>
              </Button>
            </div>

            <div className="support__downloads-card">
              <div className="icon-box">
                <img src="./assets/icons/core.svg" alt="Warranty Icon" />
              </div>
              <h3>제품 보증 안내</h3>
              <div className="meta">
                <span className="format">PDF</span>
                <span className="size">3.1 MB</span>
              </div>
              <p className="desc">보증 정책 및 서비스 안내 문서</p>
              <Button size="sm" variant="primary" className="download-btn">
                <img src="./assets/icons/download.svg" alt="" />
                <span>Download</span>
              </Button>
            </div>
          </div>
        </section>

        {/* 4. Contact */}
        <section className="support__contact" ref={addToRefs}>
          <div className="support__contact-header">
            <h2>Contact Us</h2>
            <p>FAQ에서 답을 찾지 못하셨나요? 직접 문의해 주세요.</p>
          </div>

          <form className="support__contact-form" onSubmit={handleContactSubmit}>
            <div className="form-row">
              <div className={`form-group ${touched.contactName && errors.contactName ? 'has-error' : ''}`}>
                <label htmlFor="contactName">성함 <span className="required">*</span></label>
                <input 
                  type="text" 
                  id="contactName" 
                  placeholder="홍길동" 
                  value={formData.contactName}
                  onChange={handleInputChange}
                />
                {touched.contactName && errors.contactName && <span className="error-msg">{errors.contactName}</span>}
              </div>
              <div className={`form-group ${touched.contactEmail && errors.contactEmail ? 'has-error' : ''}`}>
                <label htmlFor="contactEmail">이메일 <span className="required">*</span></label>
                <input 
                  type="email" 
                  id="contactEmail" 
                  placeholder="email@example.com" 
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                />
                {touched.contactEmail && errors.contactEmail && <span className="error-msg">{errors.contactEmail}</span>}
              </div>
            </div>

            <div className={`form-group ${touched.contactType && errors.contactType ? 'has-error' : ''}`}>
              <label htmlFor="contactType">문의 유형 <span className="required">*</span></label>
              <CustomSelect
                id="contactType"
                options={contactTypeOptions}
                placeholder="문의 유형을 선택해 주세요"
                value={formData.contactType}
                onChange={handleSelectChange}
              />
              {touched.contactType && errors.contactType && <span className="error-msg">{errors.contactType}</span>}
            </div>

            <div className={`form-group ${touched.contactMessage && errors.contactMessage ? 'has-error' : ''}`}>
              <label htmlFor="contactMessage">메시지 <span className="required">*</span></label>
              <textarea 
                id="contactMessage" 
                placeholder="문의하실 내용을 상세히 적어주세요." 
                value={formData.contactMessage}
                onChange={handleInputChange}
              ></textarea>
              {touched.contactMessage && errors.contactMessage && <span className="error-msg">{errors.contactMessage}</span>}
            </div>

            <button type="submit" className="support__contact-submit btn btn--primary btn--lg">
              <span>문의하기</span>
              <img src="./assets/icons/paper-plane.svg" alt="" className="support__contact-submit-icon" />
            </button>
          </form>
        </section>

      </div>
    </section>
  );

};

export default Support;
