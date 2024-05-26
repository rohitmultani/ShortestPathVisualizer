import React, { useEffect } from "react";
import IntroJs from "intro.js";
import "intro.js/introjs.css";

const Intro = () => {
  useEffect(() => {
    const intro = IntroJs(); // Initialize IntroJs
    intro.setOptions({
      steps: [
        {
          element: "#algo",
          intro: "Select the type of Algorithm",
        },
        {
          element: "#speed",
          intro: "Adjust the speed",
        },
        {
          element: "#start",
          intro: "Start Node",
        },
        {
          element: "#end",
          intro: "End Node",
        },
        {
          element: "#cell-10-20",
          intro: "Click on any cell to add bomb/wall",
        },
        {
          element: "#visualize",
          intro: "Click on to start the algorithm",
        },
        {
          element: "#visited",
          intro: "Shows number of nodes visited",
        },
        {
            element: "#short",
            intro: "Shows number of Shortest nodes in a path",
        },
        {
            element: "#clear",
            intro: "Clear the board",
          },
        // Add more steps for other elements
      ],
    });
    intro.start(); // Start the introduction tour
  }, []); // Run only once after component mounted

  return null; // Intro component doesn't render anything
};

export default React.memo(Intro);
