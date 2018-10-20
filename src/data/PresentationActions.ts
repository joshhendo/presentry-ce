import PresentationActionTypes from './PresentationActionTypes';
import PresentationDispatcher from './PresentationDispatcher';
import { PresentationData } from './PresentationStore';

const Actions = {
  addPresentation(data: PresentationData) {
    PresentationDispatcher.dispatch({
      type: PresentationActionTypes.ADD_PRESENTATION,
      data,
    });
  },
  deletePresentation(id: string) {
    PresentationDispatcher.dispatch({
      type: PresentationActionTypes.DELETE_PRESENTATION,
      data: {
        id: id,
      },
    });
  },
  setCurrent(id: string) {
    PresentationDispatcher.dispatch({
      type: PresentationActionTypes.SET_CURRENT,
      data: {
        id: id,
      },
    });
  },
};

export default Actions;
