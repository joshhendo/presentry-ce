import * as React from 'react';
import './WorkAreaCanvas.scss';
import WorkAreaCanvasLeft from './WorkAreaCanvasLeft';
import WorkAreaCanvasRight from './WorkAreaCanvasRight';

const WorkAreaCanvas = () => {
  return (
    <div className="work-area-canvas-container">
      <WorkAreaCanvasLeft />
      <WorkAreaCanvasRight />
    </div>
  );
};

export default WorkAreaCanvas;
