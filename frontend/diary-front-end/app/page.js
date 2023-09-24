"use client";
import { init } from "./../src/app";
import { useEffect } from "react";
import { useState } from "react";
import { getUser } from "@/src/auth";
import { useRouter } from "next/navigation";
import CoolCard from "@/src/components/card";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    init();
    // Wait for the DOM to be ready, then start the app

    addEventListener("DOMContentLoaded", init);
  }, []);

  return (
    <>
      <br></br>
      <section id="user" className=" py-10">
        <h1 className="username text-center text-4xl font-bold text-blue-custom font-extrabold font-montserrat">
          Not Logged In
        </h1>
      </section>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      {/* <button id="login">Log In</button> */}
      {/* <button id="logout">Log Out</button> */}
      <div className="grid grid-cols-2 gap-20 justify-items-center">
        <CoolCard name="Log In" id="login"></CoolCard>
        <CoolCard name="Store Data" href="/form"></CoolCard>
        <CoolCard name="Library" href="#"></CoolCard>
        <CoolCard name="Subscribe" href="/subscription"></CoolCard>
        <CoolCard name="Log Out" id="logout"></CoolCard>
      </div>
    </>
  );
}
