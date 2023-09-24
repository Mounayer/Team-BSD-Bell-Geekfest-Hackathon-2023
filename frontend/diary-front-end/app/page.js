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
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Column (Image) */}
          <div className="hidden lg:block mt-10">
            <img
              src="logo-name-nowhite.png"
              alt="Image"
              className="w-full h-auto"
            />
          </div>

          {/* Right Column */}
          <div>
            <h1 className="text-4xl font-bold text-blue-custom font-extrabold font-montserrat text-center mt-10">
              Welcome to Lock-it
            </h1>
            <br></br>
            <section id="user" className=" py-10">
            <h1 className="username text-left text-2xl font-bold text-blue-custom font-extrabold font-montserrat">
              You are not Logged In. <br></br><br></br>
              Log In or create an account and start storing securely now <br />
              Lock-it makes use of Amazon Web Services to insure that your data
              will be safe.
              <br /><br></br>
              All the stored data is encrypted, Only you will be able to access
              your data
            </h1>
          </section>

            {/* CoolCards */}
            <div className="flex justify-center m-10 w-4/5">
              {/* <button id="login">Log In</button> */}
              {/* <button id="logout">Log Out</button> */}
              <div className="grid grid-cols-2 gap-20 justify-items-center">
                <CoolCard name="Log In" id="login"></CoolCard>

                <CoolCard name="Vault" href="/library" id="library"></CoolCard>
                <CoolCard name="Plans" href="/subscription" id="subscr"></CoolCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
