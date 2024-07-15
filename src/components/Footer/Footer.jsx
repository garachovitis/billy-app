import React from 'react';
import { NavLink } from 'react-router-dom';
import './footer.css';
import HomeIcon from '../../icons/Home.png'; // Update path accordingly
import CategoriesIcon from '../../icons/Categories.png';
import ScheduleIcon from '../../icons/Schedule.png';
import SettingsIcon from '../../icons/Settings.png';

function Footer() {
  return (
    <div className="footer">
      <NavLink to="/"><img src={HomeIcon} alt="Home" /></NavLink>
      <NavLink to="/categories"><img src={CategoriesIcon} alt="Categories" /></NavLink>
      <NavLink to="/schedule"><img src={ScheduleIcon} alt="Schedule" /></NavLink>
      <NavLink to="/settings"><img src={SettingsIcon} alt="Settings" /></NavLink>
    </div>
  );
}

export default Footer;