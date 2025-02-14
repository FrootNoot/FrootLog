import React, { useEffect, useState } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";

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
      if (workoutDate === dateString){
        console.log("frick")
        return workoutDate === dateString;
      }
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


const WorkoutActivityGraph = ({ year }) => {
  const [workoutData, setWorkoutData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/exercises/workoutHistory?year=${year}`)
      .then(response => setWorkoutData(response.data))
      .catch(error => console.error("Error fetching workout data:", error));
  }, [year]);

  
  
  const heatmapData = generateHeatmapData(workoutData, year);

  return (
    <ResponsiveContainer width="100%" height={250}>
      <ScatterChart>
        <XAxis
          type="number"
          dataKey="x"
          name="Week"
          tickFormatter={(week) => {
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            return months[Math.floor((week * 7) / 30)]; // Approximate month mapping
          }}
          axisLine={false}
        />
        <YAxis
          type="number"
          dataKey="y"
          name="Day"
          tickFormatter={(day) => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][day]}
          axisLine={false}
        />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter
          data={heatmapData}
          fill="#8884d8"
          shape={({ cx, cy, payload }) => (
            <rect
              x={cx - 5}
              y={cy - 5}
              width={10}
              height={10}
              fill={payload.count > 0 ? `rgba(255, 0, 0)` : "#eee"}
              rx={2}
            />
          )}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default WorkoutActivityGraph;
