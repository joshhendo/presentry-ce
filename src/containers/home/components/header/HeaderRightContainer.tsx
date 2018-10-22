import HeaderRight from '../../../../views/home/components/header/HeaderRight';
const FluxContainerCreate = require('flux-container-create');
import { connect } from 'react-redux';
import * as React from 'react';

/*
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
        // states={this.state.states}
        // onTogglePresentationWindow={this.state.onTogglePresentationWindow}
      />
    );
  }
}

export default FluxContainerCreate(HeaderRightContainer);
//export default HeaderRightContainer;
*/

class HeaderRightContainer extends React.Component<any, any> {
  render() {
    return <HeaderRight />;
  }
}

const mapStateToProps = function(store: any) {
  return {};
};

export default connect(mapStateToProps)(HeaderRightContainer);
