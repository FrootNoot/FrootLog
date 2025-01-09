import React, { useState } from 'react';
import styles from './TodoForm.module.css';

function TodoForm({ addTodo }) {
  const [input, setInput] = useState('');
  const [input2, setInput2] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addTodo(input, input2);
      setInput('');
      setInput2('');

    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        className={styles.input}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task"
      />
        <input
        type="text"
        className={styles.input}
        value={input2}
        onChange={(e) => setInput2(e.target.value)}
        placeholder="Add a new task2"
      />
      <button type="submit" className={styles.button}>Add</button>
    </form>
  );
}

export default TodoForm;
