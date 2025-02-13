import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WorkoutList from '../WorkoutList/WorkoutList';
import WorkoutForm from '../WorkoutList/WorkoutForm';

const AdminDashboard = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [enteredPassword, setEnteredPassword] = useState('');

    const handlePasswordSubmit = () => {
        if (enteredPassword === "a") {
            setIsAdmin(true);
        } else {
            alert('Incorrect password');
        }
    };

    return (
        <div>
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
              <WorkoutList></WorkoutList>
              <WorkoutForm />

                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
