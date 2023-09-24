import React from "react";
import { BsFiletypeTxt } from "react-icons/bs";
import { BsFiletypeJson } from "react-icons/bs";

const Text = ({fileExtension}) => {
  let thumbnail = <BsFiletypeTxt />;
  
  if(fileExtension == '.json') {
    thumbnail = <BsFiletypeJson />
  }

  return (
    <div>
      {thumbnail}
    </div>
  );
};

export default Text;
