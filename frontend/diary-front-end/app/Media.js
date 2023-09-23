import Text from "@/src/components/mediaThumbnail/Text";
import React, { useEffect } from "react";
import Picture from "@/src/components/mediaThumbnail/Picture";
import useUser from "@/src/hooks/useUser";
import { useState } from "react";
import defaultImage from "@/src/assets/defaultImage.jpg";

const Media = ({ media }) => {
  const user = useUser();
  const [blob, setBlob] = useState(null);
  const fileURL = user
    ? `http://${process.env.NEXT_PUBLIC_API_URL}/getone?username=${user.username}&filename=${media.file_name}&dataType=${media.data_type}`
    : defaultImage;

  useEffect(() => {
    if (fileURL != defaultImage) {
      fetch(fileURL)
        .then((res) => {
          return res.blob();
        })
        .then((blob) => {
          const imgURL = URL.createObjectURL(blob);
          console.log(imgURL);
          setBlob(imgURL)
        })
        .catch(err => {
          console.log(err.message);
        })
    }
  }, [fileURL]);

  return (
    <div className=" flex mx-5 flex-col border-black border w-[170px] h-[250px]">
      <div className=" h-full flex justify-center items-center">
        {getMediaThumbnail()}
      </div>
      <div className=" p-5 bg-slate-200 text-center text-sm">
        <h2>{media.file_name}</h2>
      </div>
    </div>
  );

  function getMediaThumbnail() {
    if (media.data_type == "text") {
      console.log("THIS");
      return <Text />;
    }
    if (media.data_type == "image") {
      console.log("FOUND IMAGE");
      return <Picture blob={blob} />;
    }
  }
};

export default Media;
