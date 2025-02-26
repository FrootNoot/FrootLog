import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './SummaryStats.module.css';

const SummaryStats = () => {
    const [latestWorkout, setLatestWorkout] = useState(null);
    const [workoutCountWeek, setWorkoutCountWeek] = useState(null);
    const [mostFrequentExercise, setMostFrequentExercise] = useState(null);
    const [yearlyWorkoutCount, setYearlyWorkoutCount] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/exercises/latest')
            .then(response => {
                setLatestWorkout(response.data);
            })
            .catch(error => {
                console.error('Error fetching latest workout:', error);
            });

        axios.get('http://localhost:5000/exercises/countworkouts')
            .then(response => {
                setWorkoutCountWeek(response.data);
            })
            .catch(error => {
                console.error('Error fetching workout count for the week:', error);
            });

        axios.get('http://localhost:5000/exercises/frequentexercise')
            .then(response => {
                setMostFrequentExercise(response.data);
            })
            .catch(error => {
                console.error('Error fetching most frequent exercise:', error);
            });

        axios.get('http://localhost:5000/exercises/yearlyWorkout', { params: { year: (new Date().getFullYear()) }, })
            .then(response => {
                setYearlyWorkoutCount(response.data);
            })
            .catch(error => {
                console.error('Error fetching yearly workout count:', error);
            });
    }, []); 

    return (
        <div className={styles.summaryContainer}>
            <h1>Froot Noot Stats</h1>
            
            <div className={styles.stat}>
                {latestWorkout && ( <div>
                    <p> Current Bodyweight</p> <h2>{latestWorkout[0].bodyweight}</h2>
                    </div>)}
            </div>

            <div className={styles.stat}>
                {mostFrequentExercise && (<div>
                    <p>{mostFrequentExercise[0].name} frequency</p> <h2>{mostFrequentExercise[0].count_value} </h2>
                    </div>)}
            </div>


            <div className={styles.stat}> 
                {workoutCountWeek && (<div>
                    <p> Workouts this week </p> <h2>{workoutCountWeek[0].total_workouts}</h2>
                    </div>)}

            </div>


            <div className={styles.stat}> 
            {yearlyWorkoutCount && (<div>
                <p>Workouts this year</p> <h2>{yearlyWorkoutCount[0].count}</h2>
                </div>)}
            </div>

            <div id={styles.recentWorkout}>
                Workout stuff
            </div>
        </div>
    );
};

export default SummaryStats;

/*

            {latestWorkout && (
                <div>
                    <h2>Latest Workout</h2>
                    <p>ID: {latestWorkout[0].id}</p>
                    <p>Bodyweight: {latestWorkout[0].bodyweight}</p>
                    <p>Date: {latestWorkout[0].date}</p>
                </div>
            )}

            {workoutCountWeek && (
                <div>
                    <h2>Workouts in the Last 7 Days</h2>
                    <p>Total Workouts: {workoutCountWeek[0].total_workouts}</p>
                </div>
            )}

            {mostFrequentExercise && (
                <div>
                    <h2>Most Frequent Exercise</h2>
                    <p>Exercise: {mostFrequentExercise[0].name}</p>
                    <p>Count: {mostFrequentExercise[0].count_value}</p>
                </div>
            )}

            {yearlyWorkoutCount && (
                <div>
                    <h2>Total Workouts in {(new Date().getFullYear())}</h2>
                    <p>Total Workouts: {yearlyWorkoutCount[0].count}</p>
                </div>
            )}

*/