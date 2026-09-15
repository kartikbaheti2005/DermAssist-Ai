import ConversationItem from "./ConversationItem";

const ConversationList = ({
  conversations,
  activeConversationId,
  onSelectConversation,
}) => {
  return (
    <div className="space-y-2">
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          isActive={conversation.id === activeConversationId}
          onClick={() => onSelectConversation(conversation.id)}
        />
      ))}
    </div>
  );
};

export default ConversationList;