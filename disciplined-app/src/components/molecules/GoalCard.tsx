import React from 'react';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { GoalCardButton, GoalDescription, GoalTitle, GoalCard as StyledGoalCard } from './GoalCard.style';
import { Goal } from '../../types/goal';

interface GoalCardProps {
  goal: Goal;
  onMarkDone: (id: number, isCompleted: boolean) => void; // Updated to pass id and action
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal, onMarkDone }: GoalCardProps) => {
  const handleClick = () => {
    if (goal.completed) {
      onMarkDone(goal.id ?? 0, false); // Delete the goal when already completed
    } else {
      onMarkDone(goal.id ?? 0, true); // Mark as completed
    }
  };

  return (
    <StyledGoalCard>
      <GoalTitle>{goal.title}</GoalTitle>
      <GoalDescription>{goal.description}</GoalDescription>
      <GoalCardButton
        onClick={handleClick}
      >
        {goal.completed ? 'Done' : 'Mark Done'}
      </GoalCardButton>
    </StyledGoalCard>
  );
};