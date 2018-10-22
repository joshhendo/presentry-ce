import redux, { createStore, combineReducers } from 'redux';

import {
  PresentationState,
  presentationReducer,
} from './reducers/PresentationReducer';
import { OverallState, overallReducer } from './reducers/OverallReducer';

export interface StoreType {
  presentationState: PresentationState;
  overallState: OverallState;
}

const reducers = {
  presentationState: presentationReducer,
  overallState: overallReducer,
};

export const store = createStore(combineReducers(reducers));
