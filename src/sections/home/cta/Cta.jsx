import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';

gsap.registerPlugin(ScrollTrigger);

const Cta = () => {
  const ctaRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // prefers-reduced-motion: 사용자가 애니메이션 줄이기 설정 시 즉시 표시
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(contentRef.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, ctaRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="cta" id="cta" ref={ctaRef}>
      <div className="container cta__inner">
        <div className="cta__content" ref={contentRef}>
          <h2 className="cta__title">
            Ready to Experience<br/>
            <span className="cta__title-highlight">True Silence?</span>
          </h2>
          <p className="cta__desc">
            사전예약을 통해 SonicZero X1을 특별한 혜택으로 가장 먼저 경험하세요.
          </p>
          <Button to="/shop" size="md" variant="glow" className="cta__btn">Pre-order Now</Button>
        </div>
      </div>
    </section>
  );
};

export default Cta;
