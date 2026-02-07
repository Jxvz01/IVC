import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ArrowLeft } from 'lucide-react';



const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const links = [
        { name: 'Home', id: 'home' },
        { name: 'About', id: 'about' },
        { name: 'Domains', id: 'domains' },
        { name: 'Projects', id: 'projects' },
        { name: 'Events', id: 'events' },
        { name: 'Achievements', id: 'achievements' },
        { name: 'Team', id: 'team' },
        { name: 'Join IVC', id: 'join' },
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
            setActiveSection(id);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = links.map(link => document.getElementById(link.id));
            const scrollPosition = window.scrollY + 100; // Offset for navbar

            for (const section of sections) {
                if (section && section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
                    setActiveSection(section.id);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="fixed left-1/2 -translate-x-1/2 z-50 top-6 w-[95%] max-w-7xl">
            {/* Main Navbar Bar - Hidden on mobile if menu is open */}
            <div className={`
                bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-2xl items-center justify-between px-6 py-3
                ${isOpen ? 'hidden md:flex' : 'flex'}
            `}>
                <button onClick={() => scrollToSection('home')} className="flex items-center space-x-3 rtl:space-x-reverse bg-transparent border-none cursor-pointer group">
                    <img src="/logo.png" className="h-10 w-auto group-hover:scale-110 transition-transform duration-300" alt="IVC Logo" />
                    <span className="self-center text-2xl font-black tracking-tighter whitespace-nowrap text-gradient">IVC</span>
                </button>
                <div className="flex md:hidden rtl:space-x-reverse">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="inline-flex items-center p-2 w-12 h-12 justify-center text-ivc-text rounded-xl hover:bg-white/10 transition-colors"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Menu size={28} />
                    </button>
                </div>

                <div className="hidden md:flex md:w-auto md:order-1">
                    <ul className="flex flex-row space-x-8 bg-transparent">
                        {links.map((link) => (
                            <li key={link.name}>
                                <button
                                    onClick={() => scrollToSection(link.id)}
                                    className={`block py-2 transition-all uppercase text-[10px] tracking-[0.3em] font-black ${activeSection === link.id
                                        ? 'text-ivc-secondary text-glow'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    {link.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Mobile Menu Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-[55] md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Mobile Menu Sidebar (Right Side) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 40 }}
                        className="fixed top-6 right-6 w-[280px] z-[60] md:hidden"
                    >
                        <div className="w-full relative group">
                            {/* Glass Panel */}
                            <div
                                className="w-full bg-white/[0.01] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)] relative flex flex-col border border-white/10 rounded-[32px] overflow-hidden transform-gpu"
                                style={{ backfaceVisibility: 'hidden' }}
                            >
                                <div
                                    className="absolute inset-0 backdrop-blur-3xl bg-black/10 -z-10"
                                    style={{ willChange: 'backdrop-filter' }}
                                />

                                {/* Glossy Reflection Effect */}
                                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />

                                {/* Close Button */}
                                <div className="flex justify-end mb-6 relative z-10">
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-2 text-white/50 hover:text-white transition-colors"
                                    >
                                        <ArrowLeft size={24} className="rotate-180" />
                                    </button>
                                </div>

                                {/* Menu content */}
                                <ul className="flex flex-col space-y-4 relative z-10 w-full text-right">
                                    {links.map((link, index) => (
                                        <motion.li
                                            key={link.name}
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.03 }}
                                        >
                                            <button
                                                onClick={() => {
                                                    scrollToSection(link.id);
                                                }}
                                                className={`block w-full text-right text-[15px] font-black tracking-[0.2em] transition-all uppercase ${activeSection === link.id
                                                    ? 'text-ivc-secondary text-glow -translate-x-1'
                                                    : 'text-white/70 hover:text-white hover:-translate-x-1'
                                                    }`}
                                            >
                                                {link.name}
                                            </button>
                                        </motion.li>
                                    ))}
                                </ul>

                                {/* Bottom Elements */}
                                <div className="mt-8 pt-8 border-t border-white/10 flex flex-col items-center relative z-10">
                                    <img src="/logo.png" className="h-14 w-auto mb-4 opacity-100 brightness-110 contrast-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" alt="" />
                                    <div className="text-[10px] tracking-[0.2em] text-white/90 uppercase font-black text-center whitespace-nowrap">
                                        Ideate . Visualize . Create
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
