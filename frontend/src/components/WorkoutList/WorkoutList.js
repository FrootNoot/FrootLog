import styles from './WorkoutList.module.css';
import axios from 'axios';
import WorkoutItem from './WorkoutItem';
import React, { useState, useEffect, useCallback } from 'react';

function WorkoutList() {

  const [workouts, setWorkouts] = useState([]);

  const fetchWorkouts = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/exercises/workouts'); 
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
      {workouts.map(workout => (
        <WorkoutItem key={workout.id} workout={workout}></WorkoutItem>
      ))}
    </ul>
  );

}

export default WorkoutList;
