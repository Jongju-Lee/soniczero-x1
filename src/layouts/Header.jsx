import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Button from '../components/ui/Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isMenuOpening, setIsMenuOpening] = useState(false);
  const rafRef = useRef(null);
  const timerRef = useRef(null);
  const menuRef = useRef(null);

  // 메뉴 열기
  const handleOpen = () => {
    // 이전 닫힘 타이머 취소 (빠르게 재클릭 시 충돌 방지)
    clearTimeout(timerRef.current);
    cancelAnimationFrame(rafRef.current);

    setIsMenuOpen(true);
    setIsMenuVisible(true);
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = requestAnimationFrame(() => setIsMenuOpening(true));
    });
  };

  // 메뉴 닫기
  const handleClose = () => {
    clearTimeout(timerRef.current);
    cancelAnimationFrame(rafRef.current);

    setIsMenuOpen(false);
    setIsMenuOpening(false);
    timerRef.current = setTimeout(() => setIsMenuVisible(false), 600);
  };

  // ESC 키 닫힘
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // 패널 외부 클릭 시 닫힘
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        handleClose();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isMenuOpen]);

  // 뷰포트 리사이즈 대응 (데스크탑 너비로 늘릴 시 자동 닫힘)
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleResize = () => {
      if (window.innerWidth > 768) handleClose();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // 언마운트 시 타이머/rAF 정리
  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <header className="header">
      {/* Top Banner Area */}
      <div className="header__banner">
      </div>

      {/* Main Navigation Area */}
      <nav className="header__nav">
        <div className="container header__nav-inner">
          <Link to="/" className="header__logo">
            <img src="./assets/icons/logo.svg" alt="SonicZero Logo" className="header__logo-icon" />
            <span className="header__logo-text">SonicZero</span>
          </Link>

          <ul className="header__menu">
            <li className="header__menu-item">
              <NavLink to="/technology" className="header__menu-link">Technology</NavLink>
            </li>
            <li className="header__menu-item">
              <NavLink to="/specs" className="header__menu-link">Specifications</NavLink>
            </li>
            <li className="header__menu-item">
              <NavLink to="/support" className="header__menu-link">Support</NavLink>
            </li>
          </ul>

          <div className="header__actions">
            <Button to="/shop" size="sm" variant="primary">Pre-order</Button>
          </div>

          {/* 햄버거 버튼 (mobile-lg 이하에서만 표시) */}
          <button
            type="button"
            className="header__hamburger"
            onClick={handleOpen}
            aria-label="메뉴 열기"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <img src="./assets/icons/header-menu.svg" alt="" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* 모바일 메뉴 패널 */}
      {isMenuVisible && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="모바일 메뉴"
          className={`header__mobile-menu${isMenuOpening ? ' is-opening' : ''}`}
          ref={menuRef}
        >
          {/* 상단: 로고 + 닫기 버튼 */}
          <div className="header__mobile-menu-top">
            <Link to="/" className="header__logo" onClick={handleClose}>
              <img src="./assets/icons/logo.svg" alt="SonicZero Logo" className="header__logo-icon" />
              <span className='header__logo-text'>SonicZero</span>
            </Link>
            <button
              type="button"
              className="header__mobile-menu-close"
              onClick={handleClose}
              aria-label="메뉴 닫기"
            >
              <img src="./assets/icons/header-menu-close.svg" alt="" aria-hidden="true" />
            </button>
          </div>

          {/* 메뉴 링크 */}
          <nav className="header__mobile-menu-nav" aria-label="모바일 네비게이션">
            <ul className="header__mobile-menu-list">
              <li>
                <NavLink to="/technology" className="header__mobile-menu-link" onClick={handleClose}>
                  Technology
                </NavLink>
              </li>
              <li>
                <NavLink to="/specs" className="header__mobile-menu-link" onClick={handleClose}>
                  Specifications
                </NavLink>
              </li>
              <li>
                <NavLink to="/support" className="header__mobile-menu-link" onClick={handleClose}>
                  Support
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Pre-order 버튼 */}
          <div className="header__mobile-menu-footer">
            <Button to="/shop" size="lg" variant="primary" onClick={handleClose}>Pre-order</Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
