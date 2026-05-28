import { useSyncExternalStore } from 'react';

/**
 * Custom hook to detect media query matches
 * @param query - Media query string (e.g., "(min-width: 768px)")
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = (callback: () => void) => {
    if (typeof window === 'undefined') {
      return () => {};
    }

    const media = window.matchMedia(query);

    if (media.addEventListener) {
      media.addEventListener('change', callback);
    } else {
      media.addListener(callback);
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', callback);
      } else {
        media.removeListener(callback);
      }
    };
  };

  const getSnapshot = () => (
    typeof window !== 'undefined' && window.matchMedia(query).matches
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
