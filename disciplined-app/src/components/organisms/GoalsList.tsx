import React from 'react';
import { Goal } from '../../types/goal';
import { GoalCard } from '../molecules/GoalCard';
import { Text } from '../atoms/Text';
import { GoalsListContainer } from './GoalsList.style';

interface GoalsListProps {
  goals: Goal[];
  setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
}

export const GoalsList: React.FC<GoalsListProps> = ({ goals, setGoals }) => {
  const handleMarkDone = (id: number, isCompleted: boolean) => {
    if (isCompleted) {
      // Mark as completed
      setGoals((prevGoals) =>
        prevGoals.map((goal) =>
          goal.id === id ? { ...goal, completed: true } : goal
        )
      );
    } else {
      // Delete the goal
      setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
    }
  };

  return (
    <GoalsListContainer>
      <Text variant="h2">Today’s Goals</Text>
      {goals.length === 0 ? (
        <Text variant="body">No goals today? Add one!</Text>
      ) : (
        <div>
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onMarkDone={(id, isCompleted) => handleMarkDone(id, isCompleted)}
            />
          ))}
        </div>
      )}
    </GoalsListContainer>
  );
};

export default GoalsList;