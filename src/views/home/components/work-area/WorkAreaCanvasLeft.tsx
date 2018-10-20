import * as React from 'react';
import './WorkAreaCanvasLeft.scss';

export default class WorkAreaCanvasLeft extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="work-area-canvas-left-container">
        <ul className="list">
          {[...this.props.presentations.values()].map(presentation => (
            <li
              key={presentation.id}
              className={presentation.current ? 'selected' : ''}
              onClick={() => this.props.onSetCurrent(presentation.id)}
            >
              {presentation.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
