import { useEffect } from "react";

/* Closes a popover on Escape or on a click outside of `ref` */
export default function useDismiss(ref, isOpen, onDismiss) {
  useEffect(() => {
    if (!isOpen) return;

    const handlePointer = (event) => {
      if (ref.current && !ref.current.contains(event.target)) onDismiss();
    };
    const handleKey = (event) => {
      if (event.key === "Escape") onDismiss();
    };

    document.addEventListener("pointerdown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("pointerdown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [ref, isOpen, onDismiss]);
}
