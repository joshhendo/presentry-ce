/*
This file 'commands' the presentation window. As such, everything should go through here.
 */

import PresentationStore from '../data/PresentationStore';

import { screen, remote } from 'electron';
import * as _ from 'lodash';
import Display = Electron.Display;
import * as events from 'events';
import { KonvaCommand } from '../interop/KonvaCommand';
import {
  findCurrentPresentation,
  getCurrentSlide,
  getCurrentSlidePosition,
} from '../helpers/OrderedMapHelper';
import { OrderedMap } from 'immutable';
import * as Konva from 'konva';

export const commanderEmitter = new events.EventEmitter();

let currentState = null as any;
PresentationStore.addListener(function() {
  const state = PresentationStore.getState();
  stateChanged(currentState, state);
  currentState = state;
});

export function width(): number {
  if (state.window) {
    return state.window.getSize()[0];
  }
  return 0;
}

export function height(): number {
  if (state.window) {
    return state.window.getSize()[1];
  }
  return 0;
}

const state = {
  active: false,
  window: null as Electron.BrowserWindow,
};

export function LaunchPresentation() {
  if (state.active) {
    return;
  }

  const dirName = (remote.getCurrentWindow() as any).dirName;
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
      // presentationWindow.webContents.openDevTools();
    });
    presentationWindow.on('closed', () => {
      (presentationWindow as any) = null;
    });
    presentationWindow.loadURL(`file://${__dirname}/canvas.html`);

    state.active = true;
    state.window = presentationWindow;
    commanderEmitter.emit('active', true);
  } else {
    alert('Error starting up');
  }
}

function stateChanged(
  previousState: OrderedMap<any, any>,
  state: OrderedMap<any, any>
) {
  let previousPresentationId: string = null;
  let previousPresentationSlide = null;

  if (previousState) {
    const previousPresentation = findCurrentPresentation(previousState);

    if (previousPresentation) {
      previousPresentationId = previousPresentation.id;
      previousPresentationSlide = getCurrentSlide(previousPresentation);
    }
  }

  const currentPresentation = findCurrentPresentation(state);
  if (!currentPresentation) {
    return;
  }

  const currentPresentationId = currentPresentation.id;
  const currentPresentationSlide = getCurrentSlide(currentPresentation);

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
  if (!state.window) {
    return;
  }

  state.window.webContents.send('message', JSON.stringify(data));
}
