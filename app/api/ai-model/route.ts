import { QUESTIONS_PROMPT } from "@/services/Prompts";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai"

export const POST = async (req: NextRequest) => {

    const { jobPosition, jobDescription, duration, type  } = await req.json();

    const FINAL_PROMPT = QUESTIONS_PROMPT
        .replace('{{jobTitle}}', jobPosition)
        .replace('{{jobDescription}}', jobDescription)
        .replace('{{duration}}', duration)
        .replace('{{type}}', type)

    console.log(FINAL_PROMPT);

    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const completion = await openai.chat.completions.create({
            model: "gpt-4.1",
            messages: [
                {
                    role: "user",
                    content: FINAL_PROMPT
                }
            ]
        })
        console.log(completion.choices[0].message);
        return NextResponse.json({
            status: 200,
            message: completion.choices[0].message
        })
    }
    catch(error) {
        console.log("Error generating questions list ", error)
        return NextResponse.json(error)
    }
}