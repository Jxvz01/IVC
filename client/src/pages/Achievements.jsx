import { motion } from 'framer-motion';
import LiquidButton from '../components/LiquidButton';

const Achievements = () => (
    <div className="pt-32 px-4 max-w-7xl mx-auto text-center">
        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black mb-12 md:mb-16 text-white tracking-tighter"
        >
            Our <span className="text-gradient">Achievements</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <motion.div
                whileHover={{ y: -10 }}
                className="liquid-glass p-8 md:p-12 rounded-[28px] md:rounded-[32px] border border-white/10"
            >
                <h3 className="text-5xl md:text-7xl font-black mb-4 text-ivc-primary drop-shadow-glow">10+</h3>
                <p className="text-white/60 font-bold uppercase tracking-widest">Hackathons Won</p>
            </motion.div>

            <motion.div
                whileHover={{ y: -10 }}
                className="liquid-glass p-8 md:p-12 rounded-[28px] md:rounded-[32px] border border-white/10"
            >
                <h3 className="text-5xl md:text-7xl font-black mb-4 text-ivc-secondary drop-shadow-glow">50+</h3>
                <p className="text-white/60 font-bold uppercase tracking-widest">Projects Completed</p>
            </motion.div>
        </div>

        <div className="flex justify-center">
            <LiquidButton variant="glass">
                View All Milestones
            </LiquidButton>
        </div>
    </div>
);
export default Achievements;
