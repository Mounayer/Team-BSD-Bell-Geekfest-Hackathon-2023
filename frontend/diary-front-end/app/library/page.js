"use client";
import { init } from "@/src/app";
import { useEffect } from "react";
import { useState } from "react";
import useUser from "@/src/hooks/useUser";
import Media from "./Media";
import SearchBar from "@/src/components/SearchBar";
import CoolCard from "@/src/components/card";
import Link from "next/link";

export default function Home() {
  const [metadata, setMetadata] = useState([]);
  const [filteredMetadata, setFilteredMetadata] = useState([]);
  const user = useUser();

  useEffect(() => {
    // Wait for the DOM to be ready, then start the app
    addEventListener("DOMContentLoaded", init);
    if (user) {
      fetch(`https://${process.env.NEXT_PUBLIC_API_URL}/getalluserfiles`, {
        headers: {
          Authorization: `Bearer ${user.idToken}`,
        },
      })
        .then((req) => {
          console.log(req);
          return req.json();
        })
        .then((json) => {
          console.log(json);
          setMetadata(json);
          setFilteredMetadata(json);
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
           
            <h1 className="font-semibold text-custom-blue text-4xl text-center my-6">
              Your Lock-it Library
            </h1>

            <h2 className="font-semibold text-custom-blue text-lg mb-3">
              Search your files now! Click on the file icon to download
            </h2>

            <div className="flex items-center">
              {/* Search Bar */}
              <div className="flex-grow">
                <SearchBar
                  collectionState={metadata}
                  setCurrentCollection={setFilteredMetadata}
                  keys={["file_name"]}
                  placeholder="Start searching for your file here!"
                />
              </div>

              {/* Button Next to Search Bar */}
              <div className="ml-5">
                <h2 className="font-semibold text-custom-blue text-lg mb-3">
                  Upload new file
                </h2>
                <Link href="/form">
                  <button className="bg-blue-custom text-white hover:bg-teal-200 hover:text-black py-2 px-4 rounded">
                    Add File
                  </button>
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap">
              {filteredMetadata.map((m) => {
                console.log(m);
                return (
                  <div key={m._id}>
                    <Media media={m} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {!user && <h1>You are not logged in!</h1>}
    </>
  );
}
