"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const GrowImageCircle = () => {
  const containerRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const initialContentRef = useRef<HTMLDivElement>(null);
  const finalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useGSAP(
    () => {
      if (
        !containerRef.current ||
        !imageWrapperRef.current ||
        !circleRef.current ||
        !initialContentRef.current ||
        !finalContentRef.current
      )
        return;

      // Initial setup
      gsap.set(circleRef.current, {
        width: "220px",
        height: "220px",
        xPercent: -50,
        yPercent: -50,
        top: "50%",
        left: "50%",
        scale: 1,
      });

      gsap.set(finalContentRef.current, {
        opacity: 0,
        scale: 0,
        y: 50,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1.5,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "power2.inOut" },
      });

      tl
        // First phase: Expand the purple background
        .to(circleRef.current, {
          scale: 15,
          duration: 1,
        })
        // Fade out initial content
        .to(
          initialContentRef.current,
          {
            opacity: 0,
            y: -50,
            duration: 0.3,
          },
          0.3
        )
        // Move and scale the image
        .to(
          imageWrapperRef.current,
          {
            scale: 2,
            x: "30vw",
            y: "-10vw",
            borderRadius: "1rem",
            duration: 1,
          },
          0.5
        )
        // Bring in the new content
        .to(
          finalContentRef.current,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
          },
          0.8
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-white"
    >
      {/* Initial content */}
      <div
        ref={initialContentRef}
        className="mb-12 text-center flex flex-col items-center justify-center gap-6"
      >
        <h1 className="text-6xl text-balance text-center font-black text-slate-800">
          BRINGING THE FUTURE TO YOUR HANDS
        </h1>
        <p className="text-balance text-center text-xl text-slate-500 max-w-3xl">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia
          voluptate nihil rem quas, repellat impedit quos aspernatur quae
          pariatur! Dicta!
        </p>
        <button className="bg-purple-500 px-8 py-4 rounded-full font-semibold hover:bg-purple-600 text-white cursor-pointer">
          Read More
        </button>
      </div>

      <div className="relative">
        {/* Purple circle background that will expand */}
        <div
          ref={circleRef}
          className="absolute rounded-full bg-purple-600 pointer-events-none"
        ></div>

        {/* Image container */}
        <div
          ref={imageWrapperRef}
          className="relative w-[200px] h-[200px] rounded-full overflow-hidden z-10"
        >
          <img
            src="/1.jpg"
            alt="Circle Image"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Final content that appears after transition */}
      <div
        ref={finalContentRef}
        className="absolute left-32 top-1/2 -translate-y-1/2 max-w-xl text-white"
      >
        <h2 className="text-5xl font-bold mb-6">Welcome to the Future</h2>
        <p className="text-xl mb-8">
          Experience innovation like never before. Our cutting-edge technology
          transforms the way you interact with the digital world.
        </p>
        <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors">
          Explore More
        </button>
      </div>
    </section>
  );
};

export default GrowImageCircle;
