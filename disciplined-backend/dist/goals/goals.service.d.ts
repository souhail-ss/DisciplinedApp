import { Goal } from '../types/goal';
export declare class GoalsService {
    private goals;
    private idCounter;
    createGoal(goalData: Omit<Goal, 'id' | 'createdDate'>): Goal;
    getGoals(): Goal[];
    markGoalDone(id: number): Goal | null;
    updateGoal(id: number, updateData: Partial<Pick<Goal, 'title' | 'description'>>): Goal | null;
    resetDailyGoals(): void;
    sendReminder(): void;
}
