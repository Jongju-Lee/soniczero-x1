import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

const SupportFaq = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const sectionRef = useRef(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

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
    <section className="support__faq" ref={sectionRef}>
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
                <img src={`/assets/icons/${isActive ? 'minus' : 'plus'}.svg`} alt={isActive ? "Collapse" : "Expand"} />
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
  );
};

export default SupportFaq;
