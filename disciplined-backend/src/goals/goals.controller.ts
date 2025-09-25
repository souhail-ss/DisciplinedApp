import { Controller, Get, Post, Body, Param, Put, Patch, Delete } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { Goal } from './entities/goal.entity'; // Update import to entity

@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Post()
  async create(@Body() goalData: Omit<Goal, 'id' | 'createdDate'>): Promise<Goal> {
    return this.goalsService.createGoal(goalData);
  }

  @Get()
  async findAll(): Promise<Goal[]> {
    return this.goalsService.getGoals();
  }

  @Get('today')
  async getToday(): Promise<Goal[]> {
    return this.goalsService.getGoals(); // Adjust if you want only today's goals
  }

  @Put(':id/complete')
  async complete(@Param('id') id: string): Promise<Goal | null> {
    return this.goalsService.markGoalDone(parseInt(id));
  }
@Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.goalsService.deleteGoal(parseInt(id));
  }
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: Partial<Pick<Goal, 'title' | 'description'>>,
  ): Promise<Goal | null> {
    return this.goalsService.updateGoal(parseInt(id), updateData);
  }
}