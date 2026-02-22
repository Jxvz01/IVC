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
    model: "gemini-2.0-flash-lite",
    systemInstruction: {
        role: "system",
        parts: [{
            text: `Persona: IVC Club (Innovations for Vivid Creations) Assistant.
Mission: Help users with club info, projects, and membership.
Context:
- Mission: Fostering innovation via collaboration & tech.
- Domains: Web, AI/ML, IoT, Entrepreneurship, UI/UX.
- Events: Innovation Summit (hackathon), GenAI Workshops.
- Projects: Smart Campus (IoT), Pulse AI (Medical AI).
- Join: Use 'Join' form (Name, Email, Dept, Year).
Rules:
- Be professional & encouraging.
- Strictly IVC topics only. Redirect other queries politely.
- Site shows club innovation.` }]
    }
}, { apiVersion: 'v1beta' });

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

        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
        let lastError = null;
        let attempts = 0;
        const maxAttempts = 2;

        while (attempts < maxAttempts) {
            try {
                const result = await chat.sendMessage(message);
                const response = await result.response;
                const text = response.text();
                return res.json({ reply: text });
            } catch (error) {
                lastError = error;
                attempts++;
                const isRetryable = error.status === 429 || error.status === 500 || (error.message && (error.message.includes('429') || error.message.includes('500')));
                if (isRetryable && attempts < maxAttempts) {
                    console.log(`Retry attempt ${attempts} after 2s delay...`);
                    await delay(2000);
                    continue;
                }
                break;
            }
        }

        console.error('Final Gemini Error:', lastError);
        if (lastError.status === 429 || (lastError.message && lastError.message.includes('429'))) {
            return res.status(429).json({
                error: 'Rate limit exceeded',
                reply: "I'm a bit overwhelmed with requests right now! Please give me a few seconds to catch my breath and try again. 😅"
            });
        }

        res.status(500).json({
            error: 'Failed to get AI response',
            reply: "I'm having a small technical hiccup. Could you try rephrasing that or checking back in a minute?"
        });
    } catch (error) {
        console.error('Route Error:', error);
        res.status(500).json({ error: 'Internal server error' });
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
