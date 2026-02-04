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
    {
        id: 1,
        title: 'Innovation Summit 2024',
        date: 'MARCH 15, 2024',
        description: 'Our flagship 24-hour hackathon where ideas turn into reality. Join 200+ creators for a night of building.',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000'
    },
    {
        id: 2,
        title: 'GenAI Workshop',
        date: 'APRIL 10, 2024',
        description: 'Deep dive into Large Language Models and Generative AI. Learn how to build the next generation of smart apps.',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000'
    }
];

const projects = [
    {
        id: 1,
        title: 'Smart Campus Ecosystem',
        domain: 'IoT',
        description: 'A connected mesh network of sensors optimizing energy consumption across student dormitories.',
        image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=1000'
    },
    {
        id: 2,
        title: 'Pulse AI',
        domain: 'AI/ML',
        description: 'Advanced early diagnosis system using computer vision to identify anomalies in medical imaging.',
        image: 'https://images.unsplash.com/photo-1576091160550-217359f4ecf8?q=80&w=1000'
    }
];

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'members.json');

// Initialize members from file
let members = [];
if (fs.existsSync(DATA_FILE)) {
    try {
        members = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    } catch (e) {
        console.error('Error loading members data', e);
    }
}

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

    // Persist to file
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(members, null, 2));
    } catch (e) {
        console.error('Error saving members data', e);
    }

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
