import {Link} from 'react-router-dom'
import React, { useState, useEffect } from "react";
import styles from "./Description.module.css";
import { Dumbbell, Goal, NotebookTabs  } from 'lucide-react';

function Description() {

  return (
    <div className={styles.descriptionContainer}> 


      <div className={styles.descriptionItem}> 
        <Dumbbell className={styles.icon}  color="black" />
        <h1>View My Workouts</h1>
        <h3>See what weights, sets and reps I do for my workouts.</h3>
      </div>


      <div className={styles.descriptionItem}> 
        <Goal className={styles.icon}  color="black" />
        <h1>Track My Goals</h1>
        <h3>Check my progress towards my goals and see how they are coming along !</h3>
      </div>
      
      <div className={styles.descriptionItem}> 
        <NotebookTabs  className={styles.icon}  color="black" />
        <h1>My Workout Log</h1>
        <h3>A logbook for myself to record everything I need to stay consistent.</h3>

      </div>
    </div>
  );
}

export default Description;
