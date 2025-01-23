import styles from './WorkoutList.module.css';
import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';

function WorkoutList() {

  const [workouts, setWorkouts] = useState([]);

  const fetchWorkouts = useCallback(async () => {
    try {
        console.log("test")
      const response = await axios.get('http://localhost:5000/workouts'); 
      console.log(response.data);
      setWorkouts(response.data);
    } catch (error) {
      console.error('Error fetching workouts: ', error);
    }
  }, []);

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  return (
    <ul className={styles.list}>
      {workouts.map(workouts => (
            <li>
            <span className={styles.text}>
                {workouts.id} 
            </span>
            <span className={styles.text}>
                {workouts.workout_name}
            </span>
            </li>
      ))}
    </ul>
  );

}

export default WorkoutList;
