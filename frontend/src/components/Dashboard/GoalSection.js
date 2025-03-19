import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import styles from './GoalSection.module.css';

const GoalSection = () => {

    const [bodyweightData, setBodyweightData] = useState([]);
    const [benchData, setBenchData] = useState([]);
    const [oneRepMaxResults, setOneRepMaxResults] = useState([]);


    useEffect(() => {
        axios.get(`http://localhost:5000/exercises/bodyweight`)
          .then(response => setBodyweightData(response.data))
          .catch(error => console.error("Error fetching bodyweight data:", error));
      }, []);

      useEffect(() => {
        axios.get(`http://localhost:5000/exercises/bench`)
          .then(response => setBenchData(response.data))
          .catch(error => console.error("Error fetching bench data:", error));
      }, []);
    

    const formatOneRepMax = () => {
        const newForm = benchData.map(entry => {
            const estimate = entry.weight / (1.0278 - 0.0278 * entry.reps[0]);
            return { date: entry.date, estimate }; 
        });
        return newForm; 
    };
    

    useEffect(() => {
        setOneRepMaxResults(formatOneRepMax()); 
        console.log(oneRepMaxResults); 
        console.log(bodyweightData)
    }, [benchData]); 
    
    
    return (
        <div> 
            <ResponsiveContainer width="100%" height={300}>
            <LineChart
                data={oneRepMaxResults}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="estimate" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height={300}>
            <LineChart
                data={bodyweightData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="bodyweight" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
            </ResponsiveContainer>

            </div>
    );
};

export default GoalSection;
