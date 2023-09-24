"use client";
import { init } from "./../src/app";
import { useEffect } from "react";
import { useState } from "react";
import { getUser } from "@/src/auth";
import { useRouter } from 'next/navigation'


export default function Home() {
  
  const router = useRouter()
  useEffect(() => {
    init();
    // Wait for the DOM to be ready, then start the app

    addEventListener("DOMContentLoaded", init);
  }, []);

  


  return (
    <>
      <section id="user" className=" py-10">
        <h1 className="username text-center text-4xl font-bold text-blue-custom">
          Not Logged In
        </h1>
      </section>
      <button type="button" onClick={() => router.push('/form')}>
      Form
      </button>

     
    

      <button id="login">Log In</button>
      <button id="logout">Log Out</button>
    </>
  );
}
