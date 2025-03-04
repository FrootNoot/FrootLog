import React, { useState, useEffect } from "react";
import styles from "./HeroSection.module.css";

function HeroSection() {

  const pulses = [
    { id: 1, color: "linear-gradient(90deg, #F5BEBE, #fa6b3e, #FF4848)", animation: "animate-pulse-1" },
    { id: 2, color: "linear-gradient(90deg, #F3E2E2, #E39CFF,rgb(255, 56, 228)", animation: "animate-pulse-2" },
    { id: 3, color: "linear-gradient(90deg, #F3E2E2, #7AADF1,rgb(0, 13, 255))", animation: "animate-pulse-3" },
  ];

  return (
    <div id={styles.mainParent}>

      <div id={styles.firstHalf} className={styles.halfContainer}>
        <h1>frootnoot.fit</h1>
        <h2>my personal gym tracker</h2>
      </div>

      <div id={styles.secondHalf} className={styles.halfContainer}>
          <div className={styles.pulse}> </div>
          <div className={styles.pulse}> </div>
          <div className={styles.pulse}> </div>

      </div>

    </div>
  );
}

export default HeroSection;
