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
        return JSON.parse(normalized);
    } catch (error) {
        console.warn("Unable to parse Gemini payload", { value: normalized, error });
        return null;
    }
};
