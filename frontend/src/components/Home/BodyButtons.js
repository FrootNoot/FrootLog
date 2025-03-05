import {Link} from 'react-router-dom'
import React, { useState, useEffect } from "react";
import styles from "./BodyButtons.module.css";

function BodyButtons() {

  return (
    <div className={styles.animationHolder}> 
      <div className={styles.mainArea}>
         <div className={styles.circles}>
          <Link to={"/GuestDashboard"}>
         <h1 className={styles.title}>View Progress</h1>
         </Link>
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
      <Link to={"/AdminDashboard"}>
      <h1 className={styles.title}>Admin login</h1>
      </Link>

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
