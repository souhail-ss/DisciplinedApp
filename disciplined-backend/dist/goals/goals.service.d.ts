import { Repository } from 'typeorm';
import { Goal } from './entities/goal.entity';
export declare class GoalsService {
    private goalsRepository;
    constructor(goalsRepository: Repository<Goal>);
    createGoal(goalData: Omit<Goal, 'id' | 'createdDate'>): Promise<Goal>;
    getGoals(): Promise<Goal[]>;
    markGoalDone(id: number): Promise<Goal | null>;
    updateGoal(id: number, updateData: Partial<Pick<Goal, 'title' | 'description'>>): Promise<Goal | null>;
    resetDailyGoals(): Promise<void>;
    sendReminder(): Promise<void>;
}
