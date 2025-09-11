export interface Goal {
  id: number;
  title: string;
  description: string;
  type: 'daily' | 'one-time';
  date?: string;
  completed?: boolean;
}