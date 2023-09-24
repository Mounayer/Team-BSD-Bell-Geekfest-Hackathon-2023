import Text from "@/src/components/mediaThumbnail/Text";
import React, { useEffect } from "react";
import Picture from "@/src/components/mediaThumbnail/Picture";
import useUser from "@/src/hooks/useUser";

const Media = ({ media }) => {
  const user = useUser();
  const fileURL = user
    ? `https://${process.env.NEXT_PUBLIC_API_URL}/getone?filename=${media.file_name}&dataType=${media.data_type}&contentType=${media.content_type}`
    : null;
  console.log(media);
  return (
    <div className=" flex mx-5 my-3 flex-col border-black border w-[140px] h-[220px]">
      <div className=" h-full flex justify-center items-center">
        {getMediaThumbnail()}
      </div>
      <div className="p-2 max-h-16 bg-black bg-opacity-25 text-white opacity-90 text-center text-sm">
        <h2 className="truncate max-w-full">{media.file_name}</h2>
      </div>
    </div>
  );

  function getMediaThumbnail() {
    if (media.data_type == "text") {
      return <Text fileExtension={media.file_extension} />;
    }
    if (media.data_type == "image") {
      return <Picture fileURL={fileURL} media={media} />;
    }
  }
};

export default Media;
