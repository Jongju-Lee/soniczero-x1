import React from 'react';
import { useScrollFadeIn } from '../../../hooks/useScrollFadeIn';
import Button from '../../../components/ui/Button';

const Cta = () => {
  const ctaRef = useScrollFadeIn(false, { target: '.cta__content', start: "top 85%" });

  return (
    <section className="cta" id="cta" ref={ctaRef}>
      <div className="container cta__inner">
        <div className="cta__content">
          <h2 className="cta__title">
            Ready to Experience<br/>
            <span className="cta__title-highlight">True Silence?</span>
          </h2>
          <p className="cta__desc">
            사전예약을 통해 SonicZero X1을 <span>특별한 혜택으로 가장 먼저 경험하세요.</span>
          </p>
          <Button to="/shop" size="md" variant="glow" className="cta__btn">Pre-order Now</Button>
        </div>
      </div>
    </section>
  );
};

export default Cta;
