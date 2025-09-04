// hooks/useIsAtBottom.ts
import { useState, useEffect, RefObject } from "react";

export const useIsAtBottom = (
  elementRef: RefObject<HTMLElement | null>,
  offset = 0
) => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = elementRef.current;
      if (!element) return;

      const currentPosition = element.scrollTop + element.clientHeight;
      const totalHeight = element.scrollHeight;

      if (currentPosition >= totalHeight - offset) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }
    };

    const element = elementRef.current;
    if (element) {
      element.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (element) {
        element.removeEventListener("scroll", handleScroll);
      }
    };
  }, [elementRef, offset]);

  return isAtBottom;
};
