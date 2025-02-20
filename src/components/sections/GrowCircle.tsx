"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const GrowCircle = () => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);


  useGSAP(
    () => {
      if (
        !containerRef.current ||
        !titleRef.current ||
        !markRef.current ||
        !dotRef.current
      )
        return;

      // Initial dot setup
      gsap.set(dotRef.current, {
        width: "142vmax",
        height: "142vmax",
        xPercent: -50,
        yPercent: -50,
        top: "50%",
        left: "50%",
        scale: 0.01, // Start very small
      });

      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%",
          markers: true,
          scrub: 1.5,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "none" },
      });

      tl1
        .to(titleRef.current, { 
          opacity: 1,
          duration: 0.3
        })
        .fromTo(
          dotRef.current,
          {
            x: () => {
              const markBounds = markRef.current!.getBoundingClientRect();
              const containerBounds = containerRef.current!.getBoundingClientRect();
              return markBounds.left + markBounds.width * 0.54 - containerBounds.width / 2;
            },
            y: () => {
              const markBounds = markRef.current!.getBoundingClientRect();
              const containerBounds = containerRef.current!.getBoundingClientRect();
              return markBounds.top + markBounds.height * 0.73 - containerBounds.height / 2;
            },
            scale: 0.01,
          },
          {
            x: 0,
            y: 0,
            scale: 1,
            ease: "power3.in",
            duration: 1,
          }
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="section"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      ref={containerRef}
    >
      <img
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="https://lumiere-a.akamaihd.net/v1/images/sa_pixar_virtualbg_coco_16x9_9ccd7110.jpeg"
        alt="Background"
      />
      <p
        id="title"
        className="text-8xl text-center relative font-black text-white opacity-0 z-10"
        ref={titleRef}
      >
        TITLE <span ref={markRef}>?</span>
      </p>
      <div
        className="dot bg-white rounded-full absolute pointer-events-none"
        ref={dotRef}
      ></div>
    </section>
  );
};

export default GrowCircle;