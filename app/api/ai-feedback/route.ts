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
            return NextResponse.json(
                { error: "Invalid request body" },
                { status: 400 },
            );
        }

        const { conversation } = requestBody ?? {};

        if (!conversation) {
            console.warn("Missing conversation payload in feedback request");
            return NextResponse.json(
                { error: "Missing conversation payload" },
                { status: 400 },
            );
        }

        // Ensure conversation is properly structured before JSON.stringify
        let conversationString: string;
        try {
            conversationString = JSON.stringify(conversation);
        } catch (error) {
            console.error("Error stringifying conversation", error);
            return NextResponse.json(
                { error: "Invalid conversation data format" },
                { status: 400 },
            );
        }

        const FINAL_PROMPT = FEEDBACK_PROMPT.replace("{{conversation}}", conversationString);

        const genAI = createGeminiClient();
        const response = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: FINAL_PROMPT,
        });

        if (!response || !response.text) {
            console.warn("Gemini API returned no text response");
            return NextResponse.json({
                text: "",
                payload: null,
                candidates: response.candidates,
            });
        }

        const cleanedText = stripCodeFence(response.text);
        const payload = cleanedText ? parseGeminiPayload(cleanedText) : null;

        console.log("Cleaned text from Gemini:", cleanedText);
        console.log("Parsed payload:", payload);

        return NextResponse.json({
            text: cleanedText || "",
            payload: payload || null,
            candidates: response.candidates,
        });
    } catch (error) {
        console.error("Error generating feedback", error);

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