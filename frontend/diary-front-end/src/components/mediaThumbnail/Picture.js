import React, { useEffect, useState } from "react";
import Image from "next/image";
import defaultImage from "@/src/assets/defaultImage.png";

const Picture = () => {
  const img = defaultImage;

  return (
    <div className="h-full w-full relative">
      <Image layout="fill" src={defaultImage} alt="user image" />
    </div>
  );
};

export default Picture;