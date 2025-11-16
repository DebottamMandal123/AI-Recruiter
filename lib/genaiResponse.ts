export const stripCodeFence = (value: string) => value.replace(/```(?:json)?/gi, "").trim();

export const parseGeminiPayload = (value: string) => {
    try {
        return JSON.parse(value);
    } catch (error) {
        console.warn("Unable to parse Gemini payload", { value, error });
        return null;
    }
};
