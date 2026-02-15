const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet()); // Sets various HTTP headers for security
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? ['https://ivc-vvce.vercel.app']
        : true, // Allow all in development
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

// Global Rate Limiting (General protection)
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: { error: 'Too many requests, please try again later.' }
});
app.use('/api', globalLimiter);

// Payload Size Limiting
app.use(express.json({ limit: '10kb' })); // Prevents large JSON body attacks

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

const members = []; // In-memory store for join requests (resets on server restart)

// Routes
app.get('/api', (req, res) => {
    res.json({ message: "IVC API is Running" });
});

app.get('/api/events', (req, res) => {
    res.json(events);
});

app.get('/api/projects', (req, res) => {
    res.json(projects);
});

// Targeted Rate Limiting for the Join route (Anti-Spam)
const joinLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // Limit each IP to 5 join requests per hour
    message: { error: 'Too many applications from this IP, please try again after an hour.' }
});

const { z } = require('zod');

// Validation Schema
const joinSchema = z.object({
    name: z.string().min(2).max(50).trim(),
    email: z.string().email().max(100).trim().toLowerCase(),
    department: z.string().max(100).trim().optional().default('N/A'),
    year: z.string().max(20).trim().optional().default('N/A')
});

app.post('/api/join', joinLimiter, (req, res) => {
    try {
        const validatedData = joinSchema.parse(req.body);

        const newMember = {
            id: members.length + 1,
            ...validatedData,
            joinedAt: new Date()
        };

        members.push(newMember);
        console.log('New Member Joined:', newMember.name);
        res.status(201).json({ message: 'Successfully joined IVC!', member: newMember });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                error: 'Validation failed',
                details: error.errors.map(e => ({ path: e.path, message: e.message }))
            });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Export the app for Vercel
module.exports = app;

// Only listen if not running as a Vercel function
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
