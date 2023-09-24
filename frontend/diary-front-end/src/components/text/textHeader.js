import React from 'react';

const Header = ({ text }) => {
  return (
    <header className="py-4 text-white font-almarai font-semibold text-2xl text-center">
      {text}
    </header>
  );
};

export default Header;
