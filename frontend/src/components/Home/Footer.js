import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.footer}>
      <ul>
        <li><a href="">Twitter</a></li>
        <li><a href="">Codepen</a></li>
        <li><a href="">Email</a></li>
        <li><a href="">Dribbble</a></li>
        <li><a href="">Github</a></li>

      </ul>
    </div>
  );
}

export default Footer;
