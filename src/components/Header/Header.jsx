import React, { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';

import './header.css';
import billLogo from '../../icons/F_BILLY_LOGO.png'; // Update the path according to your project structure

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);

  const handleClickOutside = useCallback((event) => {
    if (isMenuOpen && !event.target.closest('.menu') && !event.target.closest('.burger')) {
      setIsMenuOpen(false);
    }
  }, [isMenuOpen]);

  useEffect(() => {
    setIsTextVisible(true);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen, handleClickOutside]);

  return (
    <div className="header">
      <NavLink to="/" className="logo-link">
        <img src={billLogo} alt="Logo" className="logo" />
        <div className={`greeting-text ${isTextVisible ? 'greeting-text-show' : ''}`}>
          Γεία σου User
        </div>
      </NavLink>
      <div className={`burger ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <span className="burgerLine" />
        <span className="burgerLine" />
        <span className="burgerLine" />
      </div>
      {isMenuOpen && <div className="overlay" />}
      {isMenuOpen && (
        <div className="menu">
          <NavLink to="/profile" className="menu-item">Προφίλ</NavLink>
          <NavLink to="/NewAccount" className="menu-item">Νέος Λογαριασμός</NavLink>
          <NavLink to="/saved" className="menu-item">Αποθηκευμένα</NavLink>
          <NavLink to="/about-us" className="menu-item">Σχετικά με εμάς</NavLink>
        </div>
      )}
    </div>
  );
}

export default Header;