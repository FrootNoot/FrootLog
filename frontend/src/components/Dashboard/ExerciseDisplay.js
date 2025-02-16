import React from "react";
import styles from "./ExerciseDisplay.module.css";
import WorkoutItem from "../WorkoutList/WorkoutItem";

const ExerciseDisplay = ({ exerciseID, bodyweight, date }) => {

  const workout = {
    id: exerciseID,
    bodyweight: bodyweight,
    date: date,
  };

  return (
    <div>
      <WorkoutItem workout={workout} />
    </div>
  );
};

export default ExerciseDisplay;
