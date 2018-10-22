import WorkAreaCanvasRight, {
  StateProps,
  DispatchProps,
} from '../../../../views/home/components/work-area/WorkAreaCanvasRight';
const FluxContainerCreate = require('flux-container-create');
import { store, StoreType } from '../../../../data/internal/Store';
import * as PresentationActions from '../../../../data/internal/Actions';
import { Container } from 'flux/utils';

import * as React from 'react';
import { OrderedMap } from 'immutable';

import { connect } from 'react-redux';
import * as _ from 'lodash';
import { Section } from '../../../../components/presentations/file-reader';
import * as Actions from '../../../../data/internal/Actions';

const mapStateToProps = function(store: StoreType): StateProps {
  const section = _.find(
    store.presentationState.sections,
    (x: Section) => x.id === store.presentationState.currentSection
  );

  return {
    section,
    currentSlide: store.presentationState.currentSlide,
  };
};

const mapDispatchToProps = function(
  dispatch: any,
  ownProps: any
): DispatchProps {
  return {
    onSetCurrentSlide: function(position: number) {
      Actions.setCurrentSlide(position);
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkAreaCanvasRight);
