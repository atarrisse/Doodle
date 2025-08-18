import React from "react";

interface ChatBubbleProps {
  message: string;
  timestamp: string;
  sender?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  timestamp,
  sender = null,
}) => {
  return (
    <div className={`max-w-[65%] my-4 p-4 bg-[${sender ? "#FCF6C5" : "#FFF"}]`}>
      <cite className={`${!sender &&  "sr-only"}`}>{sender}</cite>
      <p>{message}</p>
      <time>{timestamp}</time>
    </div>
  );
};

export default ChatBubble;
