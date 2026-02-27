import React from 'react';
import Button from '../../components/ui/Button';

const ShopDetails = ({ 
  products, 
  activeColorIndex, 
  setActiveColorIndex, 
  quantity, 
  handleDecrease, 
  handleIncrease, 
  boxItems 
}) => {
  return (
    <div className="shop__details">
      <div className="shop__details-header">
        <h2 className="shop__details-title">SonicZero X1</h2>
        <p className="shop__details-desc">프리미엄 노이즈 캔슬링 헤드폰</p>
      </div>

      <h3 className="shop__details-price">${(399 * quantity).toFixed(2)}</h3>

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
            >
              <img src="/assets/icons/shop-check.svg" className="check-icon" alt="" />
            </button>
          ))}
        </div>
      </div>

      <div className="shop__details-quantity">
        <span className="label">수량</span>
        <div className="quantity-selector">
          <button 
            type="button" 
            onClick={handleDecrease} 
            aria-label="Decrease"
            disabled={quantity <= 1}
          >
            <img 
              src={quantity <= 1 ? "/assets/icons/shop-minus-disabled.svg" : "/assets/icons/shop-minus.svg"} 
              alt="Minus" 
            />
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
          {/* <span>장바구니 담기</span> */}
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
  );
};

export default ShopDetails;
