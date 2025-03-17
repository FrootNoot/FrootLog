import React, { useState, useEffect } from "react";
import styles from "./Divider.module.css";

function Divider() {


  return (
    <div id="divider" className={styles.Divider}>      
      <h1> Check out my progress ! </h1>
      <p>A personal web app where I track my workouts, progress, and goals. <br />Feel free to browse through my stats and see how things are going! </p>
    </div>
  );
}

export default Divider;
