export interface KonvaCommand {
  type: 'layer' | 'text' | 'tween' | 'rect';
  id: string;
  layerId?: string;
  action: 'create' | 'tween';
  data: any;
}
