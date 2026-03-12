import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);

    // Use motion values to prevent React re-renders on mouse move
    const dotX = useMotionValue(0);
    const dotY = useMotionValue(0);

    // Smooth springs for the outer circle
    const springX = useSpring(0, { stiffness: 300, damping: 28, mass: 0.5 });
    const springY = useSpring(0, { stiffness: 300, damping: 28, mass: 0.5 });

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            dotX.set(e.clientX - 4);     // Center the 8px dot
            dotY.set(e.clientY - 4);
            springX.set(e.clientX - 16); // Center the 32px circle
            springY.set(e.clientY - 16);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if hovering over interactive elements
            if (
                target.tagName.toLowerCase() === "a" ||
                target.tagName.toLowerCase() === "button" ||
                target.closest("a") ||
                target.closest("button")
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [dotX, dotY, springX, springY]);

    // Handle case for touch devices (no cursor needed)
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    return (
        <>
            <motion.div
                className="cursor-dot"
                style={{
                    position: "fixed",
                    left: 0,
                    top: 0,
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "var(--text)",
                    pointerEvents: "none",
                    zIndex: 9999,
                    x: dotX,
                    y: dotY,
                }}
            />
            <motion.div
                className="cursor-outline"
                style={{
                    position: "fixed",
                    left: 0,
                    top: 0,
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    border: "2px solid var(--text)",
                    pointerEvents: "none",
                    zIndex: 9998,
                    x: springX,
                    y: springY,
                    opacity: 0.4,
                }}
                animate={{
                    scale: isHovering ? 1.8 : 1,
                    opacity: isHovering ? 0.8 : 0.4,
                    backgroundColor: isHovering ? "rgba(100, 255, 218, 0.2)" : "transparent",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
            <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
        </>
    );
};

export default CustomCursor;
