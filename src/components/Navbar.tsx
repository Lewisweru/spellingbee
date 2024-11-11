import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Spelling Bee</Link>
      </div>
      <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/practice">Practice</Link>
        </li>
        <li>
          <Link to="/compete">Compete</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>
    </nav>
  );
};

export default Navbar;
