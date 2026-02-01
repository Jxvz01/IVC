import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import LiquidButton from '../components/LiquidButton';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/events')
            .then(res => res.json())
            .then(data => {
                setEvents(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch events", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="pt-32 pb-24 px-4 max-w-7xl mx-auto min-h-screen">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-black mb-12 md:mb-16 text-center text-white tracking-tighter"
            >
                Upcoming <span className="text-gradient">Events</span>
            </motion.h2>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ivc-primary"></div>
                </div>
            ) : (
                <div className="space-y-12">
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="flex flex-col md:flex-row glass-card rounded-2xl overflow-hidden hover:border-ivc-primary/40 transition-all duration-500 group"
                        >
                            <div className="md:w-1/3 h-64 md:h-auto relative">
                                <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#05070a]/80 to-transparent"></div>
                                <div className="absolute top-4 left-4 glass-card bg-ivc-primary/20 backdrop-blur-xl text-white px-5 py-2 rounded-full font-black tracking-widest text-xs border border-white/20 uppercase">
                                    {event.date}
                                </div>
                            </div>
                            <div className="p-6 md:p-10 md:w-2/3 flex flex-col justify-center relative">
                                <h3 className="text-2xl md:text-3xl font-black mb-3 text-white tracking-tight group-hover:text-ivc-secondary transition-colors">{event.title}</h3>
                                <p className="text-gray-400 mb-8 leading-relaxed text-base md:text-lg max-w-xl">{event.description}</p>
                                <LiquidButton variant="glass" className="w-fit">
                                    Register Now
                                </LiquidButton>

                                {/* Background glow decoration */}
                                <div className="absolute top-1/2 right-10 -translate-y-1/2 w-32 h-32 bg-ivc-primary/5 blur-[80px] rounded-full pointer-events-none"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default Events;
