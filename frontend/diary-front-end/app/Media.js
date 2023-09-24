import Text from "@/src/components/mediaThumbnail/Text";
import React, { useEffect } from "react";
import Picture from "@/src/components/mediaThumbnail/Picture";
import useUser from "@/src/hooks/useUser";
import { useState } from "react";
import defaultImage from "@/src/assets/defaultImage.jpg";

const Media = ({ media }) => {
  const user = useUser();
  const fileURL = user
    ? `http://${process.env.NEXT_PUBLIC_API_URL}/getone?username=${user.username}&filename=${media.file_name}&dataType=${media.data_type}`
    : null;
  console.log(media);
  return (
    <div className=" flex mx-5 flex-col border-black border w-[140px] h-[220px]">
      <div className=" h-full flex justify-center items-center">
        {getMediaThumbnail()}
      </div>
      <div className=" p-5 bg-black bg-opacity-25 text-white opacity-90 text-center text-sm">
        <h2>{media.file_name}</h2>
      </div>
    </div>
  );

  function getMediaThumbnail() {
    if (media.data_type == "text") {
      return <Text />;
    }
    if (media.data_type == "image") {
      return <Picture fileURL={fileURL} />;
    }
  }
};

export default Media;
