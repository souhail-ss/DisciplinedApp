import React from 'react';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { GoalCard as StyledGoalCard } from './GoalCard.style';
import { Goal } from '../../types/goal';

interface GoalCardProps {
  goal: Goal;
  onMarkDone: () => void;
}

export const GoalCard = ({ goal, onMarkDone }: GoalCardProps) => {
  return (
    <StyledGoalCard>
      <Text variant="h2">{goal.title}</Text>
      <Text variant="body">{goal.description}</Text>
      <Button
        variant={goal.completed ? 'success' : 'primary'}
        onClick={onMarkDone}
      >
        {goal.completed ? 'Done' : 'Mark Done'}
      </Button>
    </StyledGoalCard>
  );
};