import React, { useState, useEffect } from 'react';
import API from '../../api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';
import styles from './GoalSection.module.css';

// Utility function to get/set cache with expiration
const getCachedData = (key, ttl = 5 * 60 * 1000) => {
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

// Function to generate monthly ticks and include the last date
const generateMonthlyTicks = (startDate, endDate, lastDate) => {
  const ticks = [];
  let currentDate = dayjs(startDate);

  while (currentDate.isBefore(dayjs(endDate)) || currentDate.isSame(dayjs(endDate))) {
    ticks.push(currentDate.valueOf());
    currentDate = currentDate.add(1, 'month');
  }

  if (!ticks.includes(dayjs(lastDate).valueOf())) {
    ticks.push(dayjs(lastDate).valueOf());
  }

  return ticks;
};

// Preprocess data to convert dates to timestamps
const preprocessData = (data) => {
  return data.map(entry => ({
    ...entry,
    date: new Date(entry.date).getTime(),
  }));
};

// Custom tick formatter to avoid duplicate month labels
const tickFormatter = (date, index, ticks) => {
  const formattedDate = dayjs(date).format('MMM');
  const prevDate = index > 0 ? dayjs(ticks[index - 1]).format('MMM') : null;

  return formattedDate !== prevDate ? formattedDate : '';
};

const GoalSection = () => {
  const [bodyweightData, setBodyweightData] = useState(getCachedData('bodyweightData') || []);
  const [benchData, setBenchData] = useState(getCachedData('benchData') || []);
  const [oneRepMaxResults, setOneRepMaxResults] = useState([]);
  const [ticks, setTicks] = useState([]);

  useEffect(() => {
    if (bodyweightData.length === 0) {
      API.get('/exercises/bodyweight')
        .then(response => {
          const processedData = preprocessData(response.data);
          setBodyweightData(processedData);
          setCachedData('bodyweightData', processedData);

          const startDate = processedData[0]?.date;
          const endDate = processedData[processedData.length - 1]?.date;
          if (startDate && endDate) {
            setTicks(generateMonthlyTicks(startDate, endDate, endDate));
          }
        })
        .catch(error => console.error("Error fetching bodyweight data:", error));
    } else {
      const startDate = bodyweightData[0]?.date;
      const endDate = bodyweightData[bodyweightData.length - 1]?.date;
      if (startDate && endDate) {
        setTicks(generateMonthlyTicks(startDate, endDate, endDate));
      }
    }
  }, [bodyweightData]);

  useEffect(() => {
    if (benchData.length === 0) {
      API.get('/exercises/bench')
        .then(response => {
          const processedData = preprocessData(response.data);
          setBenchData(processedData);
          setCachedData('benchData', processedData);
        })
        .catch(error => console.error("Error fetching bench data:", error));
    }
  }, [benchData]);

  const formatOneRepMax = () => {
    const newForm = benchData.map(entry => {
      const estimate = entry.weight / (1.0278 - 0.0278 * entry.reps[0]);
      return { date: entry.date, estimate: estimate.toFixed(2) };
    });

    return newForm.sort((a, b) => a.date - b.date);
  };

  useEffect(() => {
    setOneRepMaxResults(formatOneRepMax());
  }, [benchData]);

  return (
    <div className={styles.goalsSection}>
      {/* Bench One-Rep Max Chart */}
      <h1>Bench Press Estimated One Rep Max</h1>
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
            tickFormatter={(date, index) => tickFormatter(date, index, ticks)}
          />
          <YAxis />
          <Tooltip labelFormatter={(date) => dayjs(date).format('MMM DD, YYYY')} />
          <Legend />
          <Line type="linear" dataKey="estimate" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>

      {/* Bodyweight Chart */}
      <h1>BodyWeight Tracker</h1>
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
            ticks={ticks}
            tickFormatter={(date, index) => tickFormatter(date, index, ticks)}
          />
          <YAxis />
          <Tooltip labelFormatter={(date) => dayjs(date).format('MMM DD, YYYY')} />
          <Legend />
          <Line type="linear" dataKey="bodyweight" stroke="#bb4b4bff" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GoalSection;