"use client";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 900);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  if (!show) return null;
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0 })}
      aria-label="Back to top"
      className="btn btn-secondary fixed bottom-5 right-5 z-30 !min-h-11 !min-w-11 !rounded-full !p-0 shadow-lg"
    >
      <ArrowUp className="h-5 w-5" aria-hidden />
    </button>
  );
}
