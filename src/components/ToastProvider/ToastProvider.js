import React, { useMemo, useState, createContext } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useContext } from "react";

const ToastContext = createContext(undefined);

function createToast(message, variant) {
  return { id: crypto.randomUUID(), message, variant };
}

export function useToastContext() {
  const value = useContext(ToastContext);
  if (!value) throw new Error('Missing ToastProvider :(');
  return value;
}

export function useToasts() {
  const { toasts } = useToastContext();
  return toasts;
}

function useEscape(handler) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === 'Escape') handler();
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handler]);
}

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([createToast('test 123', 'warning')]);

  const value = useMemo(() => {
    function addToast(message, variant) {
      setToasts(t => [...t, createToast(message, variant)]);
    }

    function dismissToast(id) {
      setToasts(t => t.filter(i => i.id !== id));
    }
    return { toasts, addToast, dismissToast };
  }, [toasts])

  useEscape(useCallback(() => setToasts([]), []));

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export default ToastProvider;
