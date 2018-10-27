import { width } from '../../interop/PresentationCommander';

const ipc = require('electron').ipcRenderer;
import * as Konva from 'konva';
import * as $ from 'jquery';
import { Shape } from 'konva';

$('#video-container').hide();

const stage = new Konva.Stage({
  container: 'root',
  width: 1920,
  height: 1080,
  y: 100,
});

// window.innerWidth
// window.innerHeight
// scale the stage
window.onresize = setScaleProperly;
window.addEventListener('fullscreenchange', setScaleProperly, false);
function setScaleProperly() {
  const widthRatio = window.innerWidth / 1920;
  const heightRatio = window.innerHeight / 1080;
  const scaleRatio = Math.min(widthRatio, heightRatio);
  if (scaleRatio !== 1) {
    if (heightRatio === scaleRatio) {
      // the window is too *wide*
      // offset the X to ensure it remains centered

      const offset: number = (window.innerWidth - scaleRatio * 1920) / 2;
      stage.y(0);
      stage.x(offset);
    } else {
      // the window is too *tall*
      // offset the Y to ensure it remains centered

      const offset: number = (window.innerHeight - scaleRatio * 1080) / 2;
      stage.y(offset);
      stage.x(0);
    }

    stage.scaleX(scaleRatio);
    stage.scaleY(scaleRatio);
    stage.draw();
  } else {
    stage.y(0);
    stage.x(0);
  }
}
setScaleProperly();

const layers: any = {};

ipc.on('message', (event: any, message: any) => {
  const command = JSON.parse(message);

  let obj = null;
  if (command.action === 'tween') {
    let node = null;
    if (command.layerId) {
      node = layers[command.layerId].find(`#${command.id}`)[0];
    } else {
      node = layers[command.id];
    }

    const tween = new Konva.Tween({
      node: node,
      ...command.data,
    });

    tween.play();
  } else if (command.type === 'layer') {
    const layer2 = new Konva.Layer({
      id: command.id,
    });
    layers[command.id] = layer2;
    stage.add(layer2);
  } else if (command.action === 'create') {
    const classMapping: { [key: string]: any } = {
      text: Konva.Text,
      rect: Konva.Rect,
    };

    const layer2 = layers[command.layerId];
    obj = new classMapping[command.type]({
      ...command.data,
      id: command.id,
    });
    layer2.add(obj);
    stage.draw();
  } else {
    return;
  }
});

ipc.on('video', (event: any, message: any) => {
  $('#root').hide();
  $('#video-container').show();

  const video = $('#video');
  const mp4 = $('#mp4');

  mp4.attr('src', 'C:\\Users\\Hendo\\Desktop\\Wildlife.mp4');

  (video.get(0) as any).load();
  (video.get(0) as any).play();

  video.on('ended', function() {
    $('#root').show();
    $('#video-container').hide();
    mp4.attr('src', '');
  });
});

ipc.on('scale', (event: any, message: any) => {
  stage.scaleX(0.5);
  stage.scaleY(0.5);
});

ipc.on('redraw', (event: any, message: any) => {
  stage.draw();
});
