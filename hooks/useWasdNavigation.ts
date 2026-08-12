import { useEffect, RefObject } from "react";
import { gtaSound } from "@/utils/gtaSounds";

// Extend the generic type to optionally include the directional nav routing
export function useWasdNavigation<
  T extends { 
    id: string; 
    nav?: { w?: string; a?: string; s?: string; d?: string } 
  }
>(
  items: T[],
  setActiveItem: React.Dispatch<React.SetStateAction<T>>,
  carouselRef?: RefObject<HTMLDivElement | null>,
  isDisabled: boolean = false
) {
  useEffect(() => {
    if (isDisabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
        e.preventDefault(); // Prevent page scroll
        
        setActiveItem((prevItem) => {
          const currentIndex = items.findIndex((item) => item.id === prevItem.id);
          let nextIndex = currentIndex;
          
          // Determine next index based on explicit 2D grid routing OR 1D linear fallback
          if (prevItem.nav) {
            // 2D Grid Mode: Use explicit directional targets
            let targetId: string | undefined = undefined;
            if (key === "w" || key === "arrowup") targetId = prevItem.nav.w;
            if (key === "a" || key === "arrowleft") targetId = prevItem.nav.a;
            if (key === "s" || key === "arrowdown") targetId = prevItem.nav.s;
            if (key === "d" || key === "arrowright") targetId = prevItem.nav.d;

            if (targetId) {
              const foundIndex = items.findIndex((item) => item.id === targetId);
              if (foundIndex !== -1) {
                nextIndex = foundIndex;
              }
            } else {
              // Direction is not mapped (e.g. boundary edge) -> stay on current card
              nextIndex = currentIndex;
            }
          } else {
            // 1D Array Fallback (Linear Next/Prev for carousels without nav object)
            if (key === 'w' || key === 'a' || key === 'arrowup' || key === 'arrowleft') {
              nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
            } else {
              nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
            }
          }
          
          if (nextIndex !== currentIndex) {
            gtaSound.playHover();
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
  }, [items, setActiveItem, carouselRef, isDisabled]);
}