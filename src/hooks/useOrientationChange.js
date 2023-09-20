import { useEffect } from 'react';

export function useOrientationChange(callback, delay = 200) {
  useEffect(() => {
    const handleOrientationChange = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        callback();
      }, delay);
    };

    let resizeTimeout;

    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [callback, delay]);
};
