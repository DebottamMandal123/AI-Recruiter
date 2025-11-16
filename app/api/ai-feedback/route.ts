import { FEEDBACK_PROMPT } from "@/services/Prompts";
import { NextRequest, NextResponse } from "next/server";
import { createGeminiClient } from "@/lib/genaiClient";
import { parseGeminiPayload, stripCodeFence } from "@/lib/genaiResponse";

export const POST = async (req: NextRequest) => {
    try {
        let requestBody: Record<string, unknown> | undefined;

        try {
            requestBody = await req.json();
        } catch (error) {
            console.warn("Feedback request body parse failed", error);
        }

        const { conversation } = requestBody ?? {};

        if (!conversation) {
            return NextResponse.json(
                { error: "Missing conversation payload" },
                { status: 400 },
            );
        }
        const FINAL_PROMPT = FEEDBACK_PROMPT.replace("{{conversation}}", JSON.stringify(conversation));

        const genAI = createGeminiClient();
        const response = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: FINAL_PROMPT,
        });

        const cleanedText = stripCodeFence(response.text ?? "");
        const payload = cleanedText ? parseGeminiPayload(cleanedText) : null;

        console.log("Cleaned text from Gemini:", cleanedText);
        console.log("Parsed payload:", payload);

        return NextResponse.json({
            text: cleanedText,
            payload,
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