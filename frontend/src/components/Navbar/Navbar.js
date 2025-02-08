import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

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
      {/* Logo */}
      <div className={styles.logo}>
        <a href="#">FrootNoot</a>
      </div>

      {/* Normal Navigation for Large Screens */}
      {!isMobile && (
        <ul className={styles.navMenu}>
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#experiences">Experience</a></li>
          <li><a href="#contact">Contact</a></li>
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
            <li><a href="#about" onClick={toggleMenu}>About</a></li>
            <li><a href="#skills" onClick={toggleMenu}>Skills</a></li>
            <li><a href="#experiences" onClick={toggleMenu}>Experience</a></li>
            <li><a href="#contact" onClick={toggleMenu}>Contact</a></li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
