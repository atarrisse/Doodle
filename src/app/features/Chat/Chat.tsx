import React from "react";

import ChatMessages from "./components/ChatMessages";
import ChatForm from "./components/ChatForm";

const ChatFeature: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-dvh">
      <div className="max-w-(--container-w) w-full grow overflow-auto m-auto">
        <ChatMessages />
      </div>
      <ChatForm />
    </div>
  );
};

export default ChatFeature;
