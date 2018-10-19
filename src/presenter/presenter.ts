alert('hello world');

const ipc = require('electron').ipcRenderer;

ipc.on('message', (event: any, message: any) => {
  alert('message received: ' + message);
});