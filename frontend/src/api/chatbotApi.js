import apiClient from "./axios";

export const getChatConversations = async () => (await apiClient.get("/chatbot/conversations")).data;
export const createChatConversation = async (title = "New conversation") => (await apiClient.post("/chatbot/conversations", { title })).data.conversation;
export const getChatConversation = async (id) => (await apiClient.get(`/chatbot/conversations/${id}`)).data;
// The backend provider call can take up to 45 seconds. Keep this request alive
// slightly longer so Axios does not discard a valid response mid-generation.
export const sendChatMessage = async (id, message) => (await apiClient.post(
  "/chatbot/message",
  { conversation_id: id, message },
  { timeout: 55000 },
)).data;
export const deleteChatConversation = async (id) => (await apiClient.delete(`/chatbot/conversations/${id}`)).data;
