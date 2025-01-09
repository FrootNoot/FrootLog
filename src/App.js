import React, { useState } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import styles from './App.module.css';

function App() {
  const [todos, setTodos] = useState([]);
  
  // Add a new todo
  const addTodo = (text, text2) => {
    const newTodo = {
      id: Date.now(),
      text,
      text2,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  // Toggle completion status
  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className={styles.app}>
      <h1 className={styles.header}>To-Do List</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;
