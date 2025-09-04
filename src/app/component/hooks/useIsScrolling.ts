// hooks/useIsScrolling.ts
import { useState, useEffect, RefObject } from "react";

export const useIsScrolling = (elementRef: RefObject<HTMLElement | null>) => {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let timeout: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      setIsScrolling(true);
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    // Attach the scroll event listener to the referenced element
    element.addEventListener("scroll", handleScroll);

    // Clean up the event listener and timeout on unmount
    return () => {
      element.removeEventListener("scroll", handleScroll);
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [elementRef]); // Re-run effect if the element reference changes

  return isScrolling;
};
