/*
This file 'commands' the presentation window. As such, everything should go through here.
 */

import { store, StoreType } from '../data/internal/Store';

import { screen, remote } from 'electron';
import * as _ from 'lodash';
import Display = Electron.Display;
import * as events from 'events';
import { KonvaCommand } from '../interop/KonvaCommand';
import {
  findCurrentSection,
  getCurrentSlide,
} from '../helpers/OrderedMapHelper';

export const commanderEmitter = new events.EventEmitter();

let currentState = null as StoreType;

store.subscribe(() => {
  const state = store.getState();
  stateChanged(currentState, state);
  currentState = state;
});

let currentWindow = null as Electron.BrowserWindow;

export function width(): number {
  if (currentWindow) {
    return currentWindow.getSize()[0];
  }
  return 0;
}

export function height(): number {
  if (currentWindow) {
    return currentWindow.getSize()[1];
  }
  return 0;
}

function LaunchPresentation() {
  if (currentWindow) {
    return;
  }

  const displays = screen.getAllDisplays();
  if (displays.length < 2) {
    alert('You need a second display');
    return;
  }

  const currentDisplay = screen.getDisplayNearestPoint(
    screen.getCursorScreenPoint()
  );
  const otherDisplay = _.find(
    displays,
    (d: Display) => d.id != currentDisplay.id
  );

  if (otherDisplay) {
    let presentationWindow: Electron.BrowserWindow = new remote.BrowserWindow({
      frame: false,
      autoHideMenuBar: true,
      fullscreen: true,
      x: otherDisplay.bounds.x + 50,
      y: otherDisplay.bounds.y + 50,
      parent: remote.getCurrentWindow(),
      backgroundColor: '#000000',
    });
    presentationWindow.webContents.on('did-finish-load', () => {
      presentationWindow.show();
      presentationWindow.focus();
      // presentationWindow.webContents.send('message', 'hello second window');
      //presentationWindow.webContents.openDevTools();
    });
    presentationWindow.on('closed', () => {
      (presentationWindow as any) = null;
    });
    presentationWindow.loadURL(`file://${__dirname}/canvas.html`);

    /*
    Ok so playing videos with audio requires a "user gesture"  to be performed, otherwiese you get:
      play() failed because the user didn't interact with the document first.
    This line of code allows a "user gesture" to be performed, so you don't get this error.
    It seems to work.
    */
    presentationWindow.webContents.executeJavaScript('1===1', true);

    currentWindow = presentationWindow;
    commanderEmitter.emit('active', true);
  } else {
    alert('Error starting up');
  }
}

function stateChanged(previousState: StoreType, state: StoreType) {
  // Check for overall changes
  if (
    !previousState ||
    previousState.overallState.active != state.overallState.active
  ) {
    if (state.overallState.active) {
      LaunchPresentation();
    }
  }

  // Check for presentation changes
  let previousPresentationId: string = null;
  let previousPresentationSlide = null;

  if (previousState) {
    const previousPresentation = findCurrentSection(
      previousState.presentationState
    );

    if (previousPresentation) {
      previousPresentationId = previousPresentation.id;
      previousPresentationSlide = getCurrentSlide(
        previousState.presentationState
      );
    }
  }

  const currentPresentation = findCurrentSection(state.presentationState);
  if (!currentPresentation) {
    return;
  }

  const currentPresentationId = currentPresentation.id;
  const currentPresentationSlide = getCurrentSlide(state.presentationState);

  if (!currentPresentationSlide) {
    return;
  }

  if (previousPresentationId !== currentPresentationId) {
    deleteLayer(previousPresentationId);
    createLayer(currentPresentationId);

    renderSlide(
      currentPresentationId,
      currentPresentationSlide.position,
      currentPresentationSlide.slides
    );
  } else if (previousPresentationSlide !== currentPresentationSlide) {
    deleteSlide(currentPresentationId, previousPresentationSlide.position);
    renderSlide(
      currentPresentationId,
      currentPresentationSlide.position,
      currentPresentationSlide.slides
    );
  }
}

export function deleteLayer(layerId: string) {
  if (!layerId) {
    return;
  }

  const command: KonvaCommand = {
    type: 'layer',
    id: layerId,
    action: 'tween',
    data: {
      duration: 0.2,
      opacity: 0,
    },
  };

  sendCommand(command);
}

export function createLayer(layerId: string) {
  const command: KonvaCommand = {
    type: 'layer',
    id: layerId,
    action: 'create',
    data: null,
  };

  sendCommand(command);
}

export function deleteSlide(layerId: string, position: number) {
  const command: KonvaCommand = {
    type: 'text',
    id: `${layerId}_${position}`,
    layerId: layerId,
    action: 'tween',
    data: {
      duration: 0.2,
      opacity: 0,
    },
  };

  sendCommand(command);
}

export function renderSlide(
  layerId: string,
  position: number,
  lines: string[]
) {
  const command: KonvaCommand = {
    type: 'text',
    id: `${layerId}_${position}`,
    layerId: layerId,
    action: 'create',
    data: {
      x: 20,
      y: 60,
      text: lines.join('\n'),
      fontSize: 130,
      fontFamily: 'Calibri',
      fill: '#555',
      width: width() - 40,
      padding: 20,
      align: 'center',
    },
  };

  sendCommand(command);
}

export function sendCommand(data: KonvaCommand) {
  if (!currentWindow) {
    return;
  }

  currentWindow.webContents.send('message', JSON.stringify(data));
}

export function sendVideo() {
  if (!currentWindow) {
    return;
  }

  currentWindow.webContents.send('video', {});
}

export function sendScale() {
  if (!currentWindow) {
    return;
  }

  currentWindow.webContents.send('scale', {});
}
