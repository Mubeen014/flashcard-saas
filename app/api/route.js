import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const systemPrompt =`
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
`
;
export async function POST(req) {
    const data = await req.text();
    console.log('data entered by user:', data);

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ message: 'API key is missing' }, { status: 500 });
    }

    const completion = await groq.chat.completions.create({
        messages: [
            {role: 'system', content: systemPrompt},
            {role: 'user', content: data},
        ],
        model: 'llama3-8b-8192',
        stream: true,
    })

    const flashcards = JSON.parse(completion.choices[0].message.content)
    console.log('Generated flashcards:', flashcards);

    return NextResponse.json(flashcards.flashcards)
}
