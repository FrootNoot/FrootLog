import React, { useState } from "react";
import axios from "axios";
import styles from "./EditWorkoutModal.module.css";

const EditWorkoutModal = ({ workout, exercises, onClose, refreshExercises }) => {
  const today = new Date().toISOString().split('T')[0];

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

    const validationErrors = [];


    exerciseData.forEach((exercise, index) => {
      const sets = Number(exercise.sets);
      const reps = exercise.reps.length;

      if (sets && reps && sets !== reps) {
          validationErrors.push(
              `The number of reps (${reps}) does not match the number of sets (${sets}) for exercise: ${exercise.name}.`
          );
      }
    });

    if (validationErrors.length > 0) {
      alert(validationErrors.join('\n')); 
      return;
  }


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

      <div className={styles.inputRow}>
        <div>
          <label >Bodyweight:</label>
          <input
          id={styles.bodyWeightIn}
            type="number"
            name="bodyweight"
            value={workoutData.bodyweight}
            onChange={handleWorkoutChange}
            min="1" max="999"
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={workoutData.date}
            onChange={handleWorkoutChange}
            required
            max={today}
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
            min="1"
            max="999"
            required
          />
          </div>
          <div>
          <label>Sets:</label>
          <input
            type="number"
            value={exercise.sets}
            onChange={(e) => handleExerciseChange(index, "sets", e.target.value)}
            min="1"
            max="999"
          />
          </div>
          <div>
          <label>Reps:</label>
          <input
            type="text"
            value={exercise.reps.join(",")}
            onChange={(e) =>
              handleExerciseChange(index, "reps", e.target.value.split(","))
            }
            pattern="^(\d+)(,\d+)*$"
            required
            title="Reps must match sets and be comma-seperated e.g. (7,7,8)"
          />
          </div>
        </div>
      ))}

      <div className={styles.buttonRow}>
        <button type="submit" onClick={handleWorkoutUpdate}>Save Changes</button>
        <button onClick={handleDeleteWorkout}>Delete Workout</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditWorkoutModal;
