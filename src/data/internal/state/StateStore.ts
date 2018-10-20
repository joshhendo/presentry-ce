import * as Immutable from 'immutable';
import * as utils from 'flux/utils';
import StateActionTypes, { Keys } from './StateActionTypes';
import Dispatcher from '../InternalDispatcher';

class StateStore extends utils.ReduceStore<any, any> {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return Immutable.Map();
  }

  reduce(state: Immutable.Map<any, any>, action: any) {
    let updatedState = state;
    switch (action.type) {
      case StateActionTypes.TOGGLE_PRESENTATION_WINDOW:
        return updatedState.update(
          Keys.SHOW_PRESENTATION_WINDOW,
          true,
          x => !x
        );
        break;
      default:
        return updatedState;
    }
  }
}

export default new StateStore();
