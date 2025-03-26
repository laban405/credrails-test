import { useState, useEffect } from 'react';

export interface BreakPoints {
  medium: 768;
}

function useScreenWidth({ width }: { width: number }) {
  const [matched, setMatched] = useState(false);
  useEffect(() => {
    function matchMedia() {
      if (window.matchMedia(`(min-width:${width}px)`).matches) {
        setMatched(true);
      } else {
        setMatched(false);
      }
    }

    matchMedia();

    let doit;
    function handleResize() {
      clearTimeout(doit);
      doit = setTimeout(() => {
        matchMedia();
      }, 0);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width]);
  return matched;
}

export { useScreenWidth };
