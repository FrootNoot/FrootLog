import styles from './WorkoutItem.module.css';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import EditWorkoutModal from './EditWorkoutModal'; // Import modal component

function WorkoutItem({ workout, admin}) {
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

  const refresh = async () =>{
    setIsModalOpen(false)
    fetchExercises()
  }


  const buttonClass = !isModalOpen ? styles.buttonActive : styles.buttonInactive;
  return (
    <div className={styles.workoutItem}>
      <h2>Workout on {workout.date}</h2>

      { exercises.map((exercise, index) => (
        <div key={index} className={styles.exerciseItem}>
          <p className={styles.exerciseName}>{exercise.name}</p>
          <p>Sets: {exercise.sets}</p>
          <p>Reps: {exercise.reps.join(', ')}</p>
          <p>Weight: {exercise.weight}kg</p>
        </div>))
        }
      {admin && (<button className={buttonClass} onClick={() => setIsModalOpen(!isModalOpen)}>Edit Workout</button>)}

      {isModalOpen && (
        <EditWorkoutModal
          workout={workout}
          exercises={exercises}
          onClose={refresh}
        />
      )}
    </div>
  );
}

export default WorkoutItem;

