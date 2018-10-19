export interface KonvaCommand {
  type: 'text' | 'tween';
  id: string;
  action: 'create' | 'delete';
  data: any;
}
