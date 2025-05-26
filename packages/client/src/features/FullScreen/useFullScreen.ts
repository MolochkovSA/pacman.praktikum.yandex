import { useEffect, useState } from 'react';

export const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(window.innerHeight === screen.height);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  useEffect(() => {
    const updateFullscreenState = () => {
      const isDomFullscreen = !!document.fullscreenElement;
      const isNativeFullscreen = window.innerHeight === screen.height;
      setIsFullscreen(isDomFullscreen || isNativeFullscreen);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', updateFullscreenState);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', updateFullscreenState);
    };
  }, []);

  return { isFullscreen, toggleFullscreen };
};
