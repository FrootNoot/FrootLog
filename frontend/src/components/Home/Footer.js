import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.footer}>
      <ul>
        <li><a href="https://github.com/FrootNoot" target="_blank" rel="noopener noreferrer">Github</a></li>
        <li><a href="https://www.linkedin.com/in/andrew-li-27843a278/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        <li><a href="https://frootnoot.dev" target="_blank" rel="noopener noreferrer">Developer website</a></li>
      </ul>
    </div>
  );
}

export default Footer;
