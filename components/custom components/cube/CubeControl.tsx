'use client';

import React from "react";

const CubeControl = () => {
  return (
    <div className="cube-control">
      <div className="port">
        <div className="cube spinXYZ">
          <div className="back">{/* Add SVGs */}</div>
          <div className="front">{/* Add SVGs */}</div>
          <div className="left">{/* Add SVGs */}</div>
          <div className="right">{/* Add SVGs */}</div>
          <div className="top">{/* Add SVGs */}</div>
          <div className="bottom">{/* Add SVGs */}</div>
        </div>
      </div>
    </div>
  );
};

export default CubeControl;
