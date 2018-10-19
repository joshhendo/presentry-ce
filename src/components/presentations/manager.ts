import { ServiceFile } from "./file-reader";
import * as events from 'events';

let loadedPresentation: ServiceFile = null;

export const managerEmitter = new events.EventEmitter();

export function setLoadedPresentation(data: ServiceFile) {
  loadedPresentation = data;

  managerEmitter.emit('changed', data);
}
