import { GoalsService } from './goals.service';
import type { Goal } from '../types/goal';
export declare class GoalsController {
    private readonly goalsService;
    constructor(goalsService: GoalsService);
    create(goalData: Omit<Goal, 'id' | 'createdDate'>): Goal;
    findAll(): Goal[];
    getToday(): Goal[];
    complete(id: string): Goal | null;
    update(id: string, updateData: Partial<Pick<Goal, 'title' | 'description'>>): Goal | null;
}
