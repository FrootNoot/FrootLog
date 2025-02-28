import { useEffect, useState } from "react";
import KUTE from "kute.js";
import "./MorphingBackground.css"; // Import the styles

const MorphingBackground = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const tween1 = KUTE.fromTo(
      "#path1",
      { path: firstPath1 },
      { path: secondPath1 },
      { duration: 3000, easing: "easingCubicInOut", repeat: Infinity, yoyo: true }
    );

    const tween2 = KUTE.fromTo(
      "#path2",
      { path: firstPath2 },
      { path: secondPath2 },
      { duration: 3000, easing: "easingCubicInOut", repeat: Infinity, yoyo: true }
    );

    if (!isAnimating) {
      tween1.start();
      tween2.start();
      setIsAnimating(true);
    }
  }, [isAnimating]);

  return (
    <div className="morphing-bg">
      <svg 
        viewBox="0 0 900 600"
        preserveAspectRatio="xMidYMid slice"
        className="fullscreen-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0" y="0" width="100%" height="100%" fill="#ffffff"></rect>
        <g transform="translate(900, 0)">
          <path id="path1" fill="#101415" d={firstPath1}></path>
        </g>
        <g transform="translate(0, 600)">
          <path id="path2" fill="#101415" d={firstPath2}></path>
        </g>
      </svg>
    </div>
  );
};

const firstPath1 =
  "M0 486.7C-53.8 451 -107.6 415.2 -161.9 390.8C-216.1 366.4 -270.8 353.3 -322.4 322.4C-374.1 291.6 -422.8 243 -449.7 186.3C-476.6 129.6 -481.7 64.8 -486.7 0L0 0Z";
const firstPath2 =
  "M0 -486.7C55.1 -461.6 110.3 -436.5 173 -417.6C235.6 -398.7 305.9 -386.1 344.2 -344.2C382.5 -302.3 389 -231 407.4 -168.8C425.9 -106.5 456.3 -53.3 486.7 0L0 0Z";

const secondPath1 =
  "M0 486.7C-50.2 448.9 -100.4 411 -163 393.6C-225.7 376.1 -300.8 379.1 -344.2 344.2C-387.5 309.3 -399.1 236.6 -417.6 173C-436.1 109.3 -461.4 54.7 -486.7 0L0 0Z";
const secondPath2 =
  "M0 -486.7C63.5 -480.8 126.9 -474.8 186.3 -449.7C245.6 -424.6 300.9 -380.5 326.7 -326.7C352.5 -272.9 348.7 -209.5 370.5 -153.5C392.2 -97.4 439.5 -48.7 486.7 0L0 0Z";

export default MorphingBackground;
