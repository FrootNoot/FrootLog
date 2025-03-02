import React, { useState, useEffect } from "react";
import styles from "./HeroSection.module.css";

function HeroSection() {

  return (
    <div id={styles.mainParent}>

      <div id={styles.firstHalf} className={styles.halfContainer}>
        <h1>first half</h1>
      </div>

      <div id={styles.secondHalf} className={styles.halfContainer}>
        <h1>second half</h1>
      </div>

    </div>
  );
}

export default HeroSection;
