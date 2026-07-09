import { Plus } from "lucide-react";

const NewChatButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700"
    >
      <Plus size={18} />
      New Chat
    </button>
  );
};

export default NewChatButton;