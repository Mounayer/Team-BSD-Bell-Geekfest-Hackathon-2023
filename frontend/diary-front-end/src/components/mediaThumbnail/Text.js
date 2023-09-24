import React from "react";
import { BsFiletypeTxt } from "react-icons/bs";
import { BsFiletypeJson } from "react-icons/bs";

const Text = ({fileExtension}) => {
  let thumbnail = <BsFiletypeTxt />;
  console.log(fileExtension);
  
  if(fileExtension == '.json') {
    thumbnail = <BsFiletypeJson />
  }

  return (
    <div className=" text-[70px] text-slate-400">
      {thumbnail}
    </div>
  );
};

export default Text;
