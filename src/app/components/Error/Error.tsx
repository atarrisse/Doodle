import React from "react";

const Error: React.FC = () => (
  <div
    className="flex space-x-2 justify-center items-center"
    aria-invalid="true"
    aria-errormessage="Apologies, there was an error"
  >
    <h2>Apologies, there was an error</h2>
  </div>
);

export default Error;
