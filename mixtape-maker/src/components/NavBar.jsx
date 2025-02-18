import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Mixapes</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/songs">Songs</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;

