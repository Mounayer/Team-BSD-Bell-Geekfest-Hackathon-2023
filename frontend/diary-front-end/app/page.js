"use client";
import { init } from "./../src/app";
import { useEffect } from "react";
import { useState } from "react";
import { getUser } from "@/src/auth";

export default function Home() {
  useEffect(() => {
    init();
    // Wait for the DOM to be ready, then start the app

    addEventListener("DOMContentLoaded", init);
  }, []);

  return (
    <>
      <section id="user" className=" py-10">
        <h1 className="username text-center text-4xl font-bold text-blue">
          Not Logged In
        </h1>
      </section>

      <button id="login">Log In</button>
      <button id="logout">Log Out</button>
    </>
  );
}
