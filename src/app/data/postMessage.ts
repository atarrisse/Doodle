type ChatMessage = {
  _id: string;
  message: string;
  author: string;
  createdAt: string;
};

const postMessage = async (message: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author: process.env.NEXT_PUBLIC_USERNAME,
          message,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error posting message:", error);
  }
};

export { postMessage, type ChatMessage };
