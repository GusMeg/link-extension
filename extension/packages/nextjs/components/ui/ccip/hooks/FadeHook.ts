import { useEffect, useState } from "react";

// Custom Hook to handle opacity animation
export const useFade = (duration: number, fadeIn: boolean) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    let start: number;
    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      let newOpacity = Math.min(progress / duration, 1);
      if (!fadeIn) {
        newOpacity = 1 - newOpacity;
      }
      setOpacity(newOpacity);
      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [duration, fadeIn]);

  return opacity;
};

//Helper function for animating opacity
export const hexToRgba = (hex: string, opacity: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
