import api from "./axios";

export const predictImage = async (
    imageId
) => {

    const response = await api.post(
        "/predict",
        {
            image_id: imageId,
        }
    );

    return response.data;

};

export const getPredictionReport = async () => {
    const response = await api.get("/reports/predictions");
    return response.data;
};

export const getPredictions = async () => {
    const response = await api.get("/predictions");
    return response.data;
};

export const getPredictionDetails = async (id) => {
    const response = await api.get(`/predictions/${id}`);
    return response.data;
};

export const deletePrediction = async (id) => {
    await api.delete(`/predictions/${id}`);
};

export const getPredictionExplanation = async (id) => {
    const response = await api.get(
        `/predictions/${id}/explanation`
    );

    return response.data;
};

export const getPredictionHeatmap = async (id) => {
    const response = await api.get(
        `/predictions/${id}/heatmap`
    );

    return response.data;
};

export const getRecommendations = async (predictionId) => {

    const response = await api.get(
        `/recommendations/prediction/${predictionId}`
    );

    return response.data;

};