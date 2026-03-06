import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ShopGallery from '../sections/shop/ShopGallery';
import ShopDetails from '../sections/shop/ShopDetails';

gsap.registerPlugin(ScrollTrigger);

const ShopPage = () => {
  const shopRef = useRef(null);
  const [quantity, setQuantity] = useState(1);
  const [activeColorIndex, setActiveColorIndex] = useState(0);

  // Define the product color variants and their corresponding images
  const products = [
    {
      name: 'Midnight Black',
      image: '/assets/images/shop-gallery-1.webp',
      thumbImage: '/assets/images/shop-gallery-1.webp',
      colorCode: '#1A1A1C'
    },
    {
      name: 'Stellar-Silver',
      image: '/assets/images/shop-gallery-2.webp',
      thumbImage: '/assets/images/shop-gallery-2.webp',
      colorCode: '#8E8E93'
    },
    {
      name: 'Electric Blue',
      image: '/assets/images/shop-gallery-3.webp',
      thumbImage: '/assets/images/shop-gallery-3.webp',
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

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(['.shop__hero-badge', '.shop__hero-title', '.shop__gallery', '.shop__details'], { opacity: 1, y: 0, x: 0 });
      return;
    }

    gsap.fromTo('.shop__hero-badge', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.8, delay: 0.2, ease: 'power4.out' });
    gsap.fromTo('.shop__hero-title', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.8, delay: 0.3, ease: 'power4.out' });
    gsap.fromTo('.shop__gallery', { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 1.8, delay: 0.4, ease: 'power4.out' });
    gsap.fromTo(
      ['.shop__details-header', '.shop__details-price', '.shop__details-color', '.shop__details-quantity', '.shop__details-includes'], 
      { x: 60, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 1.8, delay: 0.5, ease: 'power4.out' }
    );

  }, { scope: shopRef });

  return (
    <article className="shop" ref={shopRef}>
      <section className='shop__wrapper section-lg'>
        <div className="shop__intro">
          <div className="shop__intro-badge">Pre-order</div>
          <h1 className="shop__intro-title">Make It Yours</h1>
        </div>
      
        <section className="shop__content">
          <ShopGallery 
            products={products}
            activeColorIndex={activeColorIndex}
            setActiveColorIndex={setActiveColorIndex}
            handlePrevSlide={handlePrevSlide}
            handleNextSlide={handleNextSlide}
          />
          <ShopDetails 
            products={products}
            activeColorIndex={activeColorIndex}
            setActiveColorIndex={setActiveColorIndex}
            quantity={quantity}
            handleDecrease={handleDecrease}
            handleIncrease={handleIncrease}
            boxItems={boxItems}
          />
        </section>
      </section>
    </article>
  );
};

export default ShopPage;
