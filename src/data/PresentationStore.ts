import * as Immutable from 'immutable';
import * as utils from 'flux/utils';
import PresentationActionTypes from './PresentationActionTypes';
import PresentationDispatcher from './PresentationDispatcher';
import { ServiceFile } from '../components/presentations/file-reader';

export type PresentationData = ServiceFile['presentations'][0];
export type PresentationDataExtended = PresentationData & {
  current: boolean;
};
export type PresentationDataList = Immutable.OrderedMap<
  string,
  PresentationDataExtended
>;

export type PresentationCommand = {
  position: number,
}

class PresentationStore extends utils.ReduceStore<any, any> {
  constructor() {
    super(PresentationDispatcher);
  }

  getInitialState() {
    return Immutable.OrderedMap();
  }

  reduce(
    state: PresentationDataList,
    action: { type: string; data: any }
  ) {
    let updatedState = state;
    switch (action.type) {
      case PresentationActionTypes.ADD_PRESENTATION:
        if (!action.data) {
          return updatedState;
        }

        return updatedState.set(action.data.id, {
          ...action.data,
          current: false,
        });
      case PresentationActionTypes.DELETE_PRESENTATION:
        return updatedState.delete(action.data.id);
      case PresentationActionTypes.SET_CURRENT:
        const previous = updatedState.findLast(p => p.current);
        if (previous) {
          updatedState = updatedState.update(previous.id, x => {
            return {
              ...x,
              current: false,
            };
          });
        }

        updatedState = updatedState.update(action.data.id, x => {
          return {
            ...x,
            current: true,
          };
        });

        return updatedState;
      case PresentationActionTypes.SET_CURRENT_SLIDE:
        const activePresentation = updatedState.findLast(p => p.current);
        if (!activePresentation) {
          return updatedState;
        }

        updatedState = updatedState.update(activePresentation.id, x => {
          return {
            ...x,
            currentSlide: action.data.position,
          };
        });

        return updatedState;
      default:
        return updatedState;
    }
  }
}

export default new PresentationStore();
