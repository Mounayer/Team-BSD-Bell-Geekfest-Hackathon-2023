import React from 'react'
import TextParagraph from '@/src/components/text/textParagraph'
import TextHeader from '@/src/components/text/textHeader'


export default function page() {
  return (
    <> <div className="flex justify-center ">
   
    <div> <img
        src="/logo.png" // Replace with the actual path to your image
        alt="Big Image"
        className="w-full h-auto"
      /><TextHeader text="About US"/><TextParagraph text="This is some sample text that will be placed in a paragraph."/>
    <div className="w-1/2">
      
    </div>
  </div></div></>
  )
}
