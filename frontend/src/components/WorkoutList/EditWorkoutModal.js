import React, { useState } from "react";
import axios from "axios";
import styles from "./EditWorkoutModal.module.css";

const EditWorkoutModal = ({ workout, exercises, onClose, refreshExercises }) => {
  const [workoutData, setWorkoutData] = useState({
    bodyweight: workout.bodyweight,
    date: workout.date.split("T")[0], // Format date for input
  });

  const [exerciseData, setExerciseData] = useState(exercises);

  // Handle workout field changes
  const handleWorkoutChange = (e) => {
    setWorkoutData({ ...workoutData, [e.target.name]: e.target.value });
  };

  // Handle exercise field changes
  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = [...exerciseData];
    updatedExercises[index][field] = value;
    setExerciseData(updatedExercises);
  };

  // Submit workout update
  const handleWorkoutUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/exercises/updateworkout/${workout.id}`, workoutData);
      
      await Promise.all(
        exerciseData.map((exercise) =>
          axios.put(`http://localhost:5000/exercises/updateExercise/${exercise.workoutexerciseid}`, exercise)
        )
      );

      refreshExercises(); // Refresh UI
      onClose();
    } catch (error) {
      console.error("Failed to update workout:", error);
    }
  };

  // Delete Workout & Exercises
  const handleDeleteWorkout = async () => {
    if (!window.confirm("Are you sure you want to delete this workout?")) return;

    try {
      await axios.delete(`http://localhost:5000/exercises/deleteWorkout/${workout.id}`);
      onClose();
      refreshExercises();
    } catch (error) {
      console.error("Failed to delete workout:", error);
    }
  };

  return (
    <div className={styles.editModal}>
      <h2>Edit Workout</h2>

      {/* Inputs on the same row */}
      <div className={styles.inputRow}>
        <div>
          <label >Bodyweight (kg):</label>
          <input
          id={styles.bodyWeightIn}
            type="number"
            name="bodyweight"
            value={workoutData.bodyweight}
            onChange={handleWorkoutChange}
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={workoutData.date}
            onChange={handleWorkoutChange}
          />
        </div>
      </div>

      <h3>Edit Exercises</h3>
      {exerciseData.map((exercise, index) => (
        <div className={styles.exerciseRow} key={exercise.id}>
          <p>{exercise.name}</p>
          <div> 
          <label>Weight (kg):</label>
          <input
            type="number"
            value={exercise.weight}
            onChange={(e) => handleExerciseChange(index, "weight", e.target.value)}
          />
          </div>
          <div>
          <label>Sets:</label>
          <input
            type="number"
            value={exercise.sets}
            onChange={(e) => handleExerciseChange(index, "sets", e.target.value)}
          />
          </div>
          <div>
          <label>Reps:</label>
          <input
            type="text"
            value={exercise.reps.join(",")}
            onChange={(e) =>
              handleExerciseChange(index, "reps", e.target.value.split(",").map(Number))
            }
          />
          </div>
        </div>
      ))}

      <div className={styles.buttonRow}>
        <button onClick={handleWorkoutUpdate}>Save Changes</button>
        <button onClick={handleDeleteWorkout}>Delete Workout</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditWorkoutModal;
