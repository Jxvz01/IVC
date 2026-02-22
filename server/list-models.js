const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
dotenv.config();

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    try {
        const result = await genAI.listModels();
        console.log('Available Models:');
        result.models.forEach(model => {
            console.log(`- ${model.name} (${model.displayName})`);
            console.log(`  Methods: ${model.supportedGenerationMethods.join(', ')}`);
        });
    } catch (error) {
        console.error('Error listing models:', error);
    }
}

listModels();
