import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.footer}>
      <ul>
        <li><a href="">Github</a></li>
        <li><a href="">LinkedIn</a></li>
        <li><a href="">Email</a></li>


      </ul>
    </div>
  );
}

export default Footer;
