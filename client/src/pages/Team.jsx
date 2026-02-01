import { motion } from 'framer-motion';
import LiquidButton from '../components/LiquidButton';

const Team = () => (
    <div className="pt-32 px-4 max-w-7xl mx-auto text-center">
        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl font-black mb-16 text-white tracking-tighter"
        >
            Meet the <span className="text-gradient">Team</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
            {[1, 2, 3, 4].map(d => (
                <motion.div
                    key={d}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="liquid-glass p-8 rounded-[32px] border border-white/10 group"
                >
                    <div className="w-24 h-24 bg-white/5 rounded-full mx-auto mb-6 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-ivc-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="text-xl font-black text-white">Member Name</h3>
                    <p className="text-ivc-secondary text-xs font-black tracking-widest uppercase mt-2">Coordinator</p>
                </motion.div>
            ))}
        </div>

        <div className="flex justify-center">
            <LiquidButton variant="glass" onClick={() => document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' })}>
                Join the Team
            </LiquidButton>
        </div>
    </div>
);
export default Team;
