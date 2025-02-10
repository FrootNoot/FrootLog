import React, { useState, useEffect } from "react";
import styles from "./HeroSection.module.css";

function HeroSection() {

  return (
    <div id={styles.mainParent}>
      <h1>FROOTNOOT.FIT</h1>
      <div id={styles.introContainer}>
        <div id={styles.introText}>
        <h1>check my progress</h1>
        <p>wagabaga wagabaga wagabaga </p>
        </div>
        <div id={styles.imgPlaceholder}> image place holder </div>
      </div>
    </div>
  );
}

export default HeroSection;
