import React from 'react';
import WorkoutList from '../WorkoutList/WorkoutList';
import DashboardTab from './DashboardTab';
import SummaryStats from './SummaryStats';
import WorkoutActivityGraph from './WorkoutActivityGraph';
import MorphingBackground from './MorphingBackground'; 

const GuestDashboard = () => {
  const tabNames = ['Overview', 'Features', 'Pricing', 'Contact'];
  const tabContents = [
    <SummaryStats/>,
    <h1>stuff here</h1>,
    <WorkoutActivityGraph year={2025} admin={false}/>,
    <div><h2>Contact</h2><p>Reach out via our contact page.</p></div>
  ];

  return (
    <div>
      <MorphingBackground />
      <DashboardTab tabNames={tabNames} tabContents={tabContents} />
    </div>
  );
};

export default GuestDashboard;
