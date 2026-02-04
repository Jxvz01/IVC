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
                bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-2xl items-center justify-between px-6 py-3 transition-opacity duration-300
                ${isOpen ? 'opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto md:flex' : 'flex'}
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

            {/* Mobile Menu Sidebar */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed top-0 left-0 h-screen w-[280px] z-[60] md:hidden"
                    >
                        <div className="h-full w-full liquid-glass backdrop-blur-3xl p-6 shadow-2xl relative flex flex-col border-r border-white/10">

                            {/* Back Button (Top Right of Sidebar) */}
                            <div className="flex justify-end mb-8">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-3 bg-white/10 hover:bg-white/20 rounded-full border border-white/10 transition-colors group"
                                >
                                    <ArrowLeft size={24} className="text-white group-hover:-translate-x-1 transition-transform" />
                                </button>
                            </div>

                            {/* Menu content */}
                            <ul className="flex flex-col space-y-6 relative z-10 w-full pl-2">
                                {links.map((link) => (
                                    <motion.li
                                        key={link.name}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <button
                                            onClick={() => {
                                                scrollToSection(link.id);
                                            }}
                                            className={`block text-left text-lg font-black tracking-widest transition-all uppercase ${activeSection === link.id
                                                ? 'text-ivc-secondary text-glow translate-x-2'
                                                : 'text-white/60 hover:text-white hover:translate-x-2'
                                                }`}
                                        >
                                            {link.name}
                                        </button>
                                    </motion.li>
                                ))}
                            </ul>

                            {/* Liquid Gloss Reflection */}
                            <div className="absolute top-[-20%] left-[-20%] w-[150%] h-[50%] bg-white/5 blur-[80px] rounded-full pointer-events-none"></div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
