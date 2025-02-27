import React, { useState } from 'react';
import axios from 'axios';
import styles from './WorkoutForm.module.css';

const WorkoutForm = () => {
    const [bodyweight, setBodyWeight] = useState('');
    const [date, setDate] = useState('');
    const [exercises, setExercises] = useState([{ name: '', weight: '', sets: '', reps: [] }]);
    const [suggestions, setSuggestions] = useState({}); // Store suggestions per row

    const handleAddExercise = () => {
        setExercises([...exercises, { name: '', weight: '', sets: '', reps: [] }]);
    };

    const handleRemoveExercise = (index) => {
        const newExercises = exercises.filter((_, i) => i !== index);
        setExercises(newExercises);

        setSuggestions((prev) => {
            const newSuggestions = { ...prev };
            delete newSuggestions[index];
            return newSuggestions;
        });
    };

    const handleChangeExercise = async (index, field, value) => {
        const newExercises = [...exercises];
        newExercises[index][field] = value;
        setExercises(newExercises);

        if (field === 'name' && value.trim()) {
            try {
                const response = await axios.get('http://localhost:5000/exercises/search', {
                    params: { query: value },
                });
                setSuggestions((prev) => ({ ...prev, [index]: response.data }));
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        }
    };

    const handleSelectSuggestion = (index, suggestion) => {
        const newExercises = [...exercises];
        newExercises[index].name = suggestion;
        setExercises(newExercises);
        setSuggestions((prev) => ({ ...prev, [index]: [] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const workoutData = { bodyweight, date, exercises };
        try {
            await axios.post('http://localhost:5000/exercises', workoutData);
            alert('Workout added successfully');
            setBodyWeight('');
            setDate('');
            setExercises([{ name: '', weight: '', sets: '', reps: [] }]);
            setSuggestions({}); // Reset suggestions
        } catch (error) {
            console.error('Error adding workout:', error);
            alert('Error adding workout');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.formHeader}>
                <div>
                <label className={styles.title}>Bodyweight:</label>
                <input type="text" value={bodyweight} onChange={(e) => setBodyWeight(e.target.value)} />
                </div>
            <div>
                <label>Date:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
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
                            onBlur={() => setTimeout(() => setSuggestions((prev) => ({ ...prev, [index]: [] })), 100)} 
                            onFocus={(e) => handleChangeExercise(index, 'name', e.target.value)}
                        />
                        {suggestions[index] && suggestions[index].length > 0 && (
                            <ul className={styles.suggestions}>
                                {suggestions[index].map((suggestion, i) => (
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
                            value={exercise.reps.join(',')}
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
