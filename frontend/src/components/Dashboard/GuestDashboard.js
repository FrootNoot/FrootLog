import React from 'react';
import WorkoutList from '../WorkoutList/WorkoutList';
import DashboardTab from './DashboardTab';

const GuestDashboard = () => {
  const tabNames = ['Overview', 'Features', 'Pricing', 'Contact'];
  const tabContents = [
    <WorkoutList />,
    <div><h2>Features</h2><p>Our tab component is fully responsive.</p></div>,
    <div><h2>Pricing</h2><p>Completely free to use!</p></div>,
    <div><h2>Contact</h2><p>Reach out via our contact page.</p></div>
  ];

  return (
    <div>
      <DashboardTab tabNames={tabNames} tabContents={tabContents} />
    </div>
  );
};

export default GuestDashboard;
