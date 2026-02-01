import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import logo from '../assets/logo.png';
import LiquidButton from '../components/LiquidButton';

const Home = () => {
    const tagline = "IDEATE VISUALIZE CREATE";
    const words = tagline.split(" ");

    return (
        <div className="relative isolate pt-32 pb-24 min-h-screen flex items-center justify-center">
            <div className="px-4 mx-auto max-w-7xl relative z-10 w-full mt-10">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="liquid-glass max-w-5xl mx-auto rounded-[40px] p-8 md:p-20 relative overflow-hidden group"
                >
                    {/* Inner Reflection Glow */}
                    <div className="absolute top-[-20%] left-[-10%] w-full h-[300px] bg-white/5 blur-[80px] rounded-full skew-y-12 transition-transform duration-1000 group-hover:translate-x-full"></div>

                    <div className="relative z-10 text-center">
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex justify-center mb-12"
                        >
                            <div className="relative">
                                <img src={logo} alt="IVC Logo" className="relative w-28 h-28 md:w-36 md:h-36 drop-shadow-liquid" />
                            </div>
                        </motion.div>

                        <h1 className="text-5xl font-black tracking-tighter text-white sm:text-8xl mb-8 leading-[0.9]">
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
                            <p className="text-xl md:text-2xl font-bold tracking-tight text-white/90 max-w-2xl mx-auto leading-tight">
                                Empower <span className="text-ivc-secondary text-glow">Students</span> through innovation, collaboration, and creativity.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8"
                        >
                            <LiquidButton
                                onClick={() => document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' })}
                                variant="glass"
                            >
                                Get Started <ArrowRight size={18} />
                            </LiquidButton>

                            <LiquidButton
                                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                                variant="glass"
                            >
                                Explore Work
                            </LiquidButton>
                        </motion.div>
                    </div>

                    {/* Bottm floating accent */}
                    <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-ivc-primary/10 blur-[100px] rounded-full"></div>
                </motion.div>
            </div>
        </div>
    )
}
export default Home
