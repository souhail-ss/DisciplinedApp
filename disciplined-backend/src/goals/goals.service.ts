import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Goal } from './entities/goal.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DateTime } from 'luxon';

@Injectable()
export class GoalsService {
  constructor(
    @InjectRepository(Goal)
    private goalsRepository: Repository<Goal>,
  ) {}

  async createGoal(goalData: Omit<Goal, 'id' | 'createdDate'>): Promise<Goal> {
    const newGoal = this.goalsRepository.create({
      ...goalData,
      completed: false,
    });
    return await this.goalsRepository.save(newGoal);
  }

  async getGoals(): Promise<Goal[]> {
    return await this.goalsRepository.find();
  }

  async markGoalDone(id: number): Promise<Goal | null> {
    const goal = await this.goalsRepository.findOne({ where: { id } });
    if (!goal) return null;
    goal.completed = true;
    const savedGoal = await this.goalsRepository.save(goal);
    if (goal.type === 'daily') {
      await this.goalsRepository.remove(goal);
      return null;
    }
    return savedGoal;
  }

  async updateGoal(id: number, updateData: Partial<Pick<Goal, 'title' | 'description'>>): Promise<Goal | null> {
    const goal = await this.goalsRepository.findOne({ where: { id } });
    if (!goal) return null;
    Object.assign(goal, updateData);
    return await this.goalsRepository.save(goal);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, { timeZone: 'Europe/Paris' })
  async resetDailyGoals() {
    const now = DateTime.now().setZone('Europe/Paris');
    const dailyGoals = await this.goalsRepository.find({ where: { type: 'daily', completed: false } });
    for (const goal of dailyGoals) {
      goal.completed = false;
      goal.lastResetDate = now.toJSDate();
      await this.goalsRepository.save(goal);
    }
    console.log('Daily goals reset for new day');
  }

  @Cron('0 * * * *', { timeZone: 'Europe/Paris' })
  async sendReminder() {
    const unfinishedDaily = await this.goalsRepository.find({ where: { type: 'daily', completed: false } });
    if (unfinishedDaily.length > 0) {
      console.log(`Reminder: ${unfinishedDaily.length} unfinished daily goals:`, unfinishedDaily.map(g => g.title));
    }
  }
}