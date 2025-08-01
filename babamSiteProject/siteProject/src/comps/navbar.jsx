import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Ahmet İdilman</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Anasayfa</Link></li>
        <li><Link to="/about">Özgeçmişim</Link></li>
        <li><Link to="/books">Kitaplar</Link></li>
        <li><Link to="/contact">İletişim</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
