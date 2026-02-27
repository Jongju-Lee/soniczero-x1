import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const ShopGallery = ({ 
  products, 
  activeColorIndex, 
  setActiveColorIndex, 
  handlePrevSlide, 
  handleNextSlide 
}) => {
  const galleryImgRef = useRef(null);
  const containerRef = useRef(null);

  // 갤러리 이미지 전환 애니메이션
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
       gsap.set(galleryImgRef.current, { opacity: 1, scale: 1, filter: 'blur(0px)' });
       return;
    }

    if (galleryImgRef.current) {
      gsap.fromTo(
        galleryImgRef.current,
        { opacity: 0, scale: 0.96, filter: 'blur(8px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power2.out' }
      );
    }
  }, { dependencies: [activeColorIndex], scope: containerRef });

  return (
    <div className="shop__gallery" ref={containerRef}>
      <div className="shop__gallery-main">
        <button 
          className="shop__gallery-nav shop__gallery-nav--prev" 
          onClick={handlePrevSlide} 
          aria-label="Previous Image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <img 
          ref={galleryImgRef}
          src={products[activeColorIndex].image} 
          alt={`SonicZero X1 ${products[activeColorIndex].name}`} 
          className="shop__gallery-img"
          loading="lazy"
        />
        
        <button 
          className="shop__gallery-nav shop__gallery-nav--next" 
          onClick={handleNextSlide} 
          aria-label="Next Image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="shop__gallery-dots">
          {products.map((_, index) => (
            <button 
              key={index}
              type="button"
              className={`dot ${activeColorIndex === index ? 'active' : ''}`}
              onClick={() => setActiveColorIndex(index)}
              aria-label={`Select Color ${index + 1}`}
            ></button>
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
  );
};

export default ShopGallery;
