"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function Section({
  id,
  n,
  label,
  title,
  intro,
  children,
}: {
  id: string;
  n: string;
  label: string;
  title: React.ReactNode;
  intro?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.35"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.15, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [70, 0]);
  const titleX = useTransform(scrollYProgress, [0, 1], [-40, 0]);

  return (
    <section ref={ref} id={id} aria-labelledby={`${id}-title`} className="section-pad">
      <motion.div className="container-page" style={reduce ? undefined : { scale, opacity, y }}>
        <div className="flex items-center gap-4">
          <span className="eyebrow">{n}</span>
          <span className="h-px flex-1 bg-line" aria-hidden />
          <span className="eyebrow !text-muted">{label}</span>
        </div>
        <motion.h2 id={`${id}-title`} className="display mt-8 max-w-3xl text-4xl sm:text-6xl" style={reduce ? undefined : { x: titleX }}>
          {title}
        </motion.h2>
        {intro && <p className="mt-5 max-w-xl leading-relaxed text-muted">{intro}</p>}
        <div className="mt-12 sm:mt-16">{children}</div>
      </motion.div>
    </section>
  );
}
