"use client";
import useChatMessages from "../../hooks/useChatMessages";
import ChatBubble from "../ChatBubble";

function ChatMessages() {
  const { messages, loading, error } = useChatMessages();

  if (loading) return <p>Loading messages...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>;

  return (
      <div className="m-auto flex align-center justify-center px-6 py-4">
        <ul className="flex flex-col-reverse gap-4">
          {messages.map((msg) => (
            <li key={msg._id}>
              <ChatBubble
                message={msg.message}
                createdAt={msg.createdAt}
                author={msg.author}
              />
            </li>
          ))}
        </ul>
      </div>
  );
}

export default ChatMessages;
