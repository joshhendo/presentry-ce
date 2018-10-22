const ipc = require('electron').ipcRenderer;
import * as Konva from 'konva';
import * as $ from 'jquery';

$('#video-container').hide();

const stage = new Konva.Stage({
  container: 'root',
  width: window.innerWidth,
  height: window.innerHeight,
});

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
  } else if (command.type === 'text') {
    const layer2 = layers[command.layerId];
    obj = new Konva.Text({
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
