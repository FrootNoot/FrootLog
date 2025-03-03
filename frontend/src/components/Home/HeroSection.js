import React, { useState, useEffect } from "react";
import styles from "./HeroSection.module.css";

function HeroSection() {

  const pulses = [
    { id: 1, color: "linear-gradient(90deg, #ff6419, #fa6b3e, #ef7a93)", animation: "animate-pulse-1" },
    { id: 2, color: "linear-gradient(90deg,rgb(0, 0, 0), #4a90e2, #00d2ff)", animation: "animate-pulse-2" },
    { id: 3, color: "linear-gradient(90deg, #4caf50, #66bb6a, #81c784)", animation: "animate-pulse-3" },
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
