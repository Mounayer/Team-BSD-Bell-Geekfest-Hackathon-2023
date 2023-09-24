/**
 *
 * Neat lil-footer
 */
function Footer() {
  return (
    <header className="bg-blue-custom p-4  ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">Lock-it</div>
        <nav className="space-x-5">
          <a href="/" className="text-white hover:text-teal-200">
            Home
          </a>
          <a href="#" className="text-white hover:text-teal-200">
            Help
          </a>
          <a href="/about-us" className="text-white hover:text-teal-200">
            About Us
          </a>
          <a href="#" className="text-white hover:text-teal-200">
            FAQ
          </a>
          <a href="/policies" className="text-white hover:text-teal-200">
            Policies
          </a>
        </nav>
        <div className="text-sm text-white">&copy; 2023 Lock-It</div>
      </div>
    </header>
  );
}

export default Footer;
