"use client";
import { Error, LoadingDots } from "@/app/components";

import ChatBubble from "../ChatBubble";
import useChatMessages from "../../hooks/useChatMessages";

function ChatMessages() {
  const { messages, loading, error } = useChatMessages();

  if (error) {
  return (
    <div className="h-full flex justify-center items-center">
      <Error />
    </div>
  );
  }

  if (loading) {
    return (
      <div className="h-full flex justify-center items-center">
        <LoadingDots />
      </div>
    );
  }

  return (
    <div className="m-auto flex align-center justify-center px-6 py-4">
      {messages.length && (
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
      )}
    </div>
  );
}

export default ChatMessages;
