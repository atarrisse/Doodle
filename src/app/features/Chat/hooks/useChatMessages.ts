import { useEffect, useRef, useState } from "react";
import { polling, postMessage } from "@/app/data";
import type { ChatMessage } from "@/app/data";

const POLL_INTERVAL_MS = Number(process.env.NEXT_PUBLIC_POLL_INTERVAL);
const API_LIMIT = Number(process.env.NEXT_PUBLIC_API_LIMIT);

const useChatMessages = () => {
  const [messages, setMessages] = useState<Array<ChatMessage>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const after = useRef<Date | null>(null);

  const handleSuccess = (incoming: ChatMessage[]) => {
    setMessages((prev) => {
      const seen = new Set(prev.map((m) => m._id));
      const merged = [...prev];
      for (const m of incoming) if (!seen.has(m._id)) merged.push(m);
      merged.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
      return merged;
    });
  };

  const handleError = (err: Error) => {
    setError(err as Error);
  };

  useEffect(() => {
    setLoading(true);

    const stop = polling({
      pollIntervalMs: POLL_INTERVAL_MS,
      limit: API_LIMIT,
      after: after.current ? after.current.toISOString() : undefined,
      onSuccess: (incoming) => {
        after.current = new Date(Date.now());
        handleSuccess(incoming);
        setLoading(false);
      },
      onError: (e) => {
        handleError(e as Error);
        setLoading(false);
      },
    });

    return () => stop();
  }, []);

  const sendMessage = async (message: string) => {
    setLoading(true);
    try {
      const newMessage = await postMessage(message);
      if (newMessage) setMessages((prev) => [...prev, newMessage]);
      return messages;
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { messages, loading, error, sendMessage };
};

export default useChatMessages;
