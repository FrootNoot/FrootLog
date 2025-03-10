import React, { useState} from 'react';
import axios from 'axios';
import styles from './WorkoutForm.module.css';

const WorkoutForm = () => {
    const [bodyweight, setBodyWeight] = useState('');
    const [date, setDate] = useState('');
    const [exercises, setExercises] = useState([{ name: '', weight: '', sets: '', reps: [] }]);
    const [suggestions, setSuggestions] = useState({}); // Store suggestions per row

    const today = new Date().toISOString().split('T')[0];

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
    
        if (field === 'name') {
            const regex = /^[A-Za-z\s]*$/;
            if (regex.test(value)) {
                newExercises[index][field] = value;
                setExercises(newExercises);
    
                if (value.trim()) {
                    try {
                        const response = await axios.get('http://localhost:5000/exercises/search', {
                            params: { query: value },
                        });
                        setSuggestions((prev) => ({ ...prev, [index]: response.data }));
                    } catch (error) {
                        console.error('Error fetching suggestions:', error);
                    }
                }
            }
        } else {
            newExercises[index][field] = value;
            setExercises(newExercises);
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
        const validationErrors = [];

        exercises.forEach((exercise, index) => {
            const sets = Number(exercise.sets);
            const reps = exercise.reps.length;
    
            if (sets && reps && sets !== reps) {
                validationErrors.push(
                    `The number of reps (${reps}) does not match the number of sets (${sets}) for exercise: ${exercise.name}.`
                );
            }
        });

        if (validationErrors.length > 0) {
            alert(validationErrors.join('\n')); 
            return;
        }

        if (exercises.length === 0) {
            alert("Why the fork is there no exercises"); 
            return;
        }


        try {

            /*
            await axios.post('http://localhost:5000/exercises', workoutData);
             */
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
        <form className={styles.exerciseForm} onSubmit={handleSubmit}>
            <div className={styles.formHeader}>
                <div>
                <label className={styles.title}>Bodyweight:</label>
                <input step=".01" min="1" max="999" required type="number" value={bodyweight} onChange={(e) => setBodyWeight(e.target.value)} />
                </div>
            <div>
                <label>Date:</label>
                <input required type="date" value={date} onChange={(e) => setDate(e.target.value)} max={today} />
                </div>
            </div>

            <div>
                <h3>Exercises</h3>
                {exercises.map((exercise, index) => (
                    <div className={styles.exerciseRow}key={index} style={{ position: 'relative' }}>
                        <div className={styles.autoFill}> 
                        <input
                            type="text"
                            placeholder="Exercise Name"
                            value={exercise.name}
                            onChange={(e) => handleChangeExercise(index, 'name', e.target.value)}
                            onBlur={() => setTimeout(() => setSuggestions((prev) => ({ ...prev, [index]: [] })), 100)} 
                            onFocus={(e) => handleChangeExercise(index, 'name', e.target.value)}
                            required
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
                        </div>
                        <input
                            type="number"
                            placeholder="Weight"
                            value={exercise.weight}
                            onChange={(e) => handleChangeExercise(index, 'weight', e.target.value)}
                            min="1"
                            max="999"
                            step=".01"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Sets"
                            value={exercise.sets}
                            onChange={(e) => handleChangeExercise(index, 'sets', e.target.value)}
                            min="1"
                            max="999"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Reps (comma-separated)"
                            value={exercise.reps.join(',')}
                            onChange={(e) => handleChangeExercise(index, 'reps', e.target.value.split(','))}
                            pattern="^(\d+)(,\d+)*$"
                            required
                            title="Reps must match sets and be comma-seperated e.g. (7,7,8)"
                        />
                        <button type="button" onClick={() => handleRemoveExercise(index)}>Remove</button>
                    </div>
                ))}
            </div>
            <button type="button" onClick={handleAddExercise}>Add Exercise</button>

            <button type="submit">Submit Workout</button>
        </form>
    );
};

export default WorkoutForm;
