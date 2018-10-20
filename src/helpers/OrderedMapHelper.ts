import * as Immutable from 'immutable';
import * as _ from 'lodash';

export function findCurrentPresentation(input: Immutable.OrderedMap<any, any>) {
  return input.findLast(x => x.current);
}

export function getCurrentSlidePosition(currentPresentation: any) {
  if (!currentPresentation) {
    return null;
  }

  return currentPresentation.currentSlide;
}

export function getCurrentSlide(currentPresentation: any) {
  if (!currentPresentation) {
    return null;
  }

  const slidesInOrder = getFullSlidesInOrder(currentPresentation);
  const currentPosition = getCurrentSlidePosition(currentPresentation) || 0;
  if (currentPosition === undefined || currentPosition === null) {
    return null;
  }

  return slidesInOrder[currentPosition];
}

export function getFullSlidesInOrder(currentPresentation: any) {
  if (!currentPresentation) {
    return null;
  }

  let counter = 0;
  const mapped = _.map(currentPresentation.data.order, o => {
    return {
      position: counter++,
      ..._.find(currentPresentation.data.lyrics, l => l.id === o),
    };
  });

  return mapped;
}
