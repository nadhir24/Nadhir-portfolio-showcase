import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

/**
 * Returns a `navigateTo(path)` function that GSAP-animates the page
 * content out (fade + slide up) before changing the route.
 *
 * @param containerRef - ref to the page wrapper element whose direct
 *                        children will be animated.
 */
export function usePageNavigate(containerRef: React.RefObject<HTMLElement | HTMLDivElement | null>) {
    const navigate = useNavigate();

    const navigateTo = useCallback(
        (path: string) => {
            const container = containerRef.current;
            if (!container) {
                navigate(path);
                return;
            }

            // Animate all direct children out, then navigate
            const children = Array.from(container.children) as HTMLElement[];

            gsap.to(children, {
                y: -24,
                opacity: 0,
                stagger: 0.04,
                duration: 0.35,
                ease: "power2.inOut",
                onComplete: () => navigate(path),
            });
        },
        [containerRef, navigate]
    );

    return navigateTo;
}
