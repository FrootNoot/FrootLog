import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SummaryStats from './SummaryStats';
import WorkoutForm from '../WorkoutList/WorkoutForm';
import DashboardTab from './DashboardTab';
import WorkoutActivityGraph from './WorkoutActivityGraph';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [enteredPassword, setEnteredPassword] = useState('');

    const tabNames = ['Overview', 'Features', 'Pricing', 'Contact'];
    const tabContents = [
        <SummaryStats/>,
        <WorkoutForm />,
        <WorkoutActivityGraph year={2025} />,
        <div><h2>Contact</h2><p>Reach out via our contact page.</p></div>
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
            <h2>Admin Dashboard</h2>
            {!isAdmin ? (
                <div>
                    <input 
                        type="password"
                        placeholder="Enter password"
                        value={enteredPassword}
                        onChange={(e) => setEnteredPassword(e.target.value)}
                    />
                    <button onClick={handlePasswordSubmit}>Submit</button>
                </div>
            ) : (
                <div>
                <DashboardTab tabNames={tabNames} tabContents={tabContents} />
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
