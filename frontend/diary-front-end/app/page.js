"use client";
import { init } from "./../src/app";
import { Fragment, useEffect } from "react";
import { useState } from "react";
import { getUser } from "@/src/auth";
import Media from "./Media";

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
  const [fragments, setFragments] = useState(initialData);

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
      <div className=" flex flex-wrap max-w-[1500px] mx-auto">
        {fragments.map((f) => {
          console.log("here");
          return <Media fragment={f} />;
        })}
      </div>
    </>
  );
}
