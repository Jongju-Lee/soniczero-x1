import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
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

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
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

  return (
    <section className="shop" ref={shopRef}>
      <div className='shop__inner'>
        <section className="shop__hero">
          <div className="shop__hero-badge">Pre-order</div>
          <h1 className="shop__hero-title">Make It Yours</h1>
        </section>
      
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
      </div>
    </section>
  );
};

export default ShopPage;
