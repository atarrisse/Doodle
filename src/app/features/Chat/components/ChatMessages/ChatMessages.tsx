"use client";
import useChatMessages from "../../hooks/useChatMessages";
import ChatBubble from "../ChatBubble";

function ChatMessages() {
  const { messages, loading, error } = useChatMessages();

  if (loading) return <p>Loading messages...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>;

  return (
    <div className="flex flex-col gap-4 px-6">
        {messages.map((msg) => (
          <ChatBubble key={msg._id} message={msg.message} createdAt={msg.createdAt} author={msg.author} />
        ))}
    </div>
  );
}

export default ChatMessages;
