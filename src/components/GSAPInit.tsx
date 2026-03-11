import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger, useGSAP);

export const GSAPInit = () => {
    useEffect(() => {
        // Optional globally shared GSAP settings
        gsap.defaults({
            ease: "power3.out",
        });

        // Refresh ScrollTrigger on route changes or layout shifts
        ScrollTrigger.refresh();

        // This is a simple cleanup just to be safe, though global registration usually doesn't need it.
        return () => {
            ScrollTrigger.killAll();
        };
    }, []);

    return null; // This component handles side effects only
};
