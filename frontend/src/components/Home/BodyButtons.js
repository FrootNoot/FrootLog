import React, { useState, useEffect } from "react";
import styles from "./BodyButtons.module.css";

function BodyButtons() {

  return (
    <div className={styles.animationHolder}> 
      <div className={styles.mainArea}>
         <div className={styles.circles}>
         <h1 className={styles.title}>test</h1>

          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
         </div>
      </div>
      <div id={styles.reverse} className={styles.RmainArea}> 
      <div className={styles.Rcircles}>
      <h1 className={styles.title}>test</h1>

          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
         </div>
      </div>
    </div>
  );
}

export default BodyButtons;
