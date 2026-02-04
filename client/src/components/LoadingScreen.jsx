import { motion } from 'framer-motion';

const LoadingScreen = () => {
    const tagline = "IDEATE VISUALIZE AND CREATE";

    return (
        <motion.div
            initial={{ opacity: 1 }}
            // Removed exit={{ opacity: 0 }} from root to allow logo to stay
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] overflow-y-scroll custom-scrollbar"
        >
            {/* Background fades out - Removed duplicate InteractiveBackground */}
            <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="absolute inset-0 z-[-1]" />

            {/* Same structure as Home page */}
            <div className="relative isolate min-h-screen flex items-center justify-center px-4 py-20">
                <div className="mx-auto max-w-7xl relative z-10 w-full h-full flex flex-col justify-center">
                    {/* Glass Container Wrapper */}
                    <div className="relative max-w-5xl mx-auto w-full p-8 md:p-16 lg:p-24 group min-h-[70vh] flex flex-col justify-center">

                        {/* Glass Look Removed - Content floats on background */}

                        <div className="relative z-10 text-center">
                            {/* Logo in exact same position as Home page */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                // No exit animation for the container of the logo to ensure persistence
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className="flex justify-center mb-12"
                            >
                                <div className="relative">
                                    <motion.img
                                        layoutId="main-logo"
                                        src="/logo_loading.png"
                                        alt="IVC Logo"
                                        className="relative w-28 h-28 md:w-36 md:h-36 drop-shadow-liquid"
                                    />
                                </div>
                            </motion.div>

                            {/* Loading content - Fades Out */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6 }}
                                className="space-y-8"
                            >
                                {/* Tagline with smooth reveal */}
                                <div className="relative text-sm sm:text-lg md:text-3xl font-extrabold tracking-[0.15em] md:tracking-[0.4em] uppercase text-center px-4 max-w-[90vw] mx-auto">
                                    {/* Background ghost text */}
                                    <span className="text-white/[0.03] select-none block">
                                        {tagline}
                                    </span>

                                    {/* Animated gradient reveal */}
                                    <motion.span
                                        initial={{ clipPath: 'inset(0 100% 0 0)' }}
                                        animate={{ clipPath: 'inset(0 0% 0 0)' }}
                                        transition={{
                                            duration: 2.5,
                                            ease: [0.65, 0, 0.35, 1],
                                            delay: 0.5
                                        }}
                                        className="absolute inset-0 px-4 block"
                                    >
                                        <motion.span
                                            animate={{
                                                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                            }}
                                            transition={{
                                                duration: 5,
                                                repeat: Infinity,
                                                ease: "linear"
                                            }}
                                            className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/60 to-white bg-[length:200%_100%]"
                                        >
                                            {tagline}
                                        </motion.span>
                                    </motion.span>
                                </div>

                                {/* Subtitle */}
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 2, duration: 1 }}
                                    className="text-[10px] md:text-xs tracking-[0.3em] text-gray-500/60 uppercase font-medium"
                                >
                                    Innovating the Future
                                </motion.p>

                                {/* Loading progress indicator */}
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
                                    className="h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent max-w-xs mx-auto"
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
