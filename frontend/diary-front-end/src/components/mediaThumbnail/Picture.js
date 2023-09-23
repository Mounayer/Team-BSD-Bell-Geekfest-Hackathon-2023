import React from "react";
import Image from "next/image";
import defaultImage from '@/src/assets/defaultImage.jpg'

const Picture = () => {
  return (
    <div className=" h-full w-full relative">
      <Image
        src={defaultImage}
        layout="fill"
        alt="user image"
      />
    </div>
  );
};

export default Picture;
