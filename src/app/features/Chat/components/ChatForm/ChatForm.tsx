"use client";
import React, { FormEvent, useState } from "react";

import { Button, Input } from "@/app/components";
import useChatMessages from "../../hooks/useChatMessages";

const ChatInput: React.FC = ({}) => {
  const { sendMessage } = useChatMessages();
  const [isLoading, seIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    seIsLoading(true)
    e.preventDefault();
    if (message.trim()) {
      console.log(message.trim());
      const messages = await sendMessage(message);
      setMessage("");
    }
    seIsLoading(false)
  };

  return (
    <div className="bg-(--color-blue) w-full py-2">
      <div className="max-w-(--container-w) m-auto flex align-center justify-center px-6">
        <form className="w-full flex gap-2" onSubmit={handleSubmit}>
          <Input
            id="chat-input"
            name="chat-input"
            label="Write a message"
            placeholder="Message"
            className="grow"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isLoading}
          />
          <Button type="submit" disabled={!message.trim()}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;
