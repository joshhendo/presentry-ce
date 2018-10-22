import WorkAreaCanvasLeft, {
  StateProps,
  DispatchProps,
} from '../../../../views/home/components/work-area/WorkAreaCanvasLeft';
import * as React from 'react';
import { connect } from 'react-redux';
import { StoreType } from '../../../../data/internal/Store';
import * as Actions from '../../../../data/internal/Actions';

const mapStateToProps = function(store: StoreType): StateProps {
  return {
    currentSection: store.presentationState.currentSection,
    sections: store.presentationState.sections,
  };
};

const mapDispatchToProps = function(
  dispatch: any,
  ownProps: any
): DispatchProps {
  return {
    onSetCurrent: function(id: string) {
      Actions.setCurrent(id);
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkAreaCanvasLeft);
