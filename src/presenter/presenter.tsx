const ipc = require('electron').ipcRenderer;
import * as Konva from 'konva';

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
