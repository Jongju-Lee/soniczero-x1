import React from 'react';
import { createPortal } from 'react-dom';
import ToastItem from './ToastItem';

const ToastContainer = ({ toasts, removeToast }) => {
  if (typeof document === 'undefined') return null;

  // Portal을 통해 Body 최상단 등 특정 위치에 렌더링 (Z-index 및 레이아웃 제약 방지)
  const portalRoot = document.getElementById('toast-root') || document.body;

  return createPortal(
    <div className="toast-container" aria-live="polite" aria-atomic="true">
      {toasts.map((toast, index) => {
        // 가장 최근 추가된 토스트가 depth 0이 되도록 인덱스 계산
        const depth = toasts.length - 1 - index;
        return (
          <ToastItem 
            key={toast.id} 
            toast={toast} 
            removeToast={removeToast} 
            depth={depth} 
          />
        );
      })}
    </div>,
    portalRoot
  );
};

export default ToastContainer;
