import PresentationActions from '../data/internal/presentation/PresentationActions';
import PresentationStore from '../data/internal/presentation/PresentationStore';
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
        PresentationActions.setCurrentSlide(0);
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
        const newPresentation = OrderedMapHelper.findCurrentPresentation(
          PresentationStore.getState()
        );
        PresentationActions.setCurrentSlide(
          newPresentation.data.order.length - 1
        );
        return;
      }
    }
  }
}
