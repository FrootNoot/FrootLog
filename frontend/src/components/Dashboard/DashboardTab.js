import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Add this import to read the URL

import styles from './DashboardTab.module.css';

function DashboardTab({ tabNames, tabContents }) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialTab = params.get('tab') ? parseInt(params.get('tab')) : 0; 

  const [activeTab, setActiveTab] = useState(initialTab); 

  useEffect(() => {
    const newTab = params.get('tab') ? parseInt(params.get('tab')) : 0;
    setActiveTab(newTab);
  }, [location.search]);

  useEffect(() => {
    const currentTab = `?tab=${activeTab}`;
    window.history.replaceState(null, '', currentTab); 
  }, [activeTab]);

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabButtons}>
        {tabNames.map((name, index) => (
          <button
            key={index}
            className={activeTab === index ? styles.active : ''}
            onClick={() => setActiveTab(index)}
          >
            {name}
          </button>
        ))}
      </div>
      <div id={styles.spacer}></div>
      <div id={styles.test}>
        <div className={`${styles.tabContent} ${activeTab === 2 ? styles.specialClass : ''}`}>
          {tabContents[activeTab]}
        </div>
      </div>
    </div>
  );
}

export default DashboardTab;
