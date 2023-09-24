import Text from "@/src/components/mediaThumbnail/Text";
import React from "react";
import Picture from "@/src/components/mediaThumbnail/Picture";
import useUser from "@/src/hooks/useUser";
import Video from "@/src/components/mediaThumbnail/video";
import { useState } from "react";

const Media = ({ media }) => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const user = useUser();
  const fileURL = user
    ? `https://${process.env.NEXT_PUBLIC_API_URL}/getone?filename=${media.file_name}&dataType=${media.data_type}&contentType=${media.content_type}`
    : null;
  const [blobURL, setBlobURL] = useState(null);
  const onClickHandler = getOnClickHandler();

  return (
    <div
      onClick={onClickHandler}
      className=" flex mx-5 my-3 cursor-pointer flex-col border-black border w-[140px] h-[220px]"
    >
      <div className=" h-full flex justify-center items-center">
        {getMediaThumbnail()}
      </div>
      <div className="p-2 max-h-16 bg-black bg-opacity-25 text-white opacity-90 text-center text-sm">
        <h2 className="truncate max-w-full">{media.file_name}</h2>
      </div>
    </div>
  );

  function getOnClickHandler() {
    if (media.data_type == "image" && blobURL) {
      return () => window.open(blobURL, "_blank");
    }
    if (media.data_type == "text") {
      return () => onOpenModal();
    }
  }

  function getMediaThumbnail() {
    if (media.data_type == "text") {
      return <Text fileExtension={media.file_extension} />;
    }
    if (media.data_type == "image") {
      return (
        <Picture
          fileURL={fileURL}
          media={media}
          onBlobURLCreated={setBlobURL}
        />
      );
    }
    if (media.data_type == "file" && media.file_extension == "mp4") {
      return <Video fileURL={fileURL} media={media} />;
    }
  }
};

export default Media;
