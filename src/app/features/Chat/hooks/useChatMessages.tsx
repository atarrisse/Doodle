import { useEffect, useState } from "react";

import { ChatMessage, createMessage, fetchMessages } from "@/app/data";

const useChatMessages = () => {
  const [messages, setMessages] = useState<Array<ChatMessage>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);

    fetchMessages().then((data) => {
      setMessages(data);
      setLoading(false);
    } ).catch((err) => {
      setError(err as Error);
      setLoading(false);
    });
  }, []);

  const sendMessage = async (message: string) => {
    setLoading(true);

    try {
      const newMessage = await createMessage(message);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setLoading(false);
      return messages;
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  };

  return { messages, loading, error, sendMessage };
};

export default useChatMessages;
