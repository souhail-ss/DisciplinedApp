import { GoalsService } from './goals.service';
import { Goal } from './entities/goal.entity';
export declare class GoalsController {
    private readonly goalsService;
    constructor(goalsService: GoalsService);
    create(goalData: Omit<Goal, 'id' | 'createdDate'>): Promise<Goal>;
    findAll(): Promise<Goal[]>;
    getToday(): Promise<Goal[]>;
    complete(id: string): Promise<Goal | null>;
    update(id: string, updateData: Partial<Pick<Goal, 'title' | 'description'>>): Promise<Goal | null>;
}
