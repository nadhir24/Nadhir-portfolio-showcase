const Hero3D = () => {
    return (
        <div
            aria-hidden="true"
            style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1,
                pointerEvents: "none",
                overflow: "hidden",
            }}
        >
            {/* Main glowing orb — right side */}
            <div
                style={{
                    position: "absolute",
                    right: "8%",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "clamp(300px, 35vw, 520px)",
                    height: "clamp(300px, 35vw, 520px)",
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle at 35% 35%, #a8eddc 0%, #5AE8C6 30%, #38bfa1 60%, rgba(56,191,161,0.15) 80%, transparent 100%)",
                    filter: "blur(2px)",
                    animation: "hero-orb-float 6s ease-in-out infinite",
                    boxShadow: "0 0 80px 20px rgba(90,232,198,0.25), 0 0 200px 60px rgba(90,232,198,0.10)",
                }}
            />

            {/* Secondary smaller orb — left accent */}
            <div
                style={{
                    position: "absolute",
                    left: "5%",
                    top: "20%",
                    width: "clamp(80px, 10vw, 160px)",
                    height: "clamp(80px, 10vw, 160px)",
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle at 40% 40%, #c8f7ec 0%, #5AE8C6 50%, transparent 100%)",
                    filter: "blur(8px)",
                    animation: "hero-orb-float 8s ease-in-out infinite reverse",
                    opacity: 0.45,
                }}
            />

            {/* Tertiary orb — bottom right accent */}
            <div
                style={{
                    position: "absolute",
                    right: "15%",
                    bottom: "15%",
                    width: "clamp(60px, 8vw, 120px)",
                    height: "clamp(60px, 8vw, 120px)",
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle at 40% 40%, #e8d5f7 0%, #b07ae8 50%, transparent 100%)",
                    filter: "blur(10px)",
                    animation: "hero-orb-float 10s ease-in-out infinite",
                    opacity: 0.35,
                    animationDelay: "-3s",
                }}
            />

            <style>{`
                @keyframes hero-orb-float {
                    0%   { transform: translateY(-50%) scale(1); }
                    50%  { transform: translateY(calc(-50% - 18px)) scale(1.04); }
                    100% { transform: translateY(-50%) scale(1); }
                }
            `}</style>
        </div>
    );
};

export default Hero3D;
