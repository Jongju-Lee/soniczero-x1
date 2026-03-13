import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import ToastContainer from '../components/ui/Toast/ToastContainer';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((id, description) => {
    setToasts((prevToasts) => {
      // 동일한 알림 중복 추가 방지
      if (prevToasts.some((t) => t.id === id)) {
        return prevToasts;
      }
      const newToast = { id, description };
      return [...prevToasts, newToast];
    });
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const contextValue = useMemo(() => ({ addToast, removeToast }), [addToast, removeToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
