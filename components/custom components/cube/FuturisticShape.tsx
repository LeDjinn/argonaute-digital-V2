'use client';

import React from "react";

const FibonacciSpiral = () => {
  return (
    <div className="fibonacci-container">
      <div className="fibonacci-spiral">
        {Array.from({ length: 100 }, (_, i) => (
          <div
            key={i}
            className="sphere"
            style={{
              transform: `rotateY(${i * 137.5}deg) translateZ(${i * 5}px)`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FibonacciSpiral;
