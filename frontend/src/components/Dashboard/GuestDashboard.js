import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WorkoutList from '../WorkoutList/WorkoutList';

const GuestDashboard = () => {

    return (
        <div>
          <WorkoutList></WorkoutList>
        </div>
    );
};

export default GuestDashboard;
