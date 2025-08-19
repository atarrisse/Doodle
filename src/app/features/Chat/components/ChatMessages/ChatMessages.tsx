"use client";
import LoadingDots from "@/app/components/LoadingDots/LoadingDots";
import useChatMessages from "../../hooks/useChatMessages";
import ChatBubble from "../ChatBubble";

function ChatMessages() {
  const { messages, loading, error } = useChatMessages();

  if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>;

  if (loading) {
    return (
      <div className="flex content-center">
        <LoadingDots />
      </div>
    );
  }

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
