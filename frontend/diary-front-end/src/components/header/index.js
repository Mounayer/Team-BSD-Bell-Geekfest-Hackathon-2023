'use client';
import useUser from "@/src/hooks/useUser";

function Header() {
  const user = useUser();
  console.log(user);

  return (
    <header className="bg-blue-custom py-6 relative">
      <div className="container mx-auto text-center text-white font-bold text-xl">
        <a href="/" className="text-white hover:text-teal-200">
          LockIt
        </a>
      </div>
      {!user && (
        <button id="login" className={` ${user ? 'block' : 'hidden'} top-4 absolute right-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}>
          Log In
        </button>
      )}
      {user && (
        <button
          id="logout"
          className={` ${user ? 'block' : 'hidden'} top-4 absolute right-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
        >
          Log out
        </button>
      )}
    </header>
  );
}

export default Header;
