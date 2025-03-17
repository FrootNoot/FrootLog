import React, { useState, useEffect } from "react";
import styles from "./HeroSection.module.css";

function HeroSection() {
  const gymQuotes = [
    `"Strength does not come from physical capacity. It comes from an indomitable will." - Mahatma Gandhi`,
    `"You can have results or excuses, but not both.” — Arnold Schwarzenegger"`,
    `“The real workout starts when you want to stop.” – Ronnie Coleman`,
    `“Don’t count the days, make the days count.” —Muhammad Ali`,
  ];

  const [currentQuote, setCurrentQuote] = useState(gymQuotes[Math.floor(Math.random() * gymQuotes.length)]);
  const [previousQuote, setPreviousQuote] = useState("");

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      let randomQuote;
      do {
        randomQuote = gymQuotes[Math.floor(Math.random() * gymQuotes.length)];
      } while (randomQuote === previousQuote); 

      setCurrentQuote(randomQuote);
      setPreviousQuote(randomQuote);
    }, 10000);


    return () => clearInterval(quoteInterval);
  }, []);

  const pulses = [
    { id: 1, color: "linear-gradient(90deg, #F5BEBE, #fa6b3e, #FF4848)", animation: "animate-pulse-1" },
    { id: 2, color: "linear-gradient(90deg, #F3E2E2, #E39CFF,rgb(255, 56, 228))", animation: "animate-pulse-2" },
    { id: 3, color: "linear-gradient(90deg, #F3E2E2, #7AADF1,rgb(0, 13, 255))", animation: "animate-pulse-3" },
  ];

  return (
    <div id={styles.mainParent}>
      <div id={styles.firstHalf} className={styles.halfContainer}>
        <h1>frootnoot.fit</h1>
        <h2>my personal gym tracker</h2>
        <h3 className={styles.quote}>{currentQuote}</h3>
      </div>

      <div id={styles.secondHalf} className={styles.halfContainer}>
        <div className={styles.pulse}></div>
        <div className={styles.pulse}></div>
        <div className={styles.pulse}></div>
      </div>
    </div>
  );
}

export default HeroSection;
