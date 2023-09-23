import React from "react";

const TextParagraph = ({ text }) => {
  return (
    <div className="max-w-xl mx-auto p-4 m-4 bg-gradient-to-b from-white to-blue-custom">
      <p className=" text-center text-blue p-4">{text}</p>
    </div>
  );
};

export default TextParagraph;
