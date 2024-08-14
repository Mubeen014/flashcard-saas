import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const systemPrompt = `
You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
Both front and back should be one sentence long.
You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
Dont include any other text other than json
`;

export async function POST(req) {
    const data = await req.text();
    console.log('data entered by user:', data);

    if (!process.env.GROQ_API_KEY) {
        return new Response(JSON.stringify({ message: 'API key is missing' }), { status: 500 });
    }

    try {
        const completion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: data },
            ],
            model: 'llama3-8b-8192',
            stream: false, // Ensure that streaming is disabled if it's not supported
        });

        // Log the entire response object for debugging
        console.log('API response:', completion);

        // Check if choices is defined and is an array with at least one element
        const choices = completion.choices || [];
        if (choices.length === 0) {
            throw new Error('No choices found in API response');
        }

        // Log the message object to understand its structure
        const message = choices[0].message;
        console.log('Message object:', message);

        // Access the content property safely
        const messageContent = message?.content;
        if (!messageContent) {
            throw new Error('No message content found in API response');
        }

        // Parse the JSON response
        let flashcards;
        try {
            const parsed = JSON.parse(messageContent);
            flashcards = parsed.flashcards;
        } catch (parseError) {
            throw new Error('Error parsing flashcards JSON');
        }

        return new Response(JSON.stringify(flashcards));
    } catch (error) {
        console.error('Error generating flashcards:', error);
        return new Response(JSON.stringify({ message: 'Error generating flashcards' }), { status: 500 });
    }
}
