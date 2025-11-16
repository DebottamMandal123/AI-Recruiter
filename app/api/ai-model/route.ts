import { QUESTIONS_PROMPT } from "@/services/Prompts";
import { NextRequest, NextResponse } from "next/server";
import { createGeminiClient } from "@/lib/genaiClient";
import { parseGeminiPayload, stripCodeFence } from "@/lib/genaiResponse";

export const POST = async (req: NextRequest) => {
    try {
        const { jobPosition, jobDescription, duration, type } = await req.json();

        if (!jobPosition || !jobDescription || !duration || !type) {
            console.warn("Missing required fields for question generation", { jobPosition, jobDescription, duration, type });
            return NextResponse.json(
                { error: "Missing required fields: jobPosition, jobDescription, duration, type" },
                { status: 400 },
            );
        }

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

        if (!response || !response.text) {
            console.warn("Gemini API returned no text response for questions");
            return NextResponse.json({
                text: "",
                payload: null,
                candidates: response?.candidates || [],
            });
        }

        const cleanedText = stripCodeFence(response.text);
        const payload = cleanedText ? parseGeminiPayload(cleanedText) : null;

        return NextResponse.json({
            text: cleanedText || "",
            payload: payload || null,
            candidates: response.candidates,
        });
    } catch (error) {
        console.error("Error generating questions list", error);

        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Unknown error",
                text: "",
                payload: null
            },
            { status: 500 },
        );
    }
};