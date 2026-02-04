import { useState } from 'react';
import { motion } from 'framer-motion';
import LiquidButton from '../components/LiquidButton';

const Join = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        department: '',
        year: '',
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            const response = await fetch('/api/join', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', department: '', year: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <div className="pt-32 pb-24 px-4 max-w-xl mx-auto min-h-screen flex flex-col justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-4xl md:text-5xl font-black mb-10 text-center text-gradient tracking-tighter">
                    Join the Club
                </h2>
                <form onSubmit={handleSubmit} className="space-y-8 glass-card p-6 md:p-10 rounded-2xl md:rounded-3xl relative overflow-hidden">
                    {/* Form Glow */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ivc-primary to-ivc-secondary opacity-50"></div>

                    {['Name', 'Email', 'Department', 'Year'].map((field) => (
                        <div key={field} className="relative group">
                            <label
                                htmlFor={field.toLowerCase()}
                                className="block text-xs font-black tracking-[0.2em] text-gray-400 uppercase mb-2 group-focus-within:text-ivc-secondary transition-colors"
                            >
                                {field}
                            </label>
                            <input
                                id={field.toLowerCase()}
                                type={field === 'Email' ? 'email' : 'text'}
                                name={field.toLowerCase()}
                                value={formData[field.toLowerCase()]}
                                onChange={handleChange}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-ivc-secondary/50 focus:border-ivc-secondary transition-all"
                            />
                        </div>
                    ))}

                    <LiquidButton
                        type="submit"
                        loading={status === 'submitting'}
                        className="w-full"
                        variant="glass"
                    >
                        Submit Application
                    </LiquidButton>

                    {status === 'success' && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-ivc-secondary text-center font-bold"
                        >
                            Welcome to the future! Check your email.
                        </motion.p>
                    )}
                    {status === 'error' && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-400 text-center font-bold"
                        >
                            Submission failed. Connectivity issue.
                        </motion.p>
                    )}
                </form>
            </motion.div>
        </div>
    );
};
export default Join;
