import * as React from 'react';
import './WorkArea.scss';
import WorkAreaNav from './WorkAreaNav';
import WorkAreaCanvas from './WorkAreaCanvas';

const WorkArea = () => {
  return (
    <div className="work-area-container">
      <WorkAreaNav />
      <WorkAreaCanvas />
    </div>
  );
};

export default WorkArea;
