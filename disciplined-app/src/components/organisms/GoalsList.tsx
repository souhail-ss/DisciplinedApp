import React from 'react';
import { Goal } from '../../types/goal';
import { GoalCard } from '../molecules/GoalCard';
import { Text } from '../atoms/Text';
import { GoalsListContainer } from './GoalsList.style';
import api from '../../api/axiosConfig';

interface GoalsListProps {
  goals: Goal[];
  setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
  onEdit: (id: number) => void;
}

export const GoalsList: React.FC<GoalsListProps> = ({ goals, setGoals, onEdit }) => {
  const handleMarkDone = async (id: number, currentCompleted: boolean) => {
    try {
      const response = await api.put(`/goals/${id}/complete`);
      const updatedGoal = response.data;
      if (updatedGoal) {
        setGoals((prevGoals) =>
          prevGoals.map((goal) =>
            goal.id === id ? { ...goal, completed: !currentCompleted } : goal
          )
        );
        if (updatedGoal.type === 'daily' && !currentCompleted) {
          setGoals((prevGoals) => prevGoals.filter((g) => g.id !== id));
        }
      } else {
        setGoals((prevGoals) => prevGoals.filter((g) => g.id !== id));
      }
    } catch (error) {
      console.error('Error marking goal:', error);
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
              onMarkDone={() => handleMarkDone(goal.id ?? 0, goal.completed ?? false)}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </GoalsListContainer>
  );
};

export default GoalsList;