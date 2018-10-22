import * as PresentationActions from '../data/internal/Actions';
import { store } from '../data/internal/Store';
import * as OrderedMapHelper from './OrderedMapHelper';
import * as _ from 'lodash';
import { PresentationState } from '../data/internal/reducers/PresentationReducer';

export function NextSlide() {
  const state = store.getState().presentationState as PresentationState;

  const section = OrderedMapHelper.findCurrentSection(state);
  const position = state.currentSlide || 0;

  if (position === section.data.order.length - 1) {
    const sectionIds = _.map(state.sections, 'id');

    for (let i = 0; i < sectionIds.length - 1; i++) {
      if (sectionIds[i] === state.currentSection) {
        PresentationActions.setCurrent(state.sections[i + 1].id);
        PresentationActions.setCurrentSlide(0);
        return;
      }
    }
  } else {
    PresentationActions.setCurrentSlide(state.currentSlide + 1);
  }
}

export function PreviousSlide() {
  const state = store.getState().presentationState as PresentationState;

  const position = state.currentSlide || 0;

  if (position > 0) {
    PresentationActions.setCurrentSlide(position - 1);
  } else {
    const sectionIds = _.map(state.sections, 'id');

    for (let i = sectionIds.length - 1; i > 0; i--) {
      if (sectionIds[i] === state.currentSection) {
        PresentationActions.setCurrent(
          state.sections[i - 1].id,
          state.sections[i - 1].data.order.length - 1
        );
        return;
      }
    }
  }
}
