import { motion } from 'framer-motion';

const LoadingScreen = () => {
    const tagline = "IDEATE VISUALIZE AND CREATE";
    const words = tagline.split(" ");

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden"
        >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-ivc-primary/20 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-ivc-secondary/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Logo Container */}
            <motion.div
                initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{
                    duration: 1.2,
                    ease: [0.34, 1.56, 0.64, 1]
                }}
                className="relative z-10 mb-8"
            >
                <div className="relative">
                    <img
                        src="/logo.png"
                        alt="IVC Logo"
                        className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-[0_0_30px_rgba(255,184,0,0.3)]"
                    />
                </div>
            </motion.div>

            {/* Tagline Container */}
            <div className="relative z-10 flex flex-wrap justify-center gap-x-3 px-4">
                {words.map((word, i) => (
                    <motion.span
                        key={i}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            delay: 0.5 + (i * 0.1),
                            duration: 0.8,
                            ease: "easeOut"
                        }}
                        className="text-xl md:text-3xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-ivc-secondary via-white to-ivc-accent uppercase"
                    >
                        {word}
                    </motion.span>
                ))}
            </div>

            {/* Loading Bar */}
            <div className="mt-12 w-48 h-[2px] bg-white/10 rounded-full overflow-hidden relative z-10">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 0.5
                    }}
                    className="h-full bg-gradient-to-r from-ivc-primary to-ivc-secondary shadow-[0_0_10px_#ffb800]"
                />
            </div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-4 text-xs tracking-tighter text-gray-500 uppercase font-medium"
            >
                Innovating the Future
            </motion.p>
        </motion.div>
    );
};

export default LoadingScreen;
