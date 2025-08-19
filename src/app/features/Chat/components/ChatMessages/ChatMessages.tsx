"use client";
import { useState, useEffect } from "react";

function ChatMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/messages", {
          method: "GET",
          headers: {
            Authorization: "Bearer super-secret-doodle-token",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setMessages(data); // store messages in state
      } catch (err) {
        setError(err?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []); // empty dependency array = run once on mount

  if (loading) return <p>Loading messages...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h2>Messages</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{JSON.stringify(msg)}</li>
        ))}
      </ul>
    </div>
  );
}

export default ChatMessages;
