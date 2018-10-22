import redux from 'redux';
import ActionTypes from '../ActionTypes';
import { Section } from '../../../components/presentations/file-reader';

export interface PresentationState {
  currentSection: string;
  currentSlide: number;
  sections: Array<Section>;
}

const initialPresentationState: PresentationState = {
  currentSection: null as any,
  currentSlide: null as number,
  sections: [] as Section[],
};

export const presentationReducer = function(
  state = initialPresentationState,
  action: redux.AnyAction
): PresentationState {
  switch (action.type) {
    case ActionTypes.ADD_PRESENTATION:
      return { ...state, sections: state.sections.concat(action.payload) };
    case ActionTypes.DELETE_PRESENTATION:
      return state;
    case ActionTypes.SET_CURRENT:
      return {
        ...state,
        currentSection: action.payload.id,
        currentSlide: action.payload.position,
      };
    case ActionTypes.SET_CURRENT_SLIDE:
      return { ...state, currentSlide: action.payload };
  }
  return state;
};
