import * as React from 'react';
import './WorkArea.scss';
import WorkAreaNav from './WorkAreaNav';
import WorkAreaCanvas from './WorkAreaCanvas';

export default class WorkArea extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return <div className="work-area-container">
      <WorkAreaNav />
      <WorkAreaCanvas />
    </div>
  }
}