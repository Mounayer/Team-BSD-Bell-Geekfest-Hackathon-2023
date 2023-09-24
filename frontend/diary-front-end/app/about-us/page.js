import React from 'react'
import TextParagraph from '@/src/components/text/textParagraph'
import Header from '@/src/components/text/textHeader'


export default function page() {
  return (
    <>  <div className="flex m-10">
   

    {/* Right Column */}
    <div className="w-40%">
    <Header text ="AAAA" />

    </div> 
    {/* Left Column */}
    <div className="w-60%">
      <img
        src="logo-name-nowhite.png"
        alt="Image 1"
        className="w-full h-auto"
      />
      <img
        src="logo-name-nowhite.png"
        alt="Image 2"
        className="w-full h-auto"
      />
    </div>
  </div></>
  )
}
