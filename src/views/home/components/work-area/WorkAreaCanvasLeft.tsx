import * as React from 'react';
import './WorkAreaCanvasLeft.scss';
import { Section } from '../../../../components/presentations/file-reader';

export interface StateProps {
  // State
  currentSection: string;
  sections: Section[];
}

export interface DispatchProps {
  onSetCurrent: (id: string) => void;
}

export type Props = StateProps &
  DispatchProps & {
    width: number;
  };

export default class WorkAreaCanvasLeft extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div
        className="work-area-canvas-left-container"
        style={{ width: this.props.width }}>
        <ul className="list">
          {[...this.props.sections].map(section => (
            <li
              key={section.id}
              className={
                section.id === this.props.currentSection ? 'selected' : ''
              }
              onClick={() => this.props.onSetCurrent(section.id)}>
              {section.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
