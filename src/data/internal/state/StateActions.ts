import StateActionTypes from './StateActionTypes';
import Dispatcher from '../InternalDispatcher';

export const Actions = {
  togglePresentationWindow() {
    Dispatcher.dispatch({
      type: StateActionTypes.TOGGLE_PRESENTATION_WINDOW,
    });
  }
};

export default Actions;

