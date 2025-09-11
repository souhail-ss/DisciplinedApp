import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Goal } from '../../types/goal';
import { GoalCard } from '../molecules/GoalCard';
import { Text } from '../atoms/Text';
import { GoalsListContainer } from './GoalsList.style';

export const GoalsList = () => {
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get('http://localhost:3000/goals/today');
        setGoals(response.data);
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };
    fetchGoals();
  }, []);

  const handleMarkDone = async (id: number) => {
    try {
      await axios.put(`http://localhost:3000/goals/${id}/complete`);
      setGoals(goals.map(goal => goal.id === id ? { ...goal, completed: true } : goal));
    } catch (error) {
      console.error('Error marking goal as done:', error);
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
            <GoalCard key={goal.id} goal={goal} onMarkDone={() => handleMarkDone(goal.id)} />
          ))}
        </div>
      )}
    </GoalsListContainer>
  );
};