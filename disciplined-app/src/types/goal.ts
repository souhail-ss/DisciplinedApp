export interface Goal {
  id?: number;
  title: string;
  description: string;
  isDaily: boolean;
  completed?: boolean;
}