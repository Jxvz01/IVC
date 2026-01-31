const Team = () => (
    <div className="pt-32 px-4 max-w-7xl mx-auto text-center text-ivc-text">
        <h1 className="text-4xl font-bold mb-12">Meet the Team</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(d => (
                <div key={d} className="p-6 bg-ivc-card border border-gray-200 rounded-xl hover:border-ivc-primary transition-colors hover:shadow-md">
                    <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                    <h3 className="text-xl font-bold">Member Name</h3>
                    <p className="text-ivc-primary text-sm">Coordinator</p>
                </div>
            ))}
        </div>
    </div>
);
export default Team;
