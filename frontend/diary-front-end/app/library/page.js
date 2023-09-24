"use client";
import { init } from "@/src/app";
import { useEffect } from "react";
import { useState } from "react";
import useUser from "@/src/hooks/useUser";
import Media from "./Media";
import SearchBar from "@/src/components/SearchBar";

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
            <div>
              <SearchBar
                collectionState={metadata}
                setCurrentCollection={setFilteredMetadata}
                keys={["file_name"]}
                placeholder="Start searching for your file here!"
              />
            </div>
            <div className=" flex flex-wrap">
              {filteredMetadata.map((m) => {
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
      {!user && <h1>You are not logged in!</h1>}
    </>
  );
}
