import { useState } from 'react';
import SummaryStats from './SummaryStats';
import WorkoutForm from '../WorkoutList/WorkoutForm';
import DashboardTab from './DashboardTab';
import WorkoutActivityGraph from './WorkoutActivityGraph';
import MorphingBackground from './MorphingBackground'; 
import styles from './AdminDashboard.module.css';
import GoalSection from './GoalSection';
import API from '../../api';

const AdminDashboard = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [enteredPassword, setEnteredPassword] = useState('');
    const [error, setError] = useState('');

    const tabNames = ['summary', 'track', 'history', 'goals'];
    const tabContents = [
        <SummaryStats />,
        <WorkoutForm />,
        <WorkoutActivityGraph year={2025} admin={true} />,
        <GoalSection />
    ];

    const handlePasswordSubmit = async () => {
        try {
            const response = await API.post('/auth/login', { password: enteredPassword });

            if (response.status === 200) {
                setIsAdmin(true);
                setError(''); 
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message);
            } else {
                setError('Server error. Please try again later.');
            }
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
                        <button onClick={handlePasswordSubmit}>Submit</button>
                        {error && <p className={styles.error}>{error}</p>}
                    </div>
                ) : (
                    <DashboardTab tabNames={tabNames} tabContents={tabContents} />
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
