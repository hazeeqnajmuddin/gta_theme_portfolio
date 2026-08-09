import { useEffect, RefObject } from "react";

// Extend the generic type to optionally include the directional nav routing
export function useWasdNavigation<
  T extends { 
    id: string; 
    nav?: { w?: string; a?: string; s?: string; d?: string } 
  }
>(
  items: T[],
  setActiveItem: React.Dispatch<React.SetStateAction<T>>,
  carouselRef?: RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
        e.preventDefault(); // Prevent page scroll
        
        setActiveItem((prevItem) => {
          const currentIndex = items.findIndex((item) => item.id === prevItem.id);
          let nextIndex = currentIndex;
          
          // 1. Check for explicit 2D grid routing
          let targetId: string | undefined = undefined;
          
          if (prevItem.nav) {
            if (key === "w" || key === "arrowup") targetId = prevItem.nav.w;
            if (key === "a" || key === "arrowleft") targetId = prevItem.nav.a;
            if (key === "s" || key === "arrowdown") targetId = prevItem.nav.s;
            if (key === "d" || key === "arrowright") targetId = prevItem.nav.d;
          }

          // 2. Determine next index based on explicit target OR fallback to 1D linear movement
          if (targetId) {
            const foundIndex = items.findIndex((item) => item.id === targetId);
            if (foundIndex !== -1) {
              nextIndex = foundIndex;
            }
          } else {
            // 1D Array Fallback (Linear Next/Prev)
            // Move backwards
            if (key === 'w' || key === 'a' || key === 'arrowup' || key === 'arrowleft') {
              nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
            } 
            // Move forwards
            else {
              nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
            }
          }
          
          // 3. Carousel auto-scroll logic
          if (carouselRef?.current && nextIndex !== currentIndex) {
            const cardElement = carouselRef.current.children[nextIndex] as HTMLElement;
            if (cardElement) {
              cardElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }
          }
          
          return items[nextIndex];
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items, setActiveItem, carouselRef]);
}