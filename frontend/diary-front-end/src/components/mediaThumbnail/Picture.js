import React, { useEffect, useState } from "react";
import Image from "next/image";
import defaultImage from "@/src/assets/defaultImage.jpg";

const Picture = ({ fileURL }) => {
  const [blob, setBlob] = useState(defaultImage);

  useEffect(() => {
    if (fileURL != null) {
      fetch(fileURL)
        .then((res) => {
          return res.blob();
        })
        .then((blob) => {
          const imgURL = URL.createObjectURL(blob);
          console.log(imgURL);
          setBlob(imgURL);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [fileURL]);
  
  return (
    <div className="h-full w-full relative">
      <Image layout="fill" src={blob} alt="user image" />
    </div>
  );
};

export default Picture;
