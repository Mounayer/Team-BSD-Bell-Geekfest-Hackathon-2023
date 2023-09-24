import React from 'react';
import Card from '@/src/components/information-pages/card';


export default function TemplatePage({Text, Title}) {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center m-10 w-4/5">
        {/* left Column */}
        <div className="w-3/5 mr-10">
          <Card
            title={Title}
            text={Text}
          />
        </div>

        {/* right Column */}
        <div className="w-2/5">
          <img
            src="logo-name-nowhite.png"
            alt="Image 2"
            className="w-full h-auto"
          />
          
          {/* Add big text below the image */}
          <p className="text-2xl mt-4 font-semibold text-blue-custom">You Upload - We Store</p>
        </div>
      </div>
    </div>
  );
}
