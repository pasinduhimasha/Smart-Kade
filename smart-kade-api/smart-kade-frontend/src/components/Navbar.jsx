import { useState } from "react";
import { Link } from "react-router-dom";
import "../style/Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
   <nav className="navbar">
  <div className="logo">
    <img src="/images/smart_kade_logo.jpg" alt="Smart Kade Logo" className="logo-img" />
    <span>Smart Kade</span>
  </div>
  
      {/* Nav links */}
      <ul className={`nav-links ${open ? "active" : ""}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/whychooseus">Why Choose Us</Link></li>
        <li>
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        </li>
      </ul>

      {/* Hamburger for mobile */}
      <div className="hamburger" onClick={() => setOpen(!open)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;
