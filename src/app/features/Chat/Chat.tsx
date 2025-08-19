import React from "react";

import ChatMessages from "./components/ChatMessages";
import ChatForm from "./components/ChatForm";

const ChatFeature: React.FC = () => {
  return (
    <div className="flex flex-row flex-wrap w-full h-dvh content-end">
      <div className="max-w-(--container-w) w-full h-full overflow-auto m-auto">
        <ChatMessages />
      </div>
      <ChatForm />
    </div>
  );
};

export default ChatFeature;
