import React, { useState } from 'react';
import styles from './DashboardTab.module.css';

function DashboardTab({ tabNames, tabContents }) {
  const [activeTab, setActiveTab] = useState(0); 

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

      <div className={styles.tabContent}>
        {tabContents[activeTab]}
      </div>
    </div>
  );
}

export default DashboardTab;
