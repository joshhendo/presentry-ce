import * as React from 'react';
import './WorkAreaNav.scss';
import WorkAreaNavTop from './WorkAreaNavTop';
import WorkAreaNavBottom from './WorkAreaNavBottom';

const WorkAreaNav = () => {
  return (
    <div className="work-area-nav-container">
      <WorkAreaNavTop />
      <WorkAreaNavBottom />
    </div>
  );
};

export default WorkAreaNav;
