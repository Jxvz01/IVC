const Domains = () => (
    <div className="pt-32 px-4 max-w-7xl mx-auto text-center text-ivc-text">
        <h1 className="text-4xl font-bold mb-12">Our Domains</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Web Development', 'AI & ML', 'IoT & Hardware', 'Entrepreneurship', 'UI/UX Design'].map(d => (
                <div key={d} className="p-8 bg-ivc-card border border-gray-200 rounded-xl hover:bg-gray-200 transition-colors shadow-sm">
                    <h3 className="text-2xl font-bold mb-2">{d}</h3>
                    <p className="text-gray-600">Exploring the frontiers of {d}.</p>
                </div>
            ))}
        </div>
    </div>
);
export default Domains;
