import { useEffect, useState } from "react";

import { ChatMessage, fetchMessages } from "@/app/data";

const useChatMessages = () => {
  const [messages, setMessages] = useState<Array<ChatMessage>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchMessages()
      .then((data) => {
        if (isMounted) {
          setMessages(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return { messages, loading, error };
};

export default useChatMessages;
