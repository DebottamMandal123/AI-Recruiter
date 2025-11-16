import { FEEDBACK_PROMPT } from "@/services/Prompts";
import { NextRequest, NextResponse } from "next/server";
import { createGeminiClient } from "@/lib/genaiClient";

export const POST = async (req: NextRequest) => {
    try {
        const { conversation } = await req.json();
        const FINAL_PROMPT = FEEDBACK_PROMPT.replace("{{conversation}}", JSON.stringify(conversation));

        const genAI = createGeminiClient();
        // Use an available Gemini model. "gemini-2.5-flash" is commonly available.
        const response = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: FINAL_PROMPT,
        });

        return NextResponse.json({
            text: response.text ?? "",
            candidates: response.candidates,
        });
    } catch (error) {
        console.error("Error generating feedback", error);

        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 },
        );
    }
};