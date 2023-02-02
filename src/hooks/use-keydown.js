import { useEffect, useRef } from "react";

function useKeyDown(key, handler) {
  const handlerRef = useRef();
  handlerRef.current = handler;

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === key) handlerRef?.current?.(event);
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}

export default useKeyDown;
