import React from 'react';
import { getUser } from "@/src/auth";

function Header() {
  return (
    <header className="bg-blue-custom p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/*<a href="/" className="text-white font-bold text-xl">
          Lock-it
  </a>*/}
  <a href="/">
          <img src="logo-name.png" alt="Logo" className="w-auto h-10 " />
        </a>
        <button id="logout" className="text-white hover:text-teal-200">Log Out</button>
      </div>
    </header>
  );
}

export default Header;
