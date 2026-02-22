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

const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-latest",
    systemInstruction: `You are the IVC (Innovations for Vivid Creations) Club Assistant. 
    Your mission is to help people learn about the club, our projects, and how to join.
    
    CLUB DETAILS:
    - Mission: Fostering innovation and entrepreneurship, transforming ideas into reality through collaboration, technology, and mentorship.
    - Domains: Web Development, AI & ML, IoT & Hardware, Entrepreneurship, and UI/UX Design.
    - Upcoming Events: Innovation Summit 2024 (flagship 24-hour hackathon) and GenAI Workshops.
    - Notable Projects: 
        1. Smart Campus Ecosystem (IoT-based sensor network for energy optimization).
        2. Pulse AI (Advanced diagnosis system using computer vision).
    - Team: Our team consists of passionate student coordinators across all domains.
    - How to Join: Interested members can fill out the 'Join the Club' form on the website with their name, email, department, and year.
    
    TONE & BOUNDARIES:
    - Be professional, encouraging, and highly knowledgeable about these club topics.
    - You are a 'Weak AI' restricted to IVC-related topics.
    - If a user asks about anything unrelated (politics, sports, general math, etc.), politely redirect them. Examples: 'I specialize in IVC club innovation! I'd love to tell you about our hackathons instead.' or 'That's an interesting question, but as the IVC Assistant, I'm here to discuss our club projects.'
    - If asked about the website, explain that it's built to showcase IVC's innovation.`
});

// Chat Route
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ error: 'Message is required' });

        if (!process.env.GEMINI_API_KEY) {
            return res.json({ reply: "I'm currently in 'offline mode' because my API key hasn't been set up yet. Please ask my developer to add the GEMINI_API_KEY to the server environment!" });
        }

        const chat = model.startChat({
            history: [],
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });

    } catch (error) {
        console.error('Gemini Error:', error);
        res.status(500).json({ error: 'Failed to get AI response' });
    }
});

// Export the app for Vercel
module.exports = app;

// Only listen if not running as a Vercel function
if (process.env.NODE_ENV !== 'production') {
    const startServer = (port) => {
        const server = app.listen(port, () => {
            console.log(`Server successfully started on http://localhost:${port}`);
        }).on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.error(`Port ${port} is already in use. Retrying with port ${port + 1}...`);
                startServer(port + 1);
            } else {
                console.error('Server error:', err);
            }
        });
    };
    startServer(PORT);
}
