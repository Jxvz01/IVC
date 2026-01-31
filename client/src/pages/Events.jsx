import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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
        <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-screen">
            <h2 className="text-4xl font-bold mb-12 text-center text-ivc-text">Upcoming Events</h2>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ivc-primary"></div>
                </div>
            ) : (
                <div className="space-y-8">
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col md:flex-row bg-ivc-card border border-gray-200 rounded-xl overflow-hidden hover:bg-gray-100 transition-colors shadow-sm"
                        >
                            <div className="md:w-1/3 h-48 md:h-auto relative">
                                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                                <div className="absolute top-0 left-0 bg-ivc-primary text-white px-4 py-1 rounded-br-lg font-bold">
                                    {event.date}
                                </div>
                            </div>
                            <div className="p-6 md:w-2/3 flex flex-col justify-center">
                                <h3 className="text-2xl font-bold mb-2 text-ivc-text">{event.title}</h3>
                                <p className="text-gray-600 mb-4">{event.description}</p>
                                <button className="w-fit px-4 py-2 border border-ivc-primary text-ivc-primary rounded-lg hover:bg-ivc-primary hover:text-white transition-all">
                                    Register Now
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default Events;
