import { QUESTIONS_PROMPT } from "@/services/Prompts";
import { NextRequest, NextResponse } from "next/server";
import { createGeminiClient } from "@/lib/genaiClient";

const stripCodeFence = (value: string) => value.replace(/```(?:json)?/gi, "").trim();

const parsePayload = (value: string) => {
    try {
        return JSON.parse(value);
    } catch (error) {
        console.warn("Unable to parse Gemini payload", { value, error });
        return null;
    }
};

export const POST = async (req: NextRequest) => {
    try {
        const { jobPosition, jobDescription, duration, type } = await req.json();

        const FINAL_PROMPT = QUESTIONS_PROMPT
            .replace("{{jobTitle}}", jobPosition)
            .replace("{{jobDescription}}", jobDescription)
            .replace("{{duration}}", duration)
            .replace("{{type}}", type);

        const genAI = createGeminiClient();
        const response = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: FINAL_PROMPT,
        });

        const cleanedText = stripCodeFence(response.text ?? "");
        const payload = cleanedText ? parsePayload(cleanedText) : null;

        return NextResponse.json({
            text: cleanedText,
            payload,
            candidates: response.candidates,
        });
    } catch (error) {
        console.error("Error generating questions list", error);

        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 },
        );
    }
};