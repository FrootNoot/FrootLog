import styles from './WorkoutItem.module.css';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function WorkoutItem({ workout }) {
  const [exercises, setExercises] = useState([]);

  const fetchExercises = useCallback(async () => {
    try {
      console.log(workout.id);
      const response = await axios.get('http://localhost:5000/exercises');
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
      <span>{workout.id}</span> 
    </li>
  );
}

export default WorkoutItem;
