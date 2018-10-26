import * as React from 'react';
import './WorkAreaCanvas.scss';
import WorkAreaCanvasLeftContainer from '../../../../containers/home/components/work-area/WorkAreaCanvasLeftContainer';
import WorkAreaCanvasRightContainer from '../../../../containers/home/components/work-area/WorkAreaCanvasRightContainer';

require('../../../../../lib/simpledrag.js');

export default class WorkAreaCanvas extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      leftPaneWidth: 200,
    };
  }

  componentDidMount() {
    const leftPane = document.getElementsByClassName(
      'work-area-canvas-left-container'
    );
    const panesSeparator = document.getElementById('panes-separator');

    const that = this;
    (panesSeparator as any).sdrag(
      function(
        el: any,
        pageX: number,
        startX: number,
        pageY: number,
        startY: number,
        fix: any
      ) {
        const offsetFromLeft = leftPane[0].getBoundingClientRect().left;

        fix.skipX = true;
        that.setState({
          leftPaneWidth: pageX - offsetFromLeft,
        });
      },
      null,
      'horizontal'
    );
  }

  render() {
    return (
      <div className="work-area-canvas-container">
        <WorkAreaCanvasLeftContainer
          id="left-pane"
          width={this.state.leftPaneWidth}
        />
        <div className="panes-separator" id="panes-separator" />
        <WorkAreaCanvasRightContainer id="right-pane" />
      </div>
    );
  }
}
