import React, { useState, useEffect } from "react";
import styles from "./HeroSection.module.css";

function HeroSection() {

  return (
    <div id={styles.mainParent}>

      <div id={styles.firstHalf} className={styles.halfContainer}>
        <h1>frootnoot.fit</h1>
        <h2>my personal gym tracker</h2>
      </div>

      <div id={styles.secondHalf} className={styles.halfContainer}>
          <div className={styles.pulse}>
        </div>
      </div>

    </div>
  );
}

export default HeroSection;
