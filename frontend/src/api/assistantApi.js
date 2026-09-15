import api from "./axios";

/**
 * Assistant Context
 */
export const getAssistantContext = async () => {
    const response = await api.get("/assistant/context");
    return response.data;
};

/**
 * AI Suggestions
 */
export const getAssistantSuggestions = async () => {
    const response = await api.get("/assistant/suggestions");
    return response.data;
};

/**
 * Quick Actions
 */
export const getAssistantActions = async () => {
    const response = await api.get("/assistant/actions");
    return response.data;
};

/**
 * Assistant Feedback
 */
export const sendAssistantFeedback = async (payload) => {
    const response = await api.post(
        "/assistant/feedback",
        payload
    );

    return response.data;
};