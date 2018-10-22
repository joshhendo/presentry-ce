import * as React from 'react';
import './WorkAreaCanvasRight.scss';
import * as _ from 'lodash';
import { getFullSlidesInOrder } from '../../../../helpers/OrderedMapHelper';
import { Section } from "../../../../components/presentations/file-reader";

export interface StateProps {
  section: Section;
  currentSlide: number;
}

export interface DispatchProps {
  onSetCurrentSlide: (position: number) => void;
}

export type Props = StateProps & DispatchProps;

export default class WorkAreaCanvasRight extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    if (!this.props.section) {
      return <div>Select a section to display</div>;
    }

    const mapped = getFullSlidesInOrder(this.props.section);

    return (
      <div className="work-area-canvas-right-container">
        <ul className="list">
          {mapped.map(x => (
            <li
              key={x.position}
              className={
                this.props.currentSlide === x.position
                  ? 'selected'
                  : ''
              }
              onClick={() => this.props.onSetCurrentSlide(x.position)}>
              {x.id}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
