import { useEffect } from "react";
import Lenis from "lenis";

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        // Disable Lenis on mobile — native scroll is smoother and saves battery
        const isMobile = window.matchMedia("(max-width: 767px)").matches;
        if (isMobile) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
};

export default SmoothScroll;
