import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SummaryStats from './SummaryStats';
import WorkoutForm from '../WorkoutList/WorkoutForm';
import DashboardTab from './DashboardTab';
import WorkoutActivityGraph from './WorkoutActivityGraph';
import MorphingBackground from './MorphingBackground'; 
import styles from './AdminDashboard.module.css';
import GoalSection from './GoalSection';

const AdminDashboard = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [enteredPassword, setEnteredPassword] = useState('');

    const tabNames = ['summary', 'track', 'history', 'goals'];
    const tabContents = [
        <SummaryStats/>,
        <WorkoutForm />,
        <WorkoutActivityGraph year={2025} admin={true}/>,
        <GoalSection />
    ];

    const handlePasswordSubmit = () => {
        if (enteredPassword === "a") {
            setIsAdmin(true);
        } else {
            alert('Incorrect password');
        }
    };

    return (
        <div className={styles.adminContainer}>
            <MorphingBackground /> 
            <div className={styles.content}>
                {!isAdmin ? (
                    <div className={styles.adminForm}>
                        <h1> Froot Noot login page</h1>
                        <p>Enter password to access admin dashboard</p>
                        <input 
                            type="password"
                            placeholder="Enter password"
                            value={enteredPassword}
                            onChange={(e) => setEnteredPassword(e.target.value)}
                        />
                        <button onClick={handlePasswordSubmit}>Submitothy</button>
                    </div>
                ) : (
                    <DashboardTab tabNames={tabNames} tabContents={tabContents} />
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
