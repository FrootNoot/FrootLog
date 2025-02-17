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
    <li>
      <span>Workout ID: {workout.id} </span>
      <span>Bodyweight: {workout.bodyweight}kgs </span>
      <span>Date: {workout.date} </span>

      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.id}>
            {exercise.name} - {exercise.weight}kg, {exercise.sets} sets, Reps: {exercise.reps.join(', ')}
          </li>
        ))}
      </ul>

      <button onClick={() => setIsModalOpen(true)}>Edit Workout</button>

      {isModalOpen && (
        <EditWorkoutModal
          workout={workout}
          exercises={exercises}
          onClose={() => setIsModalOpen(false)}
          refreshExercises={fetchExercises} // Refresh exercises after editing
        />
      )}
    </li>
  );
}

export default WorkoutItem;
