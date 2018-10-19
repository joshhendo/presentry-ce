const ipc = require('electron').ipcRenderer;
import * as Konva from 'konva';

const stage = new Konva.Stage({
  container: 'root',
  width: window.innerWidth,
  height: window.innerHeight,
});

ipc.on('message', (event: any, message: any) => {
  const command = JSON.parse(message);

  let obj = null;
  if (command.type === 'text') {
    const layer2 = new Konva.Layer();
    obj = new Konva.Text(command.data);
    layer2.add(obj);
    stage.add(layer2);
  } else if (command.type === 'tween') {
    const tween = new Konva.Tween({
      node: stage.find(`#${command.id}`)[0],
      ...command.data,
    });

    tween.play();
  } else {
    return;
  }
});
