import React from "react";

const Loading: React.FC = () => (
  <div aria-busy="true" aria-live="polite" className="flex space-x-2 justify-center items-center">
    <div className="h-6 w-6 bg-(--color-blue) rounded-full animate-bounce motion-reduce:animate-none [animation-delay:-0.3s]" />
    <div className="h-6 w-6 bg-(--color-blue) rounded-full animate-bounce motion-reduce:animate-none [animation-delay:-0.15s]" />
    <div className="h-6 w-6 bg-(--color-blue) rounded-full animate-bounce motion-reduce:animate-none" />
    <h2 className="sr-only">Loading</h2>
  </div>
);

export default Loading;
