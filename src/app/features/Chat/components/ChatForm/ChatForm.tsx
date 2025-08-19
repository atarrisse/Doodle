"use client";
import React, { useState } from "react";

import { Button, Input } from "@/app/components";

const ChatInput: React.FC = ({}) => {
  const [message, setMessage] = useState("");

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     if (message.trim()) {
//       console.log(message.trim());
//       setMessage("");
//     }
//   };

  return (
    <div className="bg-(--color-blue) w-full py-2">
      <div className="max-w-(--container-w) m-auto flex align-center justify-center px-6">
        <form className="w-full flex gap-2">
          <Input
            id="chat-input"
            label="Write a message"
            placeholder="Message"
            className="grow"
            onChange={(e) => setMessage(e.target.value)}
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
