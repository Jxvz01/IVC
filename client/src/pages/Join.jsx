import { useState } from 'react';
import { motion } from 'framer-motion';

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
        <div className="pt-24 pb-12 px-4 max-w-xl mx-auto min-h-screen flex flex-col justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-ivc-secondary to-ivc-accent">
                    Join the Innovation Club
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6 bg-ivc-card p-8 rounded-xl border border-gray-200 backdrop-blur-sm shadow-xl">
                    {['Name', 'Email', 'Department', 'Year'].map((field) => (
                        <div key={field}>
                            <label className="block text-sm font-medium text-gray-700">{field}</label>
                            <input
                                type={field === 'Email' ? 'email' : 'text'}
                                name={field.toLowerCase()}
                                value={formData[field.toLowerCase()]}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-0 bg-white py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ivc-primary sm:text-sm sm:leading-6 px-3 transition-all"
                            />
                        </div>
                    ))}

                    <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full justify-center rounded-md bg-ivc-primary px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-ivc-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivc-primary disabled:opacity-50 transition-all hover:scale-[1.02]"
                    >
                        {status === 'submitting' ? 'Submitting...' : 'Join Now'}
                    </button>

                    {status === 'success' && <p className="text-green-400 text-center animate-pulse">Welcome to IVC! Check your email.</p>}
                    {status === 'error' && <p className="text-red-400 text-center">Something went wrong. Ensure backend is running.</p>}
                </form>
            </motion.div>
        </div>
    );
};
export default Join;
