import React from 'react';
import DashboardTab from './DashboardTab';
import SummaryStats from './SummaryStats';
import WorkoutActivityGraph from './WorkoutActivityGraph';
import MorphingBackground from './MorphingBackground'; 
import Frequent from './Frequent';
import GoalSection from './GoalSection';

const GuestDashboard = () => {

  const tabNames = ['summary', 'Features', 'history', 'FAQ'];
  const tabContents = [
    <SummaryStats/>,
    <GoalSection />,
    <WorkoutActivityGraph year={2025} admin={false}/>,
    <Frequent/>
  ];

  return (
    <div>
      <MorphingBackground />
      <DashboardTab tabNames={tabNames} tabContents={tabContents} />
    </div>
  );
};

export default GuestDashboard;
