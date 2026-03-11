import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import AnimatedBlobs from "@/components/AnimatedBlobs";
import CustomCursor from "@/components/CustomCursor";

const Layout = () => {
    const [isDark, setIsDark] = useState(false);
    const location = useLocation();

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark);
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
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
