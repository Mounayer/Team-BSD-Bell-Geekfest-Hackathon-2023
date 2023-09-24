import React from 'react';

const Card = ({ title, text }) => {
  return (
    <div className="bg-white border rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2">{text}</p>
    </div>
  );
};

export default Card;