import ActionTypes from './PresentationActionTypes';
import store from '../Store';
import { Section } from "../../../components/presentations/file-reader";

export function addSection(data: Section) {
  store.dispatch({ type: ActionTypes.ADD_PRESENTATION, payload: data });
}

export function deletePresentation(id: string) {
  store.dispatch({ type: ActionTypes.DELETE_PRESENTATION, payload: id });
}

export function setCurrent(id: string) {
  store.dispatch({ type: ActionTypes.SET_CURRENT, payload: id });
}

export function setCurrentSlide(position: number) {
  store.dispatch({ type: ActionTypes.SET_CURRENT_SLIDE, payload: position });
}