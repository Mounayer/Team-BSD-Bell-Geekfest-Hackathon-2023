function Header() {
  const user = useUser();
  console.log(user);

  return (
    <header className="bg-blue-custom p-4">
      <div className="container mx-auto flex justify-center items-center">
        <a href="/">
          <img src="logo-name.png" alt="Logo" className="w-auto h-10 " />
        </a>
      </div>
    </header>
  );
}

export default Header;
