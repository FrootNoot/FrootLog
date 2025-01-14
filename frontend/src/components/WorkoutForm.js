import React, { useState } from 'react';
import axios from 'axios';

const WorkoutForm = () => {
    const [workoutName, setWorkoutName] = useState('');
    const [date, setDate] = useState('');
    const [exercises, setExercises] = useState([{ name: '', weight: '', sets: '', reps: [] }]);
    const [suggestions, setSuggestions] = useState([]);

    const handleAddExercise = () => {
        setExercises([...exercises, { name: '', weight: '', sets: '', reps: [] }]);
    };

    const handleRemoveExercise = (index) => {
        const newExercises = exercises.filter((_, i) => i !== index);
        setExercises(newExercises);
    };

    const handleChangeExercise = async (index, field, value) => {
        const newExercises = [...exercises];
        newExercises[index][field] = value;
        setExercises(newExercises);

        if (field === 'name' && value.trim()) {
            try {
                const response = await axios.get('http://localhost:5000/exercises', {
                    params: { query: value },
                });
                setSuggestions(response.data);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        }
    };

    const handleSelectSuggestion = (index, suggestion) => {
        const newExercises = [...exercises];
        newExercises[index].name = suggestion;
        setExercises(newExercises);
        setSuggestions([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const workoutData = { workoutName, date, exercises };

        try {
            await axios.post('http://localhost:5000/workouts', workoutData);
            alert('Workout added successfully');
            setWorkoutName('');
            setDate('');
            setExercises([{ name: '', weight: '', sets: '', reps: [] }]);
        } catch (error) {
            console.error('Error adding workout:', error);
            alert('Error adding workout');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Workout Name:</label>
                <input type="text" value={workoutName} onChange={(e) => setWorkoutName(e.target.value)} />
            </div>
            <div>
                <label>Date:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            <div>
                <h3>Exercises</h3>
                {exercises.map((exercise, index) => (
                    <div key={index} style={{ position: 'relative' }}>
                        <input
                            type="text"
                            placeholder="Exercise Name"
                            value={exercise.name}
                            onChange={(e) => handleChangeExercise(index, 'name', e.target.value)}
                            onBlur={() => setTimeout(() => setSuggestions([]), 100)} 
                            onFocus={(e) => handleChangeExercise(index, 'name', e.target.value)}
                        />
                        {suggestions.length > 0 && (
                            <ul style={{ position: 'absolute', top: '100%', left: 0, background: 'white', border: '1px solid #ccc', listStyleType: 'none', padding: '5px', margin: 0 }}>
                                {suggestions.map((suggestion, i) => (
                                    <li key={i} onClick={() => handleSelectSuggestion(index, suggestion)} style={{ cursor: 'pointer', padding: '5px' }}>
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        )}
                        <input
                            type="number"
                            placeholder="Weight"
                            value={exercise.weight}
                            onChange={(e) => handleChangeExercise(index, 'weight', e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Sets"
                            value={exercise.sets}
                            onChange={(e) => handleChangeExercise(index, 'sets', e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Reps (comma-separated)"
                            value={exercise.reps}
                            onChange={(e) => handleChangeExercise(index, 'reps', e.target.value.split(','))}
                        />
                        <button type="button" onClick={() => handleRemoveExercise(index)}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={handleAddExercise}>Add Exercise</button>
            </div>

            <button type="submit">Submit Workout</button>
        </form>
    );
};

export default WorkoutForm;
