import HeaderRight from '../../../../views/home/components/header/HeaderRight';
const FluxContainerCreate = require('flux-container-create');
import StateStore from '../../../../data/internal/state/StateStore';
import StateActions from '../../../../data/internal/state/StateActions';

import * as React from 'react';

class HeaderRightContainer extends React.Component<any, any> {
  static getStores() {
    return [StateStore];
  }

  static calculateState(prevState: any) {
    return {
      states: StateStore.getState(),
      onTogglePresentationWindow: StateActions.togglePresentationWindow(),
    };
  }

  render() {
    return (
      <HeaderRight
        states={this.state.states}
        onTogglePresentationWindow={this.state.onTogglePresentationWindow}
      />
    );
  }
}

export default FluxContainerCreate(HeaderRightContainer);
