export interface Goal {
    id: number;
    title: string;
    description: string;
    type: 'daily' | 'weekly';
    completed: boolean;
    createdDate: Date;
    lastResetDate?: Date;
}
