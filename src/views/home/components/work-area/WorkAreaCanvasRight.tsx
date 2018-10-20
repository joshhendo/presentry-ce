import * as React from 'react';
import './WorkAreaCanvasRight.scss';
import * as _ from 'lodash';

export default class WorkAreaCanvasRight extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    if (!this.props.presentation) {
      return (<div>Select a presentation</div>);
    }

    const mapped = _.map(this.props.presentation.data.order, (o) => {
      return _.find(this.props.presentation.data.lyrics, l => l.id === o);
    });

    let counter = 0;

    return <div className="work-area-canvas-right-container">
      <ul className="list">
      {mapped.map(x => (
        <li
          key={counter++}
        >
          {x.id}
        </li>
      ))}
      </ul>
    </div>;
  }
}