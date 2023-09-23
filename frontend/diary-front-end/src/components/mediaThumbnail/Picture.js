import React, { useEffect } from "react";
import Image from "next/image";
import { useRef } from "react";
import defaultImage from '@/src/assets/defaultImage.jpg'

const Picture = ({blob}) => {
  return (
    <div className="h-full w-full relative">
      {blob && <Image layout="fill" src={blob} alt="user image" />}
    </div>
  );
};

export default Picture;
