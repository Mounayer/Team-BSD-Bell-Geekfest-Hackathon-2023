'use client'
import React from "react";
import { useState, useEffect } from "react";
import useUser from "@/src/hooks/useUser";
import Image from "next/image";

const Video = ({ fileURL, media }) => {
  const [videoBlobURL, setVideoBlobURL] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const user = useUser();
  console.log(media.content_type);

  useEffect(() => {
    if (fileURL && user && media) {
      fetch(fileURL, {
        headers: {
          Authorization: `Bearer ${user.idToken}`,
          "Content-Type": media.content_type,
        },
      })
        .then((res) => res.blob())
        .then((blob) => {

        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [fileURL, user]);

  return (
    <div className=" bg-red-500 w-full h-full">
        <h1>Hello there!</h1>
        <h2>Bye world!</h2>
    </div>
  );
};

export default Video;
