import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import {Link} from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  

  // Function to toggle menu state
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className={styles.navbar}>

      <div className={styles.logo}>
        
        <HashLink smooth to={"/#top"}> FrootNoot </HashLink>
      </div>

      {!isMobile && (
        <ul className={styles.navMenu}>
          <HashLink smooth to={"/#divider"} className={styles.link}> <li>About</li> </HashLink>
          <Link to={"/GuestDashboard"} className={styles.link}> <li>View</li> </Link>
          <Link to={"/AdminDashboard"} className={styles.link}> <li>Login</li> </Link>
        </ul>
      )}

      {/* Hamburger Button for Small Screens */}
      {isMobile && (
        <div className={`${styles.navButton} ${isOpen ? styles.open : ""}`} onClick={toggleMenu}>
          <i className={styles.burger}></i>
          <i className={styles.burger}></i>
          <i className={styles.burger}></i>
        </div>
      )}

      {/* Mobile Navigation Menu */}
      {isMobile && (
        <div className={`${styles.navWrapper} ${isOpen ? styles.show : ""}`}>
          <ul>
          <HashLink smooth to={"/#divider"} className={styles.link} onClick={toggleMenu}>  <li>About</li> </HashLink>
          <Link to={"/GuestDashboard"} className={styles.link} onClick={toggleMenu}> <li>View</li> </Link>
          <Link to={"/AdminDashboard"} className={styles.link} onClick={toggleMenu}> <li>Login</li> </Link>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
