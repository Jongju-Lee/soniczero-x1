import React, { useEffect, useState } from 'react';

const ToastItem = ({ toast, removeToast, depth }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // 마운트 직후 transition 유발을 위해 짧은 딜레이 후 활성화
    const mountTimer = setTimeout(() => {
      setIsMounted(true);
    }, 10);

    // 3초 후 퇴장 시작
    const leaveTimer = setTimeout(() => {
      setIsLeaving(true);
    }, 3000);

    return () => {
      clearTimeout(mountTimer);
      clearTimeout(leaveTimer);
    };
  }, []);

  useEffect(() => {
    // 퇴장 상태가 되면 0.3초(CSS transition 시간) 후 실제 DOM에서 제거
    if (isLeaving) {
      const cleanupTimer = setTimeout(() => {
        removeToast(toast.id);
      }, 300);
      return () => clearTimeout(cleanupTimer);
    }
  }, [isLeaving, removeToast, toast.id]);

  // 상위 3개 초과 혹은 퇴장 중인 항목은 스크린 리더에서 제외
  const isHiddenFromReader = depth >= 3 || isLeaving;

  return (
    <div 
      className={`toast-item ${!isMounted ? 'toast-entering' : ''}`} 
      role="alert"
      aria-hidden={isHiddenFromReader ? 'true' : undefined}
      style={{ '--toast-depth': depth }}
    >
      <div className="toast-item__icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24" aria-hidden="true">
          <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="toast-item__content">
        <strong className="toast-item__title">다운로드 시작됨</strong>
        <p className="toast-item__desc">{toast.description}</p>
      </div>
    </div>
  );
};

export default ToastItem;
