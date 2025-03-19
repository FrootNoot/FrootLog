import React from 'react';

import styles from './Frequent.module.css';

const Frequent = () => {

    const year = new Date().getFullYear();
    const startYear = 2021; 

    return (
        <div className={styles.faqContent}>
            <h1>Frequently asked questions</h1>
            
            <p>How long have you been training?</p>
            <p>{year - startYear} years. I started when I turned 18, and have always been working out consistently as well as learning about bodybuilding eversince.</p>
            
            <p>What do you eat?</p>
            <p>I eat whatever I want but I do stay very mindful of how much I need to eat for my goals as well as my protein intake so it is kind of like intuitive eating</p>
            
            <p>What is the secret?</p>
            <p>I find that sustainability is very important to making progress. To find the balance between efficiency and having fun in terms of working out and dieting is very crucial for a healthy lifestyle.</p>
            
            <p>What is your current goal?</p>
            <p>My current goal is to lean bulk up to 85kgs and then cut back down to 80kgs while maintaining as much strength as I can. I also dream of benching 3 plates (140kgs).</p>
        </div>
    );
};

export default Frequent;
