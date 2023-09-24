import React, { useEffect, useState } from "react";
import Image from "next/image";
import defaultImage from "@/src/assets/defaultImage.jpg";
import useUser from "@/src/hooks/useUser";

const Picture = ({ fileURL, media }) => {
  const [blob, setBlob] = useState(defaultImage);
  const user = useUser();
  console.log(media.content_type);

  useEffect(() => {
    console.log(fileURL);
    if (fileURL && user && media) {
      console.log(user.idToken);
      fetch(fileURL, {
        headers: {
          Authorization: `Bearer ${user.idToken}`,
          'Content-Type': media.content_type
        },
      })
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
  }, [fileURL, user]);

  return (
    <div className="h-full w-full relative">
      <Image layout="fill" src={blob} alt="user image" />
    </div>
  );
};

export default Picture;
