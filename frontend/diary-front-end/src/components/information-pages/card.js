import React from 'react';
import AboutUs from '../text/about';

const Card = ({ title , text}) => {
  return (
    <div className="bg-white border rounded-lg shadow-md p-10">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-2">{text}</div>
    </div>
  );
};

export default Card;