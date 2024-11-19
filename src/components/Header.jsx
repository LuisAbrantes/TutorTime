import React from 'react';
import 'tailwindcss/tailwind.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="logo flex items-center">
        <img src="/logo.png" alt="Logo TutorTime" className="w-10 h-10 rounded-full mr-2" />
        <span className="text-xl font-bold">TutorTime - IFSP</span>
      </div>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/home" className="hover:text-gray-400">Home</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-400">About</Link>
          </li>
          <li>
            <Link to="/manage" className="hover:text-gray-400">Manage</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
