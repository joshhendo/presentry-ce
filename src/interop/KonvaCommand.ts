export interface KonvaCommand {
  type: 'layer' | 'text' | 'tween';
  id: string;
  layerId?: string;
  action: 'create' | 'tween';
  data: any;
}
