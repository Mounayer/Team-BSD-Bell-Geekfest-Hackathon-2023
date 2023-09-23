"use client";
import { init } from "./../src/app";
import { useEffect } from "react";
import { useState } from "react";
import Media from "./Media";
import SearchBar from "@/src/components/SearchBar";
import { getUser } from "@/src/auth";
import ExclamationIcon from "@/src/components/icons/ExclamationIcon";

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
  const [user, setUser] = useState(null);

  useEffect(() => {
    init();
    // Wait for the DOM to be ready, then start the app
    addEventListener("DOMContentLoaded", init);

    getUser().then((user) => setUser(user));
  }, []);

  return (
    <>
      <button id="login" className=" py-2 px-3 border border-black">
        Log in
      </button>
      {user && (
        <div>
          <div className=" w-full py-6 px-4">
            <button id="logout">Log out</button>
          </div>
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
        </div>
      )}
      {!user && (
        <div className=" flex flex-col pt-[150px] items-center justify-center">
          <span className=" text-yellow-400 font-bold text-[50px]">
            <ExclamationIcon />
          </span>
          <span className=" py-4 text-lg">You are not logged in!</span>
        </div>
      )}
    </>
  );
}
