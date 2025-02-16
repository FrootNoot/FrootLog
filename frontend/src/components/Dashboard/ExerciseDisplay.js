import React from "react";
import styles from "./ExerciseDisplay.module.css";

const ExerciseDisplay = ({ exerciseID, bodyweight, date }) => {
  console.log(exerciseID, bodyweight, date); // Log props to verify they are being passed correctly

  return (
    <div>
      <p>Exercise ID: {exerciseID}</p>
      <p>Bodyweight: {bodyweight}</p>
      <p>Date: {date}</p>
    </div>
  );
};

export default ExerciseDisplay;

