import api from "./axios";

export const uploadImage = async (imageFile) => {

    const formData = new FormData();

    formData.append("file", imageFile);

    formData.append("body_part", "neck");

    formData.append("lesion_id", "lesion_001");

    formData.append("is_followup", false);

    const response = await api.post(
        "/images/upload",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};