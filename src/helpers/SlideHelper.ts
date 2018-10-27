import * as Immutable from 'immutable';
import * as _ from 'lodash';
import { Section, SongSection } from '../components/presentations/file-reader';
import { PresentationState } from '../data/internal/reducers/PresentationReducer';
import { BLACK_SECTION_ID } from '../data/internal/Constants';
import { v4 } from 'uuid';

const blackSlide: Section = {
  id: BLACK_SECTION_ID,
  type: 'generic',
  name: 'black',
  data: {
    title: 'black',
    lyrics: [
      {
        id: '',
        slides: [''],
      },
    ],
    order: [''],
  },
  style: {
    background_colour: 'black',
    text_colour: 'black',
  },
};

export function findCurrentSection(state: PresentationState) {
  if (state.currentSection === BLACK_SECTION_ID) {
    return blackSlide;
  }

  return _.find(state.sections, (x: Section) => x.id === state.currentSection);
}

export function getCurrentSlide(state: PresentationState) {
  if (!state.currentSection) {
    return null;
  }

  const section = findCurrentSection(state);

  const slidesInOrder = getFullSlidesInOrder(section);
  if (state.currentSlide === undefined || state.currentSlide === null) {
    return null;
  }

  return slidesInOrder[state.currentSlide];
}

export function getFullSlidesInOrder(section: Section) {
  if (!section) {
    return null;
  }

  let counter = 0;
  const mapped = _.map(section.data.order, o => {
    return {
      position: counter++,
      ..._.find(section.data.lyrics, l => l.id === o),
    };
  });

  return mapped;
}
