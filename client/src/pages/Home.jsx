import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import logo from '../assets/logo.png';

const Home = () => {
    return (
        <div className="relative isolate pt-24 pb-12 lg:pt-32 min-h-screen flex items-center">

            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="flex justify-center mb-8"
                    >
                        <img src={logo} alt="IVC Logo" className="w-32 h-32 md:w-48 md:h-48 drop-shadow-2xl" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl font-extrabold tracking-tight text-ivc-text sm:text-6xl"
                    >
                        Innovate. Create. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-ivc-primary to-ivc-accent">
                            Transform Ideas into Impact.
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-6 text-lg leading-8 text-gray-600"
                    >
                        IVC is the hub for student innovation, bringing together tech enthusiasts, designers, and dreamers to build future-ready solutions.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-10 flex items-center justify-center gap-x-6"
                    >
                        <button
                            onClick={() => document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' })}
                            className="rounded-full bg-ivc-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-ivc-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivc-primary transition-all hover:scale-105"
                        >
                            Join IVC
                        </button>
                        <button
                            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                            className="text-sm font-semibold leading-6 text-ivc-text flex items-center gap-1 hover:gap-2 transition-all hover:text-ivc-primary"
                        >
                            View Projects <ArrowRight size={16} />
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
export default Home
