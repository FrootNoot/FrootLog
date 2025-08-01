import React, { useEffect, useState } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import API from "../../api";
import styles from './WorkoutActivityGraph.module.css';
import ExerciseDisplay from "./ExerciseDisplay";

// Function to check leap year
const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

// Function to generate full-year heatmap data
const generateHeatmapData = (workoutData, year) => {
  const daysInYear = isLeapYear(year) ? 366 : 365;
  const startDate = new Date(`${year}-01-01`);
  
  let data = [];
  let currentDate = new Date(startDate);

  while (data.length < daysInYear) {
    const dateString = currentDate.toISOString().split("T")[0]; // YYYY-MM-DD
    const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 6 = Saturday

    // Determine the week's index based on the year's start day
    const weekIndex = Math.floor((currentDate - startDate + startDate.getDay() * 86400000) / (7 * 86400000));

    // Find matching workout data (convert date to YYYY-MM-DD format for comparison)
    const workoutEntry = workoutData.find(w => {
      const workoutDate = new Date(w.date).toISOString().split("T")[0]; // Convert to YYYY-MM-DD format
      return workoutDate === dateString;
    });

    data.push({
      x: weekIndex,
      y: dayOfWeek,
      count: workoutEntry ? 1 : 0,
      date: dateString
    });

    currentDate.setDate(currentDate.getDate() + 1); // Move to next day
  }

  return data;
};

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

const WorkoutActivityGraph = ({ year, admin }) => {
  const [workoutData, setWorkoutData] = useState(getCachedData(`workoutHistory_${year}`) || []);
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (workoutData.length === 0) {
      API.get(`/exercises/workoutHistory?year=${year}`)
        .then(response => {
          setWorkoutData(response.data);
          setCachedData(`workoutHistory_${year}`, response.data);
        })
        .catch(error => console.error("Error fetching workout data:", error));
    }
  }, [year, workoutData.length]);

  const handleClick = (payload) => {
    if (payload.count > 0) {
      API.get(`/exercises/workoutByDate?date=${payload.date}`)
        .then(response => setActiveWorkout(response.data[0]))
        .catch(error => console.error("Error fetching workout data:", error));
    }
  };

  const minWidth = 1600;
  const minSize = 10;  
  const maxSize = 16; 
  const growthFactor = 0.008;
  
  const rectSize = width >= minWidth 
    ? Math.min(minSize + growthFactor * (width - minWidth), maxSize) 
    : minSize;

  const heatmapData = generateHeatmapData(workoutData, year);
  const getMonthStartWeeks = () => {
    const startWeeks = [];
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    for (let month = 0; month < 12; month++) {
      const date = new Date(year, month, 1);
      const startWeek = Math.floor((date - new Date(`${year}-01-01`)) / (7 * 86400000));
      startWeeks.push(startWeek);
    }

    return startWeeks;
  };

  const monthStartWeeks = getMonthStartWeeks();

  return (
    <div>
      <ResponsiveContainer className={styles.chartBackground} aspect={4} width="100%" minWidth={750} minHeight={220}>
        <ScatterChart>
          <XAxis
            className={styles.move}
            type="number"
            stroke="#ffffff"
            dataKey="x"
            name="Week"
            dy={10}
            dx={30}
            axisLine={false}
            domain={[0, 53]} 
            ticks={monthStartWeeks} 
            tickFormatter={(value) => {
              const months = [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
              ];
              const monthIndex = monthStartWeeks.indexOf(value);
              return monthIndex !== -1 ? months[monthIndex] : '';
            }}
          />
          <YAxis
            className={styles.move2}
            type="number"
            dataKey="y"
            stroke="#ffffff"
            name="Day"
            axisLine={false}
            ticks={[1,3,5]}
            domain={[0, 6]}
            tickFormatter={(value) => {
              const daysOfWeek = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
              return daysOfWeek[value];
            }}
          />
          <Scatter
            data={heatmapData}
            fill="#8884d8"
            shape={({ cx, cy, payload }) => (
              <rect
                x={cx - 5}
                y={cy - 5}
                width={rectSize}
                height={rectSize}
                fill={payload.count > 0 ? `rgba(119, 255, 98, 0.8)` : "#eee"}
                rx={2}
                onClick={() => handleClick(payload)}
                style={{ cursor: payload.count > 0 ? 'pointer' : 'default' }}
              />
            )}
          />
        </ScatterChart>
      </ResponsiveContainer>

      <div>
        {!activeWorkout ? (
          <div id={styles.hint}>
            "Click on a workout to view details"
          </div>
        ) : (
          <div>
            <ExerciseDisplay admin={admin} exerciseID={activeWorkout.id} bodyweight={activeWorkout.bodyweight} date={activeWorkout.date} />
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutActivityGraph;