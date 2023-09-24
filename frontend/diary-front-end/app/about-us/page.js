import React from 'react';
import Card from '@/src/components/text/card';

export default function Page() {
  return (  
    <div className="flex justify-center m-10">
      {/* Right Column */}
      <div className="w-80 mr-8">
        <Card title="About Us" text="At Lock-it, we are passionate about providing you with a safe and reliable solution for storing and managing your data. Our commitment to security, integrity, and innovation drives everything we do." />
      </div>

      {/* Left Column */}
      <div className="w-80">
        <img
          src="logo-name-nowhite.png"
          alt="Image 1"
          className="w-full h-auto" // Keep the second image as it is
        />
        <img
          src="logo-name-nowhite.png"
          alt="Image 2"
          className="w-2/3 h-auto" // Make the first image bigger (adjust width as needed)
        />
      </div>
    </div>
  );
}
