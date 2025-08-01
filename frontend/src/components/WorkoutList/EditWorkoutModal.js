import { useState } from "react";
import API from "../../api";
import styles from "./EditWorkoutModal.module.css";

const EditWorkoutModal = ({ workout, exercises, onClose }) => {
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

  // Clear relevant cache entries
  const clearCaches = (year) => {
    const cacheKeys = [
      'latestWorkout',
      'latestExercises',
      'workoutCountWeek',
      'mostFrequentExercise',
      'yearlyWorkoutCount',
      `workoutHistory_${year}`,
      'bodyweightData',
      'benchData'
    ];
    cacheKeys.forEach(key => localStorage.removeItem(key));
  };

  // Submit workout update
  const handleWorkoutUpdate = async (e) => {
    e.preventDefault();
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
      await API.put(`/exercises/updateworkout/${workout.id}`, workoutData);

      await Promise.all(
        exerciseData.map((exercise) =>
          API.put(`/exercises/updateExercise/${exercise.workoutexerciseid}`, exercise)
        )
      );

      // Clear caches for the affected year
      const year = new Date(workoutData.date).getFullYear();
      clearCaches(year);

      onClose();
    } catch (error) {
      console.error("Failed to update workout:", error);
    }
  };

  // Delete Workout & Exercises
  const handleDeleteWorkout = async () => {
    if (!window.confirm("Are you sure you want to delete this workout?")) return;

    try {
      await API.delete(`/exercises/deleteWorkout/${workout.id}`);

      // Clear caches for the affected year
      const year = new Date(workoutData.date).getFullYear();
      clearCaches(year);

      onClose();
    } catch (error) {
      console.error("Failed to delete workout:", error);
    }
  };

  return (
    <form className={styles.editModal} onSubmit={handleWorkoutUpdate}>
      <h2>Edit Workout</h2>

      <div className={styles.inputRow}>
        <div>
          <label>Bodyweight:</label>
          <input
            id={styles.bodyWeightIn}
            type="number"
            name="bodyweight"
            value={workoutData.bodyweight}
            onChange={handleWorkoutChange}
            min="1"
            max="999"
            step=".01"
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
              step=".01"
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
              title="Reps must match sets and be comma-separated e.g. (7,7,8)"
            />
          </div>
        </div>
      ))}

      <div className={styles.buttonRow}>
        <button type="submit">Save Changes</button>
        <button onClick={handleDeleteWorkout}>Delete Workout</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
};

export default EditWorkoutModal;