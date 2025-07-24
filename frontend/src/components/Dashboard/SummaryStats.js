import React, { useState, useEffect } from 'react';
import API from '../../api';
import styles from './SummaryStats.module.css';

// Utility function to get/set cache with expiration
const getCachedData = (key, ttl = 5 * 60 * 1000) => { // 5 minutes TTL
  const cached = localStorage.getItem(key);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < ttl) {
      return data;
    }
  }
  return null;
};

const setCachedData = (key, data) => {
  localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
};

const SummaryStats = () => {
  const [latestWorkout, setLatestWorkout] = useState(getCachedData('latestWorkout'));
  const [latestExercises, setLatestExercises] = useState(getCachedData('latestExercises'));
  const [workoutCountWeek, setWorkoutCountWeek] = useState(getCachedData('workoutCountWeek'));
  const [mostFrequentExercise, setMostFrequentExercise] = useState(getCachedData('mostFrequentExercise'));
  const [yearlyWorkoutCount, setYearlyWorkoutCount] = useState(getCachedData('yearlyWorkoutCount'));

  useEffect(() => {
    if (!latestWorkout) {
      API.get('/exercises/latest')
        .then(response => {
          setLatestWorkout(response.data);
          setCachedData('latestWorkout', response.data);
        })
        .catch(error => {
          console.error('Error fetching latest workout:', error);
        });
    }

    if (!workoutCountWeek) {
      API.get('/exercises/countworkouts')
        .then(response => {
          setWorkoutCountWeek(response.data);
          setCachedData('workoutCountWeek', response.data);
        })
        .catch(error => {
          console.error('Error fetching workout count for the week:', error);
        });
    }

    if (!mostFrequentExercise) {
      API.get('/exercises/frequentexercise')
        .then(response => {
          setMostFrequentExercise(response.data);
          setCachedData('mostFrequentExercise', response.data);
        })
        .catch(error => {
          console.error('Error fetching most frequent exercise:', error);
        });
    }

    if (!yearlyWorkoutCount) {
      API.get('/exercises/yearlyWorkout', { params: { year: new Date().getFullYear() } })
        .then(response => {
          setYearlyWorkoutCount(response.data);
          setCachedData('yearlyWorkoutCount', response.data);
        })
        .catch(error => {
          console.error('Error fetching yearly workout count:', error);
        });
    }
  }, []);

  useEffect(() => {
    if (latestWorkout && latestWorkout.length > 0 && !latestExercises) {
      API.get(`/exercises/?workout_id=${latestWorkout[0].id}`)
        .then(response => {
          setLatestExercises(response.data);
          setCachedData('latestExercises', response.data);
        })
        .catch(error => {
          console.error('Error fetching exercises for latest workout:', error);
        });
    }
  }, [latestWorkout, latestExercises]);
    return (
        <div className={styles.summaryContainer}>
            <h1>Froot Noot Stats</h1>

            <div className={styles.stat}>
                {latestWorkout && ( <div>
                    <p> Current weight</p> <h2>{latestWorkout[0].bodyweight}</h2>
                    </div>)}
            </div>

            <div className={styles.stat}>
                {mostFrequentExercise && (<div>
                    <p>{mostFrequentExercise[0].name} frequency</p> <h2>{mostFrequentExercise[0].count_value} </h2>
                    </div>)}
            </div>

            <div className={styles.stat}> 
                {workoutCountWeek && (<div>
                    <p>Workouts this week</p> <h2>{workoutCountWeek[0].total_workouts}</h2>
                    </div>)}
            </div>

            <div className={styles.stat}> 
                {yearlyWorkoutCount && (<div>
                    <p>Workouts this year</p> <h2>{yearlyWorkoutCount[0].count}</h2>
                    </div>)}
            </div>

            <div className={styles.recentWorkout}>
                {latestWorkout && latestWorkout.length > 0 && (
                    <h2>Latest Workout on {latestWorkout[0].date}</h2>
                )}
                {latestExercises && latestExercises.length > 0 && (
                latestExercises.map((exercise, index) => (
                    <div key={index} className={styles.exerciseItem}>
                        <p className={styles.exerciseName}>{exercise.name}</p>
                        <p>Sets: {exercise.sets}</p>
                        <p>Reps: {exercise.reps.join(', ')}</p>
                        <p>Weight: {exercise.weight}kg</p>
                    </div>
                ))

                )}
            </div>
        </div>
    );
};

export default SummaryStats;
