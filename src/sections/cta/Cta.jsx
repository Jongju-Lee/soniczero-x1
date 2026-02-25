import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Cta = () => {
  const ctaRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
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
            사전예약으로 SonicZero X1을 특별한 혜택방식으로 가장 먼저 경험하세요.
          </p>
          <Link to="/shop" className="cta__btn">Pre-order Now</Link>
        </div>
      </div>
    </section>
  );
};

export default Cta;
