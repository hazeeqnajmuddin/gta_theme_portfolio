"use client";

import { useEffect, useRef } from "react";

export function useInputDeviceMode() {
  const isKeyboardMode = useRef(false);

  useEffect(() => {
    const handleMouseMove = () => {
      isKeyboardMode.current = false;
    };
    const handleKeyDown = () => {
      isKeyboardMode.current = true;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return isKeyboardMode;
}
