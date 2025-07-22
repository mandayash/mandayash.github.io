import { useEffect, useState } from "react";

export function useMouse(ref: React.RefObject<HTMLElement>) {
  const [mouse, setMouse] = useState({ elementX: 0, elementY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setMouse({
        elementX: e.clientX - rect.left,
        elementY: e.clientY - rect.top,
      });
    };
    const node = ref.current;
    if (node) {
      node.addEventListener("mousemove", handleMouseMove);
      node.addEventListener("mouseleave", () => setMouse({ elementX: 0, elementY: 0 }));
    }
    return () => {
      if (node) {
        node.removeEventListener("mousemove", handleMouseMove);
        node.removeEventListener("mouseleave", () => setMouse({ elementX: 0, elementY: 0 }));
      }
    };
  }, [ref]);

  return [mouse, setMouse] as const;
}