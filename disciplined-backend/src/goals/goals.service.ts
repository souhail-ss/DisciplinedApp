import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DateTime } from 'luxon';
import { Goal } from '../types/goal';

@Injectable()
export class GoalsService {
  private goals: Goal[] = [];
  private idCounter = 1;

  createGoal(goalData: Omit<Goal, 'id' | 'createdDate'>): Goal {
    const newGoal: Goal = {
      id: this.idCounter++,
      ...goalData,
      completed: false,
      createdDate: new Date(),
    };
    this.goals.push(newGoal);
    return newGoal;
  }

  getGoals(): Goal[] {
    return this.goals;
  }

  markGoalDone(id: number): Goal | null {
    const goal = this.goals.find((g) => g.id === id);
    if (goal) {
      goal.completed = true;
      if (goal.type === 'daily') {
        this.goals = this.goals.filter((g) => g.id !== id);
      }
      return goal;
    }
    return null;
  }

  updateGoal(id: number, updateData: Partial<Pick<Goal, 'title' | 'description'>>): Goal | null { // New method to update goal
    const goal = this.goals.find((g) => g.id === id); // Find the goal by ID
    if (goal) { // If the goal exists
      Object.assign(goal, updateData); // Update the goal's title or description with the new data
      return goal; // Return the updated goal
    }
    return null; // Return null if the goal wasn't found
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, { timeZone: 'Europe/Paris' })
  resetDailyGoals() {
    const now = DateTime.now().setZone('Europe/Paris');
    this.goals = this.goals.filter((goal) => {
      if (goal.type === 'daily' && !goal.completed) {
        goal.completed = false;
        goal.lastResetDate = now.toJSDate();
        return true;
      }
      return true;
    });
    console.log('Daily goals reset for new day');
  }

  @Cron('0 * * * *', { timeZone: 'Europe/Paris' })
  sendReminder() {
    const unfinishedDaily = this.goals.filter((goal) => goal.type === 'daily' && !goal.completed);
    if (unfinishedDaily.length > 0) {
      console.log(`Reminder: You have ${unfinishedDaily.length} unfinished daily goals:`, unfinishedDaily.map((g) => g.title));
    }
  }
}