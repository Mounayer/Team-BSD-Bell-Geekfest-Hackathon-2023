"use client";
import { init } from "./../src/app";
import { useEffect } from "react";
import { useState } from "react";
import Media from "./Media";
import SearchBar from "@/src/components/SearchBar";

export default function Home() {
  const initialData = [
    {
      name: "file.txt",
      type: "text",
    },
    {
      name: "mountain-trip.jpg",
      type: "image",
    },
    {
      name: "graduation.mp4",
      type: "video",
    },
  ];
  const [media, setMedia] = useState(initialData);

  useEffect(() => {
    init();
    // Wait for the DOM to be ready, then start the app

    addEventListener("DOMContentLoaded", init);
  }, []);

  return (
    <>
      {/*
      <section id="user" className=" py-10">
        <h1 className="username text-center text-4xl font-bold text-blue-custom">
          Not Logged In
        </h1>
      </section>

      <button id="login">Log In</button>
      <button id="logout">Log Out</button>
  */}
      <div className="max-w-[1500px] mx-auto">
        <div>
          <SearchBar
            collectionState={media}
            setCurrentCollection={setMedia}
            keys={["name"]}
            placeholder="Start searching for your file here!"
          />
        </div>
        <div className=" flex flex-wrap">
          {media.map((m) => {
            return <Media media={m} />;
          })}
        </div>
      </div>
    </>
  );
}
