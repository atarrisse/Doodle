import React from "react";

import type { ChatMessage } from "@/app/data";

type ChatBubbleProps = Pick<ChatMessage, "message" | "createdAt" | "author">;

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  createdAt,
  author = null,
}) => {
  return (
    <div className={`max-w-[65%] my-4 p-4 bg-[${author ? "#FCF6C5" : "#FFF"}]`}>
      <cite className={`${!author &&  "sr-only"}`}>{author}</cite>
      <p>{message}</p>
      <time>{createdAt}</time>
    </div>
  );
};

export default ChatBubble;
