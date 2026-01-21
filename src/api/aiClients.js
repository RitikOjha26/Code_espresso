const {GoogleGenerativeAI} = require("@google/generative-ai")

const genAI = new GoogleGenerativeAI(process.env.Google_Studio_API_Key);

async function getAIResponse(prompt) {

    const model = genAI.getGenerativeModel({
        model: 'gemini-2.0-flash-lite',
        generationConfig: {
            temperature: 0.7, 
            maxOutputTokens: 1024,
            // topK:40,
            // topP:0.95,
        },
    });

    const result = await model.generateContent(prompt);
    return result.response.text();
}

module.exports = getAIResponse;