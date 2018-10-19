/*
This file 'commands' the presentation window. As such, everything should go through here.
 */

import { screen, remote } from 'electron';
import * as _ from 'lodash';
import Display = Electron.Display;
import * as events from 'events';
import { KonvaCommand } from '../interop/KonvaCommand';

export const commanderEmitter = new events.EventEmitter();

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

export function sendCommand(data: KonvaCommand) {
  if (!state.window) {
    return;
  }

  state.window.webContents.send('message', JSON.stringify(data));
}
