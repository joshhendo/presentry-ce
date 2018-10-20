import * as React from 'react';
import './WorkAreaCanvas.scss';
// import WorkAreaCanvasLeft from './WorkAreaCanvasLeft';
import WorkAreaCanvasLeftContainer from '../../../../containers/home/components/work-area/WorkAreaCanvasLeftContainer';
import WorkAreaCanvasRightContainer from '../../../../containers/home/components/work-area/WorkAreaCanvasRightContainer';

const WorkAreaCanvas = () => {
  return (
    <div className="work-area-canvas-container">
      <WorkAreaCanvasLeftContainer />
      <WorkAreaCanvasRightContainer />
    </div>
  );
};

export default WorkAreaCanvas;
