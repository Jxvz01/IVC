import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import LiquidButton from '../components/LiquidButton';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => {
                setProjects(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch projects", err);
                setLoading(false);
            });
    }, []);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="pt-32 pb-24 px-4 max-w-7xl mx-auto min-h-screen">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl font-black mb-16 text-center text-white tracking-tighter"
            >
                Our <span className="text-gradient">Projects</span>
            </motion.h2>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ivc-primary"></div>
                </div>
            ) : (
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
                >
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            variants={item}
                            whileHover={{ y: -12, scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            className="liquid-glass group relative h-full rounded-ios-xl overflow-hidden will-change-transform"
                        >
                            <div className="h-64 overflow-hidden relative">
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                <div className="absolute top-4 left-4 liquid-glass bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] border border-white/20 text-white uppercase">
                                    {project.domain}
                                </div>
                            </div>
                            <div className="p-10">
                                <h3 className="text-3xl font-black mb-3 text-white tracking-tighter group-hover:text-ivc-secondary transition-colors">{project.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-8 h-12 overflow-hidden line-clamp-2">{project.description}</p>
                                <LiquidButton className="!px-6 !py-2 text-[8px] tracking-[0.4em]" variant="glass">
                                    View Details
                                </LiquidButton>
                            </div>
                            {/* Liquid Reflection Overlay */}
                            <div className="absolute inset-0 border border-white/5 rounded-ios-xl pointer-events-none"></div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};
export default Projects;
