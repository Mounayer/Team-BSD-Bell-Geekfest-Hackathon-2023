import React, { useState, useEffect } from "react";
import useUser from "@/src/hooks/useUser";

const Video = ({ fileURL, media }) => {
  const [thumbnail, setThumbnail] = useState(null);
  const user = useUser();

  useEffect(() => {
    if (fileURL && user && media) {
      fetch(fileURL, {
        headers: {
          Authorization: `Bearer ${user.idToken}`,
          "Content-Type": media.content_type,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.blob();
        })
        .then((blob) => {
          const blobURL = URL.createObjectURL(blob);
          const videoElem = document.createElement("video");

          videoElem.addEventListener("loadeddata", () => {
            const canvas = document.createElement("canvas");
            canvas.width = videoElem.videoWidth;
            canvas.height = videoElem.videoHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(videoElem, 0, 0, canvas.width, canvas.height);
            const thumbnailURL = canvas.toDataURL();
            setThumbnail(thumbnailURL);
          });

          videoElem.src = blobURL;

          videoElem.load();

          // If the video fails to load, this will log the error
          videoElem.addEventListener("error", (e) => {
            console.log("Video failed to load.", e);
          });
        })
        .catch((err) => {
          console.log("Error fetching video:", err.message);
        });
    }
  }, [fileURL, user]);

  return (
    <div className="w-full h-full bg-red-500">
      <h1 className=" text-white">Video</h1>
    </div>
  );
};

export default Video;
