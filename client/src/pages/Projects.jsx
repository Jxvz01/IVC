import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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
        <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-screen">
            <h2 className="text-4xl font-bold mb-12 text-center text-ivc-text">Our Projects</h2>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ivc-primary"></div>
                </div>
            ) : (
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            variants={item}
                            className="bg-ivc-card border border-gray-200 rounded-xl overflow-hidden hover:border-ivc-primary/50 transition-colors group hover:shadow-lg hover:shadow-ivc-primary/10"
                        >
                            <div className="h-48 bg-gray-200 overflow-hidden relative">
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded text-xs font-mono border border-white/20 text-white">
                                    {project.domain}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 group-hover:text-ivc-accent transition-colors text-ivc-text">{project.title}</h3>
                                <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                                <button className="text-ivc-primary text-sm font-semibold hover:text-ivc-secondary transition-colors">
                                    Read More &rarr;
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};
export default Projects;
