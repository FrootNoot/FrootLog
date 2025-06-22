import { Link } from 'react-router-dom';
import React from "react";
import styles from "./Description.module.css";
import { Dumbbell, Goal, NotebookTabs } from 'lucide-react';

function Description() {
  return (
    <div className={styles.descriptionContainer}> 
      <Link to="/GuestDashboard?tab=0" className={styles.descriptionItem}>
        <Dumbbell className={styles.icon}/>
        <h1>View My Workouts</h1>
        <h3>See what weights, sets, and reps I do for my workouts.</h3>
      </Link>

      <Link to="/GuestDashboard?tab=1" className={styles.descriptionItem}>
        <Goal className={styles.icon} />
        <h1>Track My Goals</h1>
        <h3>Check my progress towards my goals and see how they are coming along!</h3>
      </Link>

      <Link to="/GuestDashboard?tab=2" className={styles.descriptionItem}>
        <NotebookTabs className={styles.icon} />
        <h1>My Workout Log</h1>
        <h3>A logbook for myself to record everything I need to stay consistent.</h3>
      </Link>
    </div>
  );
}

export default Description;
