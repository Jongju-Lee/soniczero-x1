import React, { memo, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const ShopGallery = memo(function ShopGallery({ 
  products, 
  activeColorIndex, 
  setActiveColorIndex, 
  handlePrevSlide, 
  handleNextSlide 
}) {
  const galleryImgRef = useRef(null);
  const containerRef = useRef(null);

  // 드래그(스와이프) 처리를 위한 좌표 변수 (리렌더링 방지를 위해 useRef 사용)
  const pointerDownCoords = useRef({ x: null, y: null });

  const handlePointerDown = (e) => {
    // 터치 및 마우스 클릭 시작 지점 X, Y 기록
    pointerDownCoords.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e) => {
    // 시작 좌표가 없으면 무시
    if (pointerDownCoords.current.x === null) return;

    const deltaX = pointerDownCoords.current.x - e.clientX;
    const deltaY = pointerDownCoords.current.y - e.clientY;

    // 세로 스크롤(의도치 않은 터치 빗나감)이 가로 스와이프보다 크다면 무시 (엣지 케이스 방어)
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      pointerDownCoords.current = { x: null, y: null };
      return;
    }

    // 50px 이상 움직였을 제스처 판정
    const SWIPE_THRESHOLD = 50;

    if (deltaX > SWIPE_THRESHOLD) {
      // 오른쪽에서 왼쪽으로 스와이프 -> 다음 상품
      handleNextSlide();
    } else if (deltaX < -SWIPE_THRESHOLD) {
      // 왼쪽에서 오른쪽으로 스와이프 -> 이전 상품
      handlePrevSlide();
    }

    // 좌표 초기화
    pointerDownCoords.current = { x: null, y: null };
  };

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
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power2.out' }
      );
    }
  }, { dependencies: [activeColorIndex], scope: containerRef });

  return (
    <div className="shop__gallery" ref={containerRef}>
      <div 
        className="shop__gallery-main"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => { pointerDownCoords.current = { x: null, y: null }; }}
        onPointerLeave={() => { pointerDownCoords.current = { x: null, y: null }; }}
      >
        <button  
          className="shop__gallery-nav shop__gallery-nav--prev" 
          onClick={handlePrevSlide} 
          aria-label="이전 이미지"
        >
          <img src="/assets/icons/shop-gallery-prev.svg" alt="" aria-hidden="true" />
        </button>
        
        <img 
          ref={galleryImgRef}
          src={products[activeColorIndex].image} 
          alt={`SonicZero X1 ${products[activeColorIndex].name}`} 
          className="shop__gallery-img"
          loading="lazy"
          draggable="false"
        />
        
        <button 
          className="shop__gallery-nav shop__gallery-nav--next" 
          onClick={handleNextSlide} 
          aria-label="다음 이미지"
        >
          <img src="/assets/icons/shop-gallery-next.svg" alt="" aria-hidden="true" />
        </button>
      </div>
      <div className="shop__gallery-thumbs">
        {products.map((product, index) => (
          <button 
            key={index}
            type="button" 
            className={`thumb ${activeColorIndex === index ? 'active' : ''}`} 
            onClick={() => setActiveColorIndex(index)}
            style={{ backgroundImage: `url(${product.thumbImage})`}}
            aria-label={`${product.name} 썸네일`}
            aria-pressed={activeColorIndex === index}
          >
          </button>
        ))}
      </div>
    </div>
  );
});

export default ShopGallery;
