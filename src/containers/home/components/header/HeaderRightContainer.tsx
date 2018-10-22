import HeaderRight, {
  StateProps,
  DispatchProps,
} from '../../../../views/home/components/header/HeaderRight';
const FluxContainerCreate = require('flux-container-create');
import { connect } from 'react-redux';
import * as React from 'react';
import * as Actions from '../../../../data/internal/Actions';
import { StoreType } from '../../../../data/internal/Store';

const mapStateToProps = function(store: StoreType): StateProps {
  return {
    isActive: store.overallState.active,
  };
};

const mapDispatchToProps = function(
  dispatch: any,
  ownProps: any
): DispatchProps {
  return {
    onToggleActive: Actions.toggleActive,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderRight);
