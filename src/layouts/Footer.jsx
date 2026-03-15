import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const isShopPage = location.pathname === '/shop';

  return (
    <footer className={`footer ${isShopPage ? 'footer--has-bottom-bar' : ''}`}>
      <div className="container footer__inner">
        
        {/* Top Footer Area */}
        <div className="footer__top">
          <div className="footer__brand">
            <h3 className="footer__brand-title">SonicZero</h3>
            <p className="footer__brand-desc">
              정적의 미래<br />  
              완벽을 위해 설계된 프리미엄 오디오.
            </p>
          </div>

          <div className="footer__links">
            <div className="footer__nav-group">
              <h4 className="footer__nav-title">Product</h4>
              <ul className="footer__nav-list">
                <li className="footer__nav-item"><Link to="/technology" className="footer__nav-link">Technology</Link></li>
                <li className="footer__nav-item"><Link to="/specs" className="footer__nav-link">Specifications</Link></li>
                <li className="footer__nav-item"><Link to="/shop" className="footer__nav-link">Shop</Link></li>
              </ul>
            </div>

            <div className="footer__nav-group">
              <h4 className="footer__nav-title">Support</h4>
              <ul className="footer__nav-list">
                <li className="footer__nav-item"><Link to="/support" className="footer__nav-link">문의하기</Link></li>
                <li className="footer__nav-item"><Link to="/support" className="footer__nav-link">자주 묻는 질문</Link></li>
                <li className="footer__nav-item"><Link to="/support" className="footer__nav-link">보증 안내</Link></li>
                <li className="footer__nav-item"><Link to="/support" className="footer__nav-link">반품 / 환불</Link></li>
              </ul>
            </div>

            <div className="footer__nav-group">
              <h4 className="footer__nav-title">Legal</h4>
              <ul className="footer__nav-list">
                <li className="footer__nav-item">
                  <button className="footer__nav-link" aria-label="개인정보 처리방침 (준비 중인 페이지)" disabled>개인정보 처리방침</button>
                </li>
                <li className="footer__nav-item">
                  <button className="footer__nav-link" aria-label="이용약관 (준비 중인 페이지)" disabled>이용약관</button>
                </li>
                <li className="footer__nav-item">
                  <button className="footer__nav-link" aria-label="쿠키 정책 (준비 중인 페이지)" disabled>쿠키 정책</button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Footer Area */}
        <div className="footer__bottom">
          <p className="footer__copyright">© 2026 SonicZero. All rights reserved.</p>
          <p className="footer__made">웹 퍼블리셔 이 종 주 </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
