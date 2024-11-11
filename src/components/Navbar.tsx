import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router
import { Brain, Trophy, BookOpen, Menu, X } from 'lucide-react'; // Adding icons for mobile menu

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle the mobile menu visibility
  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white/10 backdrop-blur-lg border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Brain className="h-8 w-8 text-white" />
            <span className="ml-2 text-xl font-bold text-white">SpellMaster</span>
          </div>

          {/* Mobile Hamburger Icon */}
          <div className="lg:hidden flex items-center">
            <button className="text-white" onClick={toggleMenu}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Navbar Links */}
          <div className={`lg:flex space-x-4 ${isMobileMenuOpen ? 'block' : 'hidden'} lg:block`}>
            <Link to="/" className="text-white hover:bg-white/10 px-3 py-2 rounded-md flex items-center">
              <Trophy className="h-5 w-5 mr-1" />
              Compete
            </Link>
            <Link to="/practice" className="text-white hover:bg-white/10 px-3 py-2 rounded-md flex items-center">
              <BookOpen className="h-5 w-5 mr-1" />
              Practice
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

