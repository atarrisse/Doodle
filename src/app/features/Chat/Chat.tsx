import React from "react";
import ChatMessages from "./components/ChatMessages";

const ChatFeature: React.FC = () => {
  return (
    <div className="p-4">
      <ChatMessages />;
    </div>
  );
};

export default ChatFeature;
