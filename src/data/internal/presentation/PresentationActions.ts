import PresentationActionTypes from './PresentationActionTypes';
import Dispatcher from '../InternalDispatcher';
import { PresentationData } from './PresentationStore';

const Actions = {
  addPresentation(data: PresentationData) {
    Dispatcher.dispatch({
      type: PresentationActionTypes.ADD_PRESENTATION,
      data,
    });
  },
  deletePresentation(id: string) {
    Dispatcher.dispatch({
      type: PresentationActionTypes.DELETE_PRESENTATION,
      data: {
        id: id,
      },
    });
  },
  setCurrent(id: string) {
    Dispatcher.dispatch({
      type: PresentationActionTypes.SET_CURRENT,
      data: {
        id: id,
      },
    });
  },
  setCurrentSlide(position: number) {
    Dispatcher.dispatch({
      type: PresentationActionTypes.SET_CURRENT_SLIDE,
      data: {
        position: position,
      },
    });
  },
};

export default Actions;
