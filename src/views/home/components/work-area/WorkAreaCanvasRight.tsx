import * as React from 'react';
import './WorkAreaCanvasRight.scss';
import * as _ from 'lodash';
import { getFullSlidesInOrder } from "../../../../helpers/OrderedMapHelper";

export default class WorkAreaCanvasRight extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    if (!this.props.presentation) {
      return <div>Select a presentation</div>;
    }

    const mapped = getFullSlidesInOrder(this.props.presentation);

    return (
      <div className="work-area-canvas-right-container">
        <ul className="list">
          {mapped.map(x => (
            <li
              key={x.position}
              className={this.props.presentation.currentSlide === x.position ? 'selected' : ''}
              onClick={() => this.props.onSetCurrentSlide(x.position)}
            >
              {x.id}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
