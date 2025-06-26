import React, { useState, useEffect } from 'react';
import API from '../../api';
import styles from './SummaryStats.module.css';

const SummaryStats = () => {
    const [latestWorkout, setLatestWorkout] = useState(null);
    const [latestExercises, setLatestExercises] = useState(null);
    const [workoutCountWeek, setWorkoutCountWeek] = useState(null);
    const [mostFrequentExercise, setMostFrequentExercise] = useState(null);
    const [yearlyWorkoutCount, setYearlyWorkoutCount] = useState(null);

    useEffect(() => {
        API.get('/exercises/latest')
            .then(response => {
                setLatestWorkout(response.data);
            })
            .catch(error => {
                console.error('Error fetching latest workout:', error);
            });

        API.get('/exercises/countworkouts')
            .then(response => {
                setWorkoutCountWeek(response.data);
            })
            .catch(error => {
                console.error('Error fetching workout count for the week:', error);
            });

        API.get('/exercises/frequentexercise')
            .then(response => {
                setMostFrequentExercise(response.data);
            })
            .catch(error => {
                console.error('Error fetching most frequent exercise:', error);
            });

        API.get('/exercises/yearlyWorkout', { params: { year: new Date().getFullYear() } })
            .then(response => {
                setYearlyWorkoutCount(response.data);
            })
            .catch(error => {
                console.error('Error fetching yearly workout count:', error);
            });

    }, []); 

    useEffect(() => {
        if (latestWorkout && latestWorkout.length > 0) {
            API.get(`/exercises/?workout_id=${latestWorkout[0].id}`)
                .then(response => {
                    setLatestExercises(response.data);
                })
                .catch(error => {
                    console.error('Error fetching exercises for latest workout:', error);
                });
        }
    }, [latestWorkout]);

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
