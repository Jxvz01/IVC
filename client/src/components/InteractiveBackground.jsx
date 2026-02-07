import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const InteractiveBackground = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#05070a]">
            {/* Liquid Light Layer (Static base) */}
            <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-ivc-primary/10 rounded-full blur-[160px] opacity-40 will-change-transform"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-ivc-secondary/10 rounded-full blur-[160px] opacity-40 will-change-transform"></div>

            {/* Mouse Responsive Liquid Glow */}
            <motion.div
                animate={{
                    x: mousePosition.x - 400,
                    y: mousePosition.y - 400,
                }}
                transition={{
                    type: "spring",
                    stiffness: 80,
                    damping: 30,
                    mass: 2
                }}
                className="absolute w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] mix-blend-screen opacity-60 z-10 hidden md:block will-change-transform"
            />

            {/* Dot Grid Overlay - Softened */}
            <div
                className="absolute inset-0 z-20 opacity-[0.1]"
                style={{
                    backgroundImage: `radial-gradient(rgba(99, 102, 241, 0.4) 0.5px, transparent 0.5px)`,
                    backgroundSize: '40px 40px'
                }}
            />

        </div>
    );
};

export default InteractiveBackground;
