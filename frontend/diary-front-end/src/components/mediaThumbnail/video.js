import React, { useState, useEffect } from "react";
import defaultVideo from '@/src/assets/defaultVideo.jpg'
import Image from "next/image";

const Video = () => {

  return (
    <div className="w-full h-full relative bg-blue-500">
      <Image layout="fill" src={defaultVideo} alt="user image" />
    </div>
  );
};

export default Video;