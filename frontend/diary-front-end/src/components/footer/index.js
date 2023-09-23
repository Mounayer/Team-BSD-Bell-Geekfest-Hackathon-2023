function Footer() {
  return (
    <header className="bg-blue-custom p-4  ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">LockIt</div>
        <nav className="space-x-4">
          <a href="#" className="text-white hover:text-teal-200">
            Help
          </a>
          <a href="#" className="text-white hover:text-teal-200">
            About Us
          </a>
          <a href="#" className="text-white hover:text-teal-200">
            FAQ
          </a>
          <a href="#" className="text-white hover:text-teal-200">
            Policies
          </a>
        </nav>
        <div className="text-sm text-white">&copy; 2023 LockIt</div>
      </div>
    </header>
  );
}

export default Footer;
