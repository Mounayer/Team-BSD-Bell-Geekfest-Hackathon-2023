import React, { useEffect } from "react";
import Image from "next/image";
import { useRef } from "react";
import defaultImage from '@/src/assets/defaultImage.jpg'

const Picture = ({blob}) => {
  const imgRef = useRef(null);
  useEffect(() => {
    if(imgRef && imgRef.current) {
      imgRef.current.srcObject = blob;
    }
  }, []);
  return (
    <div className=" h-full w-full relative">
      <Image
        ref={imgRef}
        layout="fill"
        alt="user image"
      />
    </div>
  );
};

export default Picture;
