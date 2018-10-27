import * as Konva from 'konva';
import { KonvaCommand } from '../interop/KonvaCommand';

const classMapping: { [key: string]: any } = Object.freeze({
  text: Konva.Text,
  rect: Konva.Rect,
});

export function getKonvaObject(command: KonvaCommand): any {
  if (command.action === 'create') {
    return new classMapping[command.type]({
      ...command.data,
      id: command.id,
    });
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
