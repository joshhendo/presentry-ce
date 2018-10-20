import PresentationActions from '../data/PresentationActions';
import PresentationStore from '../data/PresentationStore';
import * as OrderedMapHelper from './OrderedMapHelper';
import { OrderedMap } from 'immutable';

export function NextSlide() {
  const state = PresentationStore.getState() as OrderedMap<any, any>;

  const currentPresentation = OrderedMapHelper.findCurrentPresentation(state);
  const currentSlidePosition = OrderedMapHelper.getCurrentSlidePosition(
    currentPresentation
  );

  if (currentSlidePosition === currentPresentation.data.order.length - 1) {
    const presentations = Array.from(state.keys() as any) as string[];

    for (let i = 0; i < presentations.length - 1; i++) {
      if (presentations[i] === currentPresentation.id) {
        PresentationActions.setCurrent(presentations[i + 1]);
        return;
      }
    }
  } else {
    PresentationActions.setCurrentSlide(currentSlidePosition + 1);
  }
}

export function PreviousSlide() {
  const state = PresentationStore.getState();

  const currentPresentation = OrderedMapHelper.findCurrentPresentation(state);
  const currentSlidePosition = OrderedMapHelper.getCurrentSlidePosition(
    currentPresentation
  );

  if (currentSlidePosition > 0) {
    PresentationActions.setCurrentSlide(currentSlidePosition - 1);
  } else {
    const presentations = Array.from(state.keys() as any) as string[];

    for (let i = presentations.length - 1; i > 0; i--) {
      if (presentations[i] === currentPresentation.id) {
        PresentationActions.setCurrent(presentations[i - 1]);
        return;
      }
    }
  }
}
