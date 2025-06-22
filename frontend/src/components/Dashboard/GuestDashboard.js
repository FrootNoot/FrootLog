import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardTab from './DashboardTab';
import SummaryStats from './SummaryStats';
import WorkoutActivityGraph from './WorkoutActivityGraph';
import MorphingBackground from './MorphingBackground'; 
import Frequent from './Frequent';
import GoalSection from './GoalSection';

const GuestDashboard = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialTab = params.get('tab') ? parseInt(params.get('tab')) : 0;  
  
  const [activeTab, setActiveTab] = useState(initialTab);

  const tabNames = ['summary', 'features', 'history', 'FAQ'];
  const tabContents = [
    <SummaryStats />,
    <GoalSection />,
    <WorkoutActivityGraph year={2025} admin={false} />,
    <Frequent />
  ];

  useEffect(() => {
    const newTab = params.get('tab') ? parseInt(params.get('tab')) : 0;
    setActiveTab(newTab);
  }, [location.search]);

  return (
    <div>
      <MorphingBackground />
      <DashboardTab 
        tabNames={tabNames} 
        tabContents={tabContents} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default GuestDashboard;
