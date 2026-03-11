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
  id,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef(null);
  const listRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value);
  // id prop을 기준으로 옵션 id 접두사 생성
  const optionIdPrefix = id ? `${id}-option` : 'c-select-option';

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

  useEffect(() => {
    let rafId1;
    let rafId2;
    let timerId;
    if (isOpen) {
      setIsVisible(true);
      // 열릴 때: 현재 선택된 옵션으로 인덱스 초기화 (없으면 0번째로)
      const selectedIndex = options.findIndex(opt => opt.value === value);
      setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
      rafId1 = requestAnimationFrame(() => {
        rafId2 = requestAnimationFrame(() => setIsOpening(true));
      });
    } else {
      setIsOpening(false);
      setFocusedIndex(-1);
      timerId = setTimeout(() => setIsVisible(false), 600);
    }
    return () => {
      cancelAnimationFrame(rafId1);
      cancelAnimationFrame(rafId2);
      clearTimeout(timerId);
    };
  }, [isOpen]);

  // focusedIndex 변경 시 해당 옵션을 스크롤하여 화면에 표시 (긴 목록 대비)
  useEffect(() => {
    if (!isOpen || focusedIndex < 0 || !listRef.current) return;
    const optionEl = listRef.current.querySelector(`#${optionIdPrefix}-${focusedIndex}`);
    optionEl?.scrollIntoView({ block: 'nearest' });
  }, [focusedIndex, isOpen]);

  const handleSelect = (optionValue) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        // 열릴 상태에서 Enter/Space: 현재 focusedIndex 옵션 선택
        if (isOpen && focusedIndex >= 0) {
          handleSelect(options[focusedIndex].value);
        } else {
          setIsOpen(prev => !prev);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setFocusedIndex(prev => Math.min(prev + 1, options.length - 1));
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Home':
        e.preventDefault();
        setFocusedIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setFocusedIndex(options.length - 1);
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={`c-select${isOpen ? ' c-select--open' : ''}${className ? ` ${className}` : ''}`}
      ref={containerRef}
    >
      {/* 트리거 버튼 */}
      <button
        type="button"
        id={id}
        className={`c-select__trigger${!selectedOption ? ' c-select__trigger--placeholder' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-activedescendant={isOpen && focusedIndex >= 0 ? `${optionIdPrefix}-${focusedIndex}` : undefined}
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
      {isVisible && (
        <ul className={`c-select__list${isOpening ? ' is-opening' : ''}`} role="listbox" ref={listRef}>
          {options.map((option, index) => (
            <li
              key={option.value}
              id={`${optionIdPrefix}-${index}`}
              className={`c-select__option${option.value === value ? ' c-select__option--selected' : ''}${focusedIndex === index ? ' c-select__option--focused' : ''}`}
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
