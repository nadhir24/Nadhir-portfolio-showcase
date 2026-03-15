import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import AnimatedBlobs from "@/components/AnimatedBlobs";
import CustomCursor from "@/components/CustomCursor";
import { AnimatePresence } from "framer-motion";

const Layout = () => {
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("theme");
            if (saved) return saved === "dark";
            return window.matchMedia("(prefers-color-scheme: dark)").matches;
        }
        return false;
    });
    const location = useLocation();

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");
    }, [isDark]);

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div style={{ minHeight: "100vh", position: "relative" }}>
            <CustomCursor />
            <AnimatedBlobs />
            <Navbar isDark={isDark} onToggleTheme={() => setIsDark((d) => !d)} />
            <main>
                <AnimatePresence mode="wait">
                    <div key={location.pathname}>
                        <Outlet />
                    </div>
                </AnimatePresence>
            </main>
        </div>
    );
};

export default Layout;
