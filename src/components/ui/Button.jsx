import React from 'react';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../../hooks/useScrollTriggerCleanup';

/**
 * Button Component
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {string} variant - 'primary' | 'outline' | 'glow'
 * @param {string} to - React Router Link path (renders <Link> if provided)
 * @param {string} className - additional class for layout overrides
 * @param {React.ReactNode} children
 */
const Button = ({
  size = 'md',
  variant = 'primary',
  to,
  className = '',
  children,
  onClick,
  ...rest
}) => {
  // to prop이 있는 경우: 즉시 스크롤 초기화 후 외부 onClick 실행
  const handleLinkClick = (e) => {
    scrollToTop();
    if (onClick) onClick(e);
  };
  const classes = `btn btn--${size} btn--${variant}`;

  // glow variant: shimmer를 올바르게 클리핑하기 위해 wrapper 필요
  if (variant === 'glow') {
    const inner = to
      ? <Link to={to} className={classes} onClick={handleLinkClick} {...rest}>{children}</Link>
      : <button type="button" className={classes} onClick={onClick} {...rest}>{children}</button>;

    return (
      <div className={`btn-glow-wrap${className ? ` ${className}` : ''}`}>
        {[...Array(5)].map((_, i) => (
          <span key={i} aria-hidden="true" className={`btn-glow-sparkle btn-glow-sparkle--${i + 1}`} />
        ))}
        {inner}
      </div>
    );
  }

  const baseClasses = `btn btn--${size} btn--${variant}${className ? ` ${className}` : ''}`;

  if (to) {
    return (
      <Link to={to} className={baseClasses} onClick={handleLinkClick} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={baseClasses} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default Button;
