const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock Data
const events = [
    { id: 1, title: 'Hackathon 2024', date: '2024-03-15', description: 'Annual 24h Hackathon', image: 'https://via.placeholder.com/300' },
    { id: 2, title: 'AI Workshop', date: '2024-04-10', description: 'Intro to GenAI', image: 'https://via.placeholder.com/300' }
];

const projects = [
    { id: 1, title: 'Smart Campus', domain: 'IoT', description: 'Automating text messaging', image: 'https://via.placeholder.com/300' },
    { id: 2, title: 'Health AI', domain: 'AI/ML', description: 'Diagnosing diseases early', image: 'https://via.placeholder.com/300' }
];

const members = []; // In-memory store for join requests

// Routes
app.get('/api', (req, res) => {
    res.json({ message: "🚀 IVC API is Running" });
});

app.get('/api/events', (req, res) => {
    res.json(events);
});

app.get('/api/projects', (req, res) => {
    res.json(projects);
});

app.post('/api/join', (req, res) => {
    const { name, email, department, year } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and Email are required' });
    }
    const newMember = { id: members.length + 1, name, email, department, year, joinedAt: new Date() };
    members.push(newMember);
    console.log('New Member Joined:', newMember);
    res.status(201).json({ message: 'Successfully joined IVC!', member: newMember });
});

// Export the app for Vercel
module.exports = app;

// Only listen if not running as a Vercel function
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

