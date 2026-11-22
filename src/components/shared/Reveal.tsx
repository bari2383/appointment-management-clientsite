"use client";

import { useEffect, useRef } from "react";

interface RevealProps {
    children: React.ReactNode;
    className?: string;
    /** Delay in milliseconds, useful for staggering siblings. */
    delay?: number;
}

/**
 * Soft scroll-reveal wrapper (opacity + translate only).
 * Content is visible by default, so nothing is hidden if JS fails or the
 * element is already on screen. Respects prefers-reduced-motion.
 */
const Reveal = ({ children, className = "", delay = 0 }: RevealProps) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

        el.dataset.reveal = "hidden";

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.dataset.reveal = "shown";
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            style={delay ? { transitionDelay: `${delay}ms` } : undefined}
            className={`transition-[opacity,translate] duration-700 ease-out data-[reveal=hidden]:translate-y-4 data-[reveal=hidden]:opacity-0 motion-reduce:transition-none ${className}`}
        >
            {children}
        </div>
    );
};

export default Reveal;