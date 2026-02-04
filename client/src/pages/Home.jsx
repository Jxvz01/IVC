import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import logo from '../assets/logo.png';
import LiquidButton from '../components/LiquidButton';

const Home = () => {
    const tagline = "IDEATE VISUALIZE CREATE";
    const words = tagline.split(" ");

    return (
        <div className="relative isolate min-h-screen flex items-center justify-center px-4 py-20">
            <div className="mx-auto max-w-7xl relative z-10 w-full h-full flex flex-col justify-center">
                <div className="relative max-w-5xl mx-auto w-full p-8 md:p-16 lg:p-24 group min-h-[70vh] flex flex-col justify-center">
                    {/* Glass Card Background - Animates In separately */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        className="liquid-glass absolute inset-0 rounded-[32px] md:rounded-[40px] overflow-hidden"
                    >
                        {/* Inner Reflection Glow */}
                        <div className="absolute top-[-20%] left-[-10%] w-full h-[300px] bg-white/5 blur-[80px] rounded-full skew-y-12 transition-transform duration-1000 group-hover:translate-x-full"></div>
                        {/* Bottom floating accent */}
                        <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-ivc-primary/10 blur-[100px] rounded-full"></div>
                    </motion.div>

                    <div className="relative z-10 text-center flex flex-col items-center justify-center h-full">
                        <div className="flex justify-center mb-8 md:mb-12">
                            <div className="relative">
                                <motion.img
                                    layoutId="main-logo"
                                    src="/logo_loading.png"
                                    alt="IVC Logo"
                                    className="relative w-24 h-24 md:w-36 md:h-36 drop-shadow-liquid"
                                />
                            </div>
                        </div>

                        <h1 className="text-4xl font-black tracking-tighter text-white sm:text-7xl md:text-8xl mb-6 md:mb-8 leading-[0.9]">
                            {words.map((word, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, filter: 'blur(15px)', y: 30 }}
                                    animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                                    transition={{ delay: 0.3 + (i * 0.1), type: "spring", stiffness: 100 }}
                                    className="inline-block mr-4 text-gradient bg-clip-text"
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                        >
                            <p className="text-lg md:text-2xl font-bold tracking-tight text-white/90 max-w-2xl mx-auto leading-tight px-4">
                                Empower <span className="text-ivc-secondary text-glow">Students</span> through innovation, collaboration, and creativity.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            className="mt-10 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 w-full px-4"
                        >
                            <LiquidButton
                                onClick={() => document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' })}
                                variant="glass"
                                className="w-full sm:w-auto"
                            >
                                Get Started <ArrowRight size={18} />
                            </LiquidButton>

                            <LiquidButton
                                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                                variant="glass"
                                className="w-full sm:w-auto"
                            >
                                Explore Work
                            </LiquidButton>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home
