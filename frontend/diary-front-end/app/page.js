"use client";
import { init } from "./../src/app";
import { useEffect } from "react";
import { useState } from "react";

export default function Home() {
  // On second render
  useEffect(() => {
    init();
    // Wait for the DOM to be ready, then start the app

    addEventListener("DOMContentLoaded", init);
  }, []);

  return (
    <>
      <h1>Hello World</h1>
      <button id="login">Log In</button>
      <button id="logout">Log Out</button>
      <section id="user">
        <p className="username">Not Logged In</p>
      </section>
    </>
  );
}
