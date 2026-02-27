import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../components/ui/Button'

gsap.registerPlugin(ScrollTrigger);

const ShopPage = () => {
  const shopRef = useRef(null);
  const galleryImgRef = useRef(null);
  const [quantity, setQuantity] = useState(1);
  const [activeColorIndex, setActiveColorIndex] = useState(0);

  // Define the product color variants and their corresponding images
  const products = [
    {
      name: 'Midnight Black',
      image: '/assets/images/shop-gallery-1.png',
      thumbImage: '/assets/images/shop-gallery-1.png',
      colorCode: '#1A1A1C'
    },
    {
      name: 'Stellar-Silver',
      image: '/assets/images/shop-gallery-2.png',
      thumbImage: '/assets/images/shop-gallery-2.png',
      colorCode: '#8E8E93'
    },
    {
      name: 'Electric Blue',
      image: '/assets/images/shop-gallery-3.png',
      thumbImage: '/assets/images/shop-gallery-3.png',
      colorCode: '#0047AB'
    }
  ];

  const boxItems = [
    'SonicZero X1 헤드폰 본체',
    '프리미엄 캐리 케이스',
    '3.5mm 오디오 케이블',
    'USB-C 충전 케이블',
    '기내용 어댑터',
    '빠른 시작 가이드',
  ];

  const handlePrevSlide = () => {
    setActiveColorIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveColorIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.shop__hero-badge', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      gsap.from('.shop__hero-title', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.1,
        ease: 'power3.out'
      });

      gsap.from('.shop__gallery', {
        x: -40,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
      });

      gsap.from('.shop__details', {
        x: 40,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
      });
    }, shopRef);

    return () => ctx.revert();
  }, []);

  // Gallery Image Transition Animation (Slower, elegant fade + scale + unblur)
  useGSAP(() => {
    if (galleryImgRef.current) {
      gsap.fromTo(
        galleryImgRef.current,
        { opacity: 0, scale: 0.96, filter: 'blur(8px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power2.out' }
      );
    }
  }, { dependencies: [activeColorIndex], scope: shopRef });

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  return (
    <section className="shop" ref={shopRef}>
      <div className='shop__inner'>
        <section className="shop__hero">
          <div className="shop__hero-badge">Pre-order</div>
          <h1 className="shop__hero-title">Make It Yours</h1>
        </section>
      
        <section className="shop__content">
          <div className="shop__gallery">
            <div className="shop__gallery-main">
              <button className="shop__gallery-nav shop__gallery-nav--prev" onClick={handlePrevSlide} aria-label="Previous Image">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              <img 
                ref={galleryImgRef}
                src={products[activeColorIndex].image} 
                alt={`SonicZero X1 ${products[activeColorIndex].name}`} 
                className="shop__gallery-img"
              />
              
              <button className="shop__gallery-nav shop__gallery-nav--next" onClick={handleNextSlide} aria-label="Next Image">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              <div className="shop__gallery-dots">
                {products.map((_, index) => (
                  <span 
                    key={index} 
                    className={`dot ${activeColorIndex === index ? 'active' : ''}`}
                    onClick={() => setActiveColorIndex(index)}
                  ></span>
                ))}
              </div>
            </div>
            <div className="shop__gallery-thumbs">
              {products.map((product, index) => (
                <button 
                  key={index}
                  type="button" 
                  className={`thumb ${activeColorIndex === index ? 'active' : ''}`} 
                  onClick={() => setActiveColorIndex(index)}
                  style={{ backgroundImage: `url(${product.thumbImage})`}}
                  aria-label={`Thumbnail ${index + 1}`}
                >
                </button>
              ))}
            </div>
          </div>

          <div className="shop__details">
            <div className="shop__details-header">
              <h2 className="shop__details-title">SonicZero X1</h2>
              <p className="shop__details-desc">프리미엄 노이즈 캔슬링 헤드폰</p>
            </div>

            <h3 className="shop__details-price">$399.00</h3>

            <div className="shop__details-color">
              <span className="label">Color — {products[activeColorIndex].name}</span>
              <div className="color-options">
                {products.map((product, index) => (
                  <button 
                    key={product.name}
                    type="button" 
                    className={`color-btn ${activeColorIndex === index ? 'active' : ''}`}
                    onClick={() => setActiveColorIndex(index)}
                    aria-label={product.name}
                    style={{ backgroundColor: product.colorCode }}
                  />
                ))}
              </div>
            </div>

            <div className="shop__details-quantity">
              <span className="label">수량</span>
              <div className="quantity-selector">
                <button type="button" onClick={handleDecrease} aria-label="Decrease">
                  <img src="/assets/icons/shop-minus.svg" alt="Minus" />
                </button>
                <span className="value">{quantity}</span>
                <button type="button" onClick={handleIncrease} aria-label="Increase">
                  <img src="/assets/icons/shop-plus.svg" alt="Plus" />
                </button>
              </div>
            </div>

            <div className="shop__details-action">
              <Button size="lg" variant="primary" className="cart-btn">
                <img src="/assets/icons/shop-cart.svg" alt="Cart" />
                <span>장바구니 담기 — ${(399 * quantity).toFixed(2)}</span>
              </Button>
              <p className="guarantee">전 세계 무료 배송. 30일 이내 환불 보장.</p>
            </div>

            <div className="shop__details-includes">
              <h3 className="box-title">구성품 안내</h3>
              <ul className="box-list">
                {boxItems.map((item) => (
                  <li key={item}>
                    <img src="/assets/icons/shop-box-check.svg" alt="" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

    </section>
  );
};

export default ShopPage;
