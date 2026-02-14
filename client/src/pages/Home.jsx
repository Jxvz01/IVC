import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const Home = () => {
    const tagline = "IDEATE VISUALIZE CREATE";
    const words = tagline.split(" ");

    return (
        <div className="relative isolate min-h-screen flex items-center justify-center pt-20">
            <div className="px-4 mx-auto max-w-7xl relative z-10 w-full">
                <div className="relative max-w-5xl md:max-w-7xl mx-auto py-32 px-10 md:py-16 md:px-24 group">
                    {/* Glass Card Background - Animates In separately */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        className="liquid-glass absolute inset-0 rounded-2xl overflow-hidden"
                    >
                        {/* Inner Reflection Glow */}
                        <div className="absolute top-[-20%] left-[-10%] w-full h-[300px] bg-white/5 blur-[80px] rounded-full skew-y-12 transition-transform duration-1000 group-hover:translate-x-full"></div>
                        {/* Bottom floating accent */}
                        <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-ivc-primary/10 blur-[100px] rounded-full"></div>
                    </motion.div>

                    <div className="relative z-10 text-center">
                        <div className="flex justify-center mb-10">
                            <div className="relative">
                                <motion.img
                                    layoutId="main-logo"
                                    src={logo}
                                    alt="IVC Logo"
                                    className="relative w-24 h-24 md:w-32 md:h-32 drop-shadow-liquid"
                                />
                            </div>
                        </div>

                        <h1 className="text-4xl font-black tracking-tight text-white sm:text-7xl md:text-[92px] mb-10 leading-[0.85] flex flex-col items-center">
                            <div className="flex flex-wrap justify-center gap-x-4">
                                {words.slice(0, 2).map((word, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, filter: 'blur(15px)', y: 30 }}
                                        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                                        transition={{ delay: 0.3 + (i * 0.1), type: "spring", stiffness: 100 }}
                                        className="text-gradient bg-clip-text"
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </div>
                            <div className="mt-2">
                                {words.slice(2).map((word, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, filter: 'blur(15px)', y: 30 }}
                                        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                                        transition={{ delay: 0.5 + (i * 0.1), type: "spring", stiffness: 100 }}
                                        className="text-gradient bg-clip-text"
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </div>
                        </h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                        >
                            <p className="text-lg md:text-xl font-bold tracking-tight text-white/80 max-w-xl mx-auto leading-relaxed">
                                Empower <span className="text-ivc-secondary text-glow">Students</span> through innovation, collaboration, and creativity.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home
