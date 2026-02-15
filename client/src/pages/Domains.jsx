import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';

const DomainCard = ({ title, description }) => {
    const cardRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 150 };
    const rotateX = useSpring(mouseY, springConfig);
    const rotateY = useSpring(mouseX, springConfig);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = (e.clientX - centerX) / (rect.width / 2) * 10;
        const dy = (e.clientY - centerY) / (rect.height / 2) * -10;

        mouseX.set(dx);
        mouseY.set(dy);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.95 }}
            className="group relative p-6 md:p-10 rounded-[28px] md:rounded-[32px] bg-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden cursor-pointer"
        >
            {/* Liquid Highlight Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Shimmer line */}
            <div className="absolute -inset-[100%] bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] opacity-0 group-hover:opacity-100 animate-liquid pointer-events-none" />

            <div className="relative z-10" style={{ transform: "translateZ(50px)" }}>
                <h3 className="text-3xl font-black mb-4 text-white tracking-tighter group-hover:text-ivc-secondary transition-colors">
                    {title}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed font-medium">
                    {description}
                </p>

                <div className="mt-8 flex items-center gap-3 text-ivc-primary font-black tracking-[0.2em] text-[10px] uppercase">
                    Explore Domain
                    <span className="group-hover:translate-x-3 transition-transform duration-300">-&gt;</span>
                </div>
            </div>

            {/* Bottom Glow */}
            <div className="absolute bottom-[-20%] right-[-20%] w-32 h-32 bg-ivc-primary/10 blur-[50px] rounded-full group-hover:bg-ivc-secondary/20 transition-colors" />
        </motion.div>
    );
};

const Domains = () => {
    const domains = [
        { title: 'Web Development', description: 'Crafting high-performance, pixel-perfect digital experiences with modern web technologies.' },
        { title: 'AI & ML', description: 'Building intelligent systems and exploring the depths of neural networks and data science.' },
        { title: 'IoT & Hardware', description: 'Connecting the physical and digital worlds through innovative electronics and smart systems.' },
        { title: 'Entrepreneurship', description: 'Nurturing the next generation of founders through business strategy and innovation.' },
        { title: 'UI/UX Design', description: 'Designing intuitive, aesthetically stunning interfaces that prioritize user experience.' }
    ];

    return (
        <div className="pt-40 pb-24 px-4 max-w-7xl mx-auto min-h-screen">
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-black mb-12 md:mb-20 text-center text-white tracking-tighter"
            >
                Our <span className="text-gradient">Domains</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {domains.map((domain, index) => (
                    <motion.div
                        key={domain.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <DomainCard {...domain} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Domains;
