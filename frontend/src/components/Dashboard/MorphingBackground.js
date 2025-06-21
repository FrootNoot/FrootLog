import React, { useEffect, useRef, useState } from 'react';
import styles from "./MorphingBackground.css";

const MorphingBackground = () => {
  const textPathRef = useRef(null);
  const pathRef = useRef(null);
  const pathLengthRef = useRef(0);
  const offsetForwardRef = useRef(-200);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const speed = 0.5;

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const textPath = textPathRef.current;
    const path = pathRef.current;
    const pathLength = path.getTotalLength();
    pathLengthRef.current = pathLength;

    function animateTextForward() {
      offsetForwardRef.current += speed;

      if (offsetForwardRef.current >= pathLength) {
        offsetForwardRef.current = -1000;
      }

      textPath.setAttribute('startOffset', offsetForwardRef.current);
      requestAnimationFrame(animateTextForward);
    }

    requestAnimationFrame(animateTextForward);
  }, []);

  const wavePath = `M0,${windowDimensions.height - 50} Q ${windowDimensions.width / 4},${windowDimensions.height - 100} ${windowDimensions.width / 2},${windowDimensions.height - 50} T ${windowDimensions.width},${windowDimensions.height - 50}`;

  return (
    <div className="morphing-bg" style={{ height: `${windowDimensions.height}px`, width: `${windowDimensions.width}px` }}>
      <svg
        className="wavyText"
        viewBox={`0 0 ${windowDimensions.width} ${windowDimensions.height}`}
        xmlns="http://www.w3.org/2000/svg"
        width={windowDimensions.width}
        height={windowDimensions.height}
      >
        <path
          ref={pathRef}
          id="text-curve"
          d={wavePath}
          strokeWidth="2"
          fill="none"
        />
        <text fontSize="25" fontFamily='Rubik'>
          <textPath id="wavyText" ref={textPathRef} href="#text-curve" fill="white">
            Never Back Down, Never What?
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default MorphingBackground;
