import Konva from 'konva';
import { KonvaCommand } from '../interop/KonvaCommand';

export function getKonvaObject(command: KonvaCommand): any {
  if (command.action === 'create') {
    if (command.type === 'text') {
      return new Konva.Text({
        ...command.data,
        id: command.id,
      });
    }

    if (command.type === 'rect') {
      return new Konva.Rect({
        ...command.data,
        id: command.id,
      })
    }
  }

  return null;
}

export function getHeightOfTextObject(command: KonvaCommand): number {
  const obj = getKonvaObject(command);
  if (obj) {
    return obj.getHeight();
  }
  return null;
}
