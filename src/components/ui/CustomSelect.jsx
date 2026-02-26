import React, { useState, useRef, useEffect } from 'react';

/**
 * CustomSelect Component
 * @param {Array} options - [{ value: string, label: string }]
 * @param {string} placeholder - 미선택 시 표시 텍스트
 * @param {function} onChange - 선택 시 콜백 (value)
 * @param {string} value - 현재 선택값 (controlled)
 * @param {string} className - 외부 오버라이드 클래스
 */
const CustomSelect = ({
  options = [],
  placeholder = '선택해 주세요',
  onChange,
  value,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSelect = (optionValue) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
    if (e.key === 'Escape') setIsOpen(false);
  };

  return (
    <div
      className={`c-select${isOpen ? ' c-select--open' : ''}${className ? ` ${className}` : ''}`}
      ref={containerRef}
    >
      {/* 트리거 버튼 */}
      <button
        type="button"
        className={`c-select__trigger${!selectedOption ? ' c-select__trigger--placeholder' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <svg
          className="c-select__chevron"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M4.5 6.75L9 11.25L13.5 6.75"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* 드롭다운 목록 */}
      {isOpen && (
        <ul className="c-select__list" role="listbox">
          {options.map((option) => (
            <li
              key={option.value}
              className={`c-select__option${option.value === value ? ' c-select__option--selected' : ''}`}
              role="option"
              aria-selected={option.value === value}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
