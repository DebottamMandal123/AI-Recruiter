const normalizePayload = (value?: string) => {
    const trimmed = value?.trim();
    if (!trimmed || trimmed === "undefined" || trimmed === "null") {
        return null;
    }

    return trimmed;
};

export const stripCodeFence = (value: string) => value.replace(/```(?:json)?/gi, "").trim();

export const parseGeminiPayload = (value?: string) => {
    const normalized = normalizePayload(value);
    if (!normalized) {
        return null;
    }

    try {
        // Attempt to parse the cleaned string
        return JSON.parse(normalized);
    } catch (error) {
        // If parsing fails, try to extract JSON from the string
        const jsonRegex = /\{(?:[^{}]|\[(?:[^\[\]]|{[^{}]*})*\])*\}|\[(?:[^\[\]]|{[^{}]*})*\]/;
        const match = normalized.match(jsonRegex);
        if (match) {
            try {
                return JSON.parse(match[0]);
            } catch (e) {
                console.warn("Unable to parse extracted Gemini payload", { value: match[0], error: e });
                return null;
            }
        }
        console.warn("Unable to parse Gemini payload", { value: normalized, error });
        return null;
    }
};
