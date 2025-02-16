import React from "react";
import styles from "./ExerciseDisplay.module.css";

function ExerciseDisplay({exerciseID}) {
  return (
    <div className={styles.footer}> 
    <h1> {exerciseID} </h1>

    </div>
  );
}

export default ExerciseDisplay;
