import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

const Main = () => {
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Phase 2: Interacting timeline as requested by User's Guide
    const tl = gsap.timeline();

    tl.fromTo(title1Ref.current, 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(title2Ref.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6" // overlapping start
    )
    .fromTo(imageRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "power2.out" },
      "-=0.4"
    );

  }, []);

  return (
    <section className="hero" id="home">
      <div className="container hero__inner">
        <div className="hero__content">
          <div className="hero__badge">
            <img src="./assets/icons/main-headphone.svg" alt="Icon" className="hero__badge-icon" />
            <span className="hero__badge-text">Introducing SonicZero X1</span>
          </div>

          <h1 className="hero__title">
            <span className="hero__title-text" ref={title1Ref}>SILENCE</span>
            <span className="hero__title-highlight" ref={title2Ref}>REVOLUTION</span>
          </h1>

          <p className="hero__desc">
            차세대 노이즈 캔슬링 기술로 소음의 한계를 넘어선 정적을 경험해 보세요. 프리미엄 오디오,
            몰입감 있는 사운드, 하루 종일 편안한 착용감 — 헤드폰의 새로운 기준을 제시합니다.
          </p>

          <div className="hero__actions">
            <Link to="/shop" className="hero__btn hero__btn--primary">Pre-order Now — $399</Link>
            <Link to="/tech" className="hero__btn hero__btn--outline">Explore Technology</Link>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__visual-glow"></div>
          <img 
            ref={imageRef}
            src="./assets/images/midnight-black.png" 
            alt="SonicZero X1 Midnight Black" 
            className="hero__visual-image" 
          />
        </div>
      </div>
    </section>
  );
};

export default Main;
