import React from 'react';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { GoalDescription, GoalTitle, GoalCard as StyledGoalCard } from './GoalCard.style';
import { Goal } from '../../types/goal';

interface GoalCardProps {
  goal: Goal;
  onMarkDone: (id: number, completed: boolean) => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal, onMarkDone }) => {
  return (
    <StyledGoalCard>
      <GoalTitle>{goal.title}</GoalTitle>
      <GoalDescription>{goal.description}</GoalDescription>
      <Button
        variant={goal.completed ? 'success' : 'primary'}
        onClick={() => onMarkDone(goal.id ?? 0, goal.completed ?? false)}
      >
        {goal.completed ? 'Mark Undone' : 'Mark Done'}
      </Button>
    </StyledGoalCard>
  );
};