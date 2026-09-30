"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function HeroScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const opacity = useTransform(scrollYProgress, [0, 0.55, 0.9], [1, 0.9, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const filter = useTransform(scrollYProgress, [0.4, 1], ["blur(0px)", "blur(10px)"]);

  return (
    <div ref={ref} className={reduce ? "relative" : "relative [@media(min-width:768px)_and_(min-height:640px)]:h-[170vh]"}>
      <div className={reduce ? "" : "[@media(min-width:768px)_and_(min-height:640px)]:sticky [@media(min-width:768px)_and_(min-height:640px)]:top-0 [@media(min-width:768px)_and_(min-height:640px)]:flex [@media(min-width:768px)_and_(min-height:640px)]:h-screen [@media(min-width:768px)_and_(min-height:640px)]:items-center"}>
        <motion.div className="w-full" style={reduce ? undefined : { scale, opacity, y, filter }}>
          {children}
        </motion.div>
      </div>
    </div>
  );
}
