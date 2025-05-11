import {Link} from 'react-router-dom'
import React, { useState, useEffect } from "react";
import styles from "./Description.module.css";
import { Dumbbell, Goal, NotebookTabs  } from 'lucide-react';

function Description() {

  return (
    <div className={styles.descriptionContainer}> 
      <div className={styles.descriptionItem}> 
        <Dumbbell className={styles.icon} size={50} color="black" />
        <h1>temp1</h1>
        <h3>Breif desciprtion yadayada</h3>
      </div>
      <div className={styles.descriptionItem}> 
        <Goal className={styles.icon} size={50} color="black" />

        <h1>temp2</h1>
        <h3>Breif desciprtion yadayada</h3>

      </div>
      <div className={styles.descriptionItem}> 
        <NotebookTabs  className={styles.icon} size={50} color="black" />

        <h1>temp3</h1>
        <h3>Breif desciprtion yadayada</h3>

      </div>
    </div>
  );
}

export default Description;
