import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';

import styles from './GoalSection.module.css';

// Function to generate monthly ticks and include the last date
const generateMonthlyTicks = (startDate, endDate, lastDate) => {
    const ticks = [];
    let currentDate = dayjs(startDate);

    while (currentDate.isBefore(dayjs(endDate)) || currentDate.isSame(dayjs(endDate))) {
        ticks.push(currentDate.valueOf()); // Use timestamp for compatibility with `scale="time"`
        currentDate = currentDate.add(1, 'month'); // Increment to the next month
    }

    // Ensure the last date is included if necessary
    if (!ticks.includes(dayjs(lastDate).valueOf())) {
        ticks.push(dayjs(lastDate).valueOf());
    }

    return ticks;
};

// Preprocess data to convert dates to timestamps
const preprocessData = (data) => {
    return data.map(entry => ({
        ...entry,
        date: new Date(entry.date).getTime(), // Convert date to timestamp
    }));
};

// Custom tick formatter to avoid duplicate month labels
const tickFormatter = (date, index, ticks) => {
    const formattedDate = dayjs(date).format('MMM');
    const prevDate = index > 0 ? dayjs(ticks[index - 1]).format('MMM') : null;

    return formattedDate !== prevDate ? formattedDate : ''; // Prevent repetition
};

const GoalSection = () => {
    const [bodyweightData, setBodyweightData] = useState([]);
    const [benchData, setBenchData] = useState([]);
    const [oneRepMaxResults, setOneRepMaxResults] = useState([]);
    const [ticks, setTicks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/exercises/bodyweight')
            .then(response => {
                const processedData = preprocessData(response.data);
                setBodyweightData(processedData);

                // Generate monthly ticks based on the dataset range
                const startDate = processedData[0]?.date; // Earliest date
                const endDate = processedData[processedData.length - 1]?.date; // Latest date
                if (startDate && endDate) {
                    setTicks(generateMonthlyTicks(startDate, endDate, endDate));
                }
            })
            .catch(error => console.error("Error fetching bodyweight data:", error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:5000/exercises/bench')
            .then(response => {
                const processedData = preprocessData(response.data);
                setBenchData(processedData);
            })
            .catch(error => console.error("Error fetching bench data:", error));
    }, []);

    // Calculate one-rep max estimates
    const formatOneRepMax = () => {
        const newForm = benchData.map(entry => {
            const estimate = entry.weight / (1.0278 - 0.0278 * entry.reps[0]); // Formula for one-rep max
            return { date: entry.date, estimate };
        });
        return newForm;
    };

    useEffect(() => {
        setOneRepMaxResults(formatOneRepMax());
    }, [benchData]);

    return (
        <div className={styles.goalsSection}>
            {/* Bench One-Rep Max Chart */}
            <h1> Bench Press Estimated One Rep Max</h1>
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
                    <XAxis
                        dataKey="date"
                        scale="time"
                        type="number"
                        domain={['auto', 'auto']}
                        ticks={ticks}
                        tickFormatter={(date, index) => tickFormatter(date, index, ticks)} // Use the custom formatter
                    />
                    <YAxis />
                    <Tooltip labelFormatter={(date) => dayjs(date).format('MMM DD, YYYY')} />
                    <Legend />
                    <Line type="monotone" dataKey="estimate" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>

            {/* Bodyweight Chart */}
            <h1> BodyWeight Tracker</h1>
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
                    <XAxis
                        dataKey="date"
                        scale="time"
                        type="number"
                        domain={['auto', 'auto']}
                        ticks={ticks} // Show every month
                        tickFormatter={(date, index) => tickFormatter(date, index, ticks)} // Use the custom formatter
                    />
                    <YAxis />
                    <Tooltip labelFormatter={(date) => dayjs(date).format('MMM DD, YYYY')} />
                    <Legend />
                    <Line type="monotone" dataKey="bodyweight" stroke="#82ca9d" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GoalSection;
