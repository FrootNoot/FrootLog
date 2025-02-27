import styles from './WorkoutItem.module.css';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import EditWorkoutModal from './EditWorkoutModal'; // Import modal component

function WorkoutItem({ workout }) {
  const [exercises, setExercises] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const fetchExercises = useCallback(async () => {
    try {
      console.log(`Fetching exercises for workout ID: ${workout.id}`);
      const response = await axios.get(`http://localhost:5000/exercises/`, {
        params: { workout_id: workout.id }
      });
      setExercises(response.data);
    } catch (error) {
      console.error('Error fetching exercises: ', error);
    }
  }, [workout.id]);

  useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);

  return (
    <div>
      <h2>Workout on {workout.date}</h2>

      {exercises.map((exercise, index) => (
        <div key={index} className={styles.exerciseItem}>
            <p><strong>{exercise.name}</strong></p>
            <p>Sets: {exercise.sets}, Reps: {exercise.reps.join(", ")} Weight: {exercise.weight}kg</p>
        </div>
      ))}

      <button onClick={() => setIsModalOpen(true)}>Edit Workout</button>

      {isModalOpen && (
        <EditWorkoutModal
          workout={workout}
          exercises={exercises}
          onClose={() => setIsModalOpen(false)}
          refreshExercises={fetchExercises} // Refresh exercises after editing
        />
      )}
    </div>
  );
}

export default WorkoutItem;

/*

                {latestExercises && latestExercises.length > 0 && (
                    latestExercises.map((exercise, index) => (
                        <div key={index} className={styles.exerciseItem}>
                            <p><strong>{exercise.name}</strong></p>
                            <p>Sets: {exercise.sets}, Reps: {exercise.reps}, Weight: {exercise.weight}kg</p>
                        </div>
                    ))
                )}
            </div>
*/