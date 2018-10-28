/*
This file 'commands' the presentation window. As such, everything should go through here.
 */

import { store, StoreType } from '../data/internal/Store';

import { screen, remote } from 'electron';
import * as _ from 'lodash';
import Display = Electron.Display;
import * as events from 'events';
import { KonvaCommand } from './KonvaCommand';
import { findCurrentSection, getCurrentSlide } from '../helpers/SlideHelper';
import { BibleSection, Section, SongSection } from "../components/presentations/file-reader";
import { getHeightOfTextObject } from '../helpers/KonvaHelper';
import { supNums } from "../helpers/ScriptHelper";

export const commanderEmitter = new events.EventEmitter();

const settings = {
  HEIGHT: 1080,
  WIDTH: 1920,
  song_slide: {
    lyric: {
      MAX_SIZE: 130,
      LEFT_MARGIN: 30,
      RIGHT_MARGIN: 30,
      TOP_MARGIN: 30,
      BOTTOM_MARGIN: 100,
    },
    info: {
      MAX_SIZE: 50,
      TOP_MARGIN: -80,
      LEFT_MARGIN: 30,
    },
  },
  bible_slide: {
    lyric: {
      MAX_SIZE: 130,
      LEFT_MARGIN: 30,
      RIGHT_MARGIN: 30,
      TOP_MARGIN: 30,
      BOTTOM_MARGIN: 100,
    },
    info: {
      MAX_SIZE: 50,
      TOP_MARGIN: -80,
      LEFT_MARGIN: 30,
    },
  },
};

function getYPos(value: number) {
  if (value < 0) {
    return settings.HEIGHT + value;
  }
  return value;
}

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

  // const devMode = process.env.NODE_ENV === 'development';
  const devMode = false;

  const displays = screen.getAllDisplays();
  if (displays.length < 2 && !devMode) {
    alert('You need a second display');
    return;
  }

  const currentDisplay = screen.getDisplayNearestPoint(
    screen.getCursorScreenPoint()
  );

  let otherDisplay = _.find(
    displays,
    (d: Display) => d.id != currentDisplay.id
  );

  if (!otherDisplay && devMode) {
    otherDisplay = displays[0];
  }

  if (otherDisplay) {
    const windowOptions: any = {
      frame: false,
      autoHideMenuBar: true,
      fullscreen: true,
      x: otherDisplay.bounds.x + 50,
      y: otherDisplay.bounds.y + 50,
      parent: remote.getCurrentWindow(),
      backgroundColor: '#000000',
    };

    // check for development mode
    if (devMode) {
      windowOptions.fullscreen = false;
      windowOptions.x = 50;
      windowOptions.y = 50;
      windowOptions.width = 1920 / 2;
      windowOptions.height = 1080 / 2;
      windowOptions.frame = true;
    }

    let presentationWindow: Electron.BrowserWindow = new remote.BrowserWindow(
      windowOptions
    );

    presentationWindow.webContents.on('did-finish-load', () => {
      presentationWindow.show();
      presentationWindow.focus();
      // presentationWindow.webContents.send('message', 'hello second window');
      presentationWindow.webContents.openDevTools();
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
    } else {
      try {
        currentWindow.close();
      } catch {}

      currentWindow = null;
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

  const currentSection = findCurrentSection(state.presentationState);
  if (!currentSection) {
    return;
  }

  const currentPresentationId = currentSection.id;
  const currentPresentationSlide = getCurrentSlide(state.presentationState);

  if (!currentPresentationSlide) {
    return;
  }

  let renderSlideCommand: any = renderSongSlide;
  if (currentSection.type === 'bible') {
    renderSlideCommand = renderBibleSlide;
  }

  if (previousPresentationId !== currentPresentationId) {
    deleteLayer(previousPresentationId);
    createLayer(currentSection);

    renderSlideCommand(
      currentPresentationId,
      currentPresentationSlide.position,
      currentPresentationSlide,
      currentSection
    );
  } else if (previousPresentationSlide !== currentPresentationSlide) {
    deleteSlide(currentPresentationId, previousPresentationSlide.position);
    renderSlideCommand(
      currentPresentationId,
      currentPresentationSlide.position,
      currentPresentationSlide,
      currentSection
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

export function createLayer(section: Section) {
  const command: KonvaCommand = {
    type: 'layer',
    id: section.id,
    action: 'create',
    data: null,
  };

  sendCommand(command);

  if (section.style && section.style.background_colour) {
    const createBackground: KonvaCommand = {
      type: 'rect',
      id: `${section.id}_background`,
      action: 'create',
      layerId: section.id,
      data: {
        x: 0,
        y: 0,
        width: settings.WIDTH,
        height: settings.HEIGHT,
        fill: section.style.background_colour,
      },
    };

    sendCommand(createBackground);
  } else {
    const createBackground: KonvaCommand = {
      type: 'rect',
      id: `${section.id}_background`,
      action: 'create',
      layerId: section.id,
      data: {
        x: 0,
        y: 0,
        width: settings.WIDTH,
        height: settings.HEIGHT,
        fill: 'white',
      },
    };

    sendCommand(createBackground);
  }

  if (section.data.title) {
    const createTitle: KonvaCommand = {
      type: 'text',
      id: `${section.id}_data`,
      action: 'create',
      layerId: section.id,
      data: {
        y: getYPos(settings.song_slide.info.TOP_MARGIN),
        x: settings.song_slide.info.LEFT_MARGIN,
        fill: _.get(section, 'style.text_colour') || '#000000',
        fontSize: settings.song_slide.info.MAX_SIZE,
        fontFamily: 'Calibri',
        text: section.data.title,
      },
    };

    sendCommand(createTitle);
  }
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

export function renderBibleSlide(
  layerId: string,
  position: number,
  data: BibleSection['content'][0],
  section: Section
) {
  const text = _.chain(data.passages)
    .map((p) => `${supNums(p.reference.verse.toString(10))} ${p.text}`)
    .join(' ')
    .value();

  const command: KonvaCommand = {
    type: 'text',
    id: `${layerId}_${position}`,
    layerId: layerId,
    action: 'create',
    data: {
      x: settings.bible_slide.lyric.LEFT_MARGIN,
      y: settings.bible_slide.lyric.TOP_MARGIN,
      text: text,
      fontSize: settings.bible_slide.lyric.MAX_SIZE,
      fontFamily: 'Calibri',
      fill: _.get(section, 'style.text_colour') || '#000000',
      width:
        settings.WIDTH -
        settings.bible_slide.lyric.LEFT_MARGIN -
        settings.bible_slide.lyric.RIGHT_MARGIN,
      padding: 20,
      align: _.get(section, 'style.text_alignment') || 'center',
    },
  };

  while (
    getHeightOfTextObject(command) >
    settings.HEIGHT -
    settings.bible_slide.lyric.TOP_MARGIN -
    settings.bible_slide.lyric.BOTTOM_MARGIN &&
    command.data.fontSize > 10
    ) {
    command.data.fontSize--;
  }

  sendCommand(command);
}

export function renderSongSlide(
  layerId: string,
  position: number,
  data: SongSection['content'][0],
  section: Section
) {
  // const content = _.find(data.content, (x) => x.id === data.order[position]).slides;

  const command: KonvaCommand = {
    type: 'text',
    id: `${layerId}_${position}`,
    layerId: layerId,
    action: 'create',
    data: {
      x: settings.song_slide.lyric.LEFT_MARGIN,
      y: settings.song_slide.lyric.TOP_MARGIN,
      text: data.slides.join('\n'),
      fontSize: settings.song_slide.lyric.MAX_SIZE,
      fontFamily: 'Calibri',
      fill: _.get(section, 'style.text_colour') || '#000000',
      width:
        settings.WIDTH -
        settings.song_slide.lyric.LEFT_MARGIN -
        settings.song_slide.lyric.RIGHT_MARGIN,
      padding: 20,
      align: _.get(section, 'style.text_alignment') || 'center',
    },
  };

  while (
    getHeightOfTextObject(command) >
      settings.HEIGHT -
        settings.song_slide.lyric.TOP_MARGIN -
        settings.song_slide.lyric.BOTTOM_MARGIN &&
    command.data.fontSize > 10
  ) {
    command.data.fontSize--;
  }

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

export function sendRect() {}

export function sendRedraw() {
  if (!currentWindow) {
    return;
  }

  currentWindow.webContents.send('redraw', {});
}
