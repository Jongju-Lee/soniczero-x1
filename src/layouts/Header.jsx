import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Button from '../components/ui/Button';

const Header = () => {
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
        </div>
      </nav>
    </header>
  );
};

export default Header;
