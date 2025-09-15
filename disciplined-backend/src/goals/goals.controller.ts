import { Controller, Get, Post, Body, Param, Put, Patch } from '@nestjs/common'; // Add Patch decorator
import { GoalsService } from './goals.service';
import type { Goal } from '../types/goal';

@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Post()
  create(@Body() goalData: Omit<Goal, 'id' | 'createdDate'>): Goal {
    return this.goalsService.createGoal(goalData);
  }

  @Get()
  findAll(): Goal[] {
    return this.goalsService.getGoals();
  }

  @Get('today')
  getToday(): Goal[] {
    return this.goalsService.getGoals();
  }

  @Put(':id/complete')
  complete(@Param('id') id: string): Goal | null {
    return this.goalsService.markGoalDone(parseInt(id));
  }

  @Patch(':id') // New endpoint to update a goal's title or description
  update(
    @Param('id') id: string,
    @Body() updateData: Partial<Pick<Goal, 'title' | 'description'>>, // Allow partial updates to title or description
  ): Goal | null {
    return this.goalsService.updateGoal(parseInt(id), updateData);
  }
}