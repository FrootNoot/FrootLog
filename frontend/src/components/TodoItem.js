import React from 'react';
import styles from './TodoItem.module.css';

function TodoItem({ todo, toggleComplete, deleteTodo }) {
  return (
    <li className={`${styles.item} ${todo.completed ? styles.completed : ''}`}>
      <span className={styles.text} onClick={() => toggleComplete(todo.id)}>
        {todo.text}
      </span>
      <span className={styles.text} onClick={() => toggleComplete(todo.id)}>
        {todo.text2}
      </span>
      <button className={styles.delete} onClick={() => deleteTodo(todo.id)}>
        &#10005;
      </button>
    </li>
  );
}

export default TodoItem;
