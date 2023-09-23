"use client";
import { init } from "./../src/app";
import { useEffect } from "react";
import { useState } from "react";
import useUser from "@/src/hooks/useUser";
import Media from "./Media";
import SearchBar from "@/src/components/SearchBar";
import ExclamationIcon from "@/src/components/icons/ExclamationIcon";

export default function Home() {
  const [metadata, setMetadata] = useState([]);
  const user = useUser();

  useEffect(() => {
    init();
    // Wait for the DOM to be ready, then start the app
    addEventListener("DOMContentLoaded", init);
    if (user) {
      fetch(
        `http://${process.env.NEXT_PUBLIC_API_URL}/getalluserfiles?username=${user.username}`
      )
        .then((req) => {
          console.log(req);
          return req.json();
        })
        .then((json) => {
          console.log(json);
          setMetadata(json);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [user]);

  return (
    <>
      {user && (
        <div>
          <div className="max-w-[1500px] mx-auto">
            <div>
              <SearchBar
                collectionState={metadata}
                setCurrentCollection={setMetadata}
                keys={["name"]}
                placeholder="Start searching for your file here!"
              />
            </div>
            <div className=" flex flex-wrap">
              {metadata.map((m) => {
                console.log(m);
                return (
                  <div>
                    <Media key={m._id} media={m} />
                  </div>
                );
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
