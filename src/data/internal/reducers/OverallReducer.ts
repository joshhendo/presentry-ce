import redux from 'redux';
import ActionTypes from '../ActionTypes';

export interface OverallState {
  active: boolean;
}

const overallState: OverallState = {
  active: false,
};

export const overallReducer = function(
  state = overallState,
  action: redux.AnyAction
): OverallState {
  switch (action.type) {
    case ActionTypes.TOGGLE_ACTIVE:
      return { ...state, active: !state.active };
  }
  return state;
};
