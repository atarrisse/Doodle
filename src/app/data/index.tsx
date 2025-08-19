export type ChatMessage = {
    _id: string;
    message: string;
    author: string;
    createdAt: string;
};

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
    return data;
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
};

export { fetchMessages };
