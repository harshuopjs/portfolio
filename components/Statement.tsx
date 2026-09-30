"use client";
import { motion, type MotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const text = "Real-time systems. Secure authentication. Encrypted peer-to-peer software. Built end to end, from the database to the screen.";
const accent = new Set(["Real-time", "Secure", "Encrypted", "end"]);

function Word({ word, i, n, p, on }: { word: string; i: number; n: number; p: MotionValue<number>; on: boolean }) {
  const start = (i / n) * 0.8;
  const opacity = useTransform(p, [start, start + 0.12], [0.14, 1]);
  const isAccent = accent.has(word.replace(/[.,]/g, ""));
  return (
    <motion.span style={on ? { opacity } : undefined} className={`mr-[0.25em] inline-block ${isAccent ? "text-accent-fg" : ""}`}>
      {word}
    </motion.span>
  );
}

export function Statement() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.6"] });
  const words = text.split(" ");

  return (
    <div ref={ref} className={reduce ? "relative py-24" : "relative [@media(min-height:560px)]:h-[230vh]"} role="group" aria-label={text}>
      <div className={reduce ? "container-page" : "container-page [@media(min-height:560px)]:sticky [@media(min-height:560px)]:top-0 [@media(min-height:560px)]:flex [@media(min-height:560px)]:h-screen [@media(min-height:560px)]:items-center"}>
        <p className="display max-w-5xl text-[clamp(2.2rem,6vw,5rem)] leading-[1.08]" aria-hidden>
          {words.map((w, i) => (
            <Word key={i} word={w} i={i} n={words.length} p={scrollYProgress} on={!reduce} />
          ))}
        </p>
      </div>
    </div>
  );
}
