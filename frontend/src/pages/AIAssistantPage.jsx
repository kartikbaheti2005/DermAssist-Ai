import AssistantLayout from "../components/assistant/AssistantLayout";
import useAssistant from "../hooks/useAssistant";
const AIAssistantPage = () => <AssistantLayout {...useAssistant()} />;
export default AIAssistantPage;
