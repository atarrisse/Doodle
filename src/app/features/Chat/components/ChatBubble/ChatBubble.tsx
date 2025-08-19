import React from "react";

import type { ChatMessage } from "@/app/data";
import { format } from "date-fns";

type ChatBubbleProps = Pick<ChatMessage, "message" | "createdAt" | "author">;

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  createdAt,
  author,
}) => {
  const isSelf = author === process.env.NEXT_PUBLIC_USERNAME;

  return (
    <div
      className={`max-w-[65%] p-4 border-2 border-(--color-gray-light) rounded-sm ${
        isSelf ? "bg-(--color-yellow)" : "bg-white"
      }`}
    >
      <cite
        className={`${
          !author && "sr-only"
        } text-(--text-secondary) text-sm not-italic`}
      >
        {author}
      </cite>
      <p>{message}</p>
      <time className="text-sm text-(--text-secondary)">
        {format(new Date(createdAt), "dd MMM yyyy HH:mm")}
      </time>
    </div>
  );
};

export default ChatBubble;
