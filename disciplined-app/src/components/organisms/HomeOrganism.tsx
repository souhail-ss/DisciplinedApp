import React, { useState } from 'react';
import { Header } from '../molecules/Header';
import { GoalsList } from './GoalsList';
import { Button } from '../atoms/Button';
import { Home, AddButton } from './HomeOrganism.style';
import Modal from '../atoms/Modal';

interface Goal {
  id?: number;
  title: string;
  description: string;
  isDaily: boolean;
  completed?: boolean;
}

export const HomeOrganism: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddGoal = (title: string, description: string, isDaily: boolean) => {
    const newGoal: Goal = {
      id: Date.now(),
      title,
      description,
      isDaily,
      completed: false,
    };
    setGoals((prevGoals) => [...prevGoals, newGoal]);
  };

  return (
    <Home>
      <Header userName="Souhail" />
      <br />
      <GoalsList goals={goals} setGoals={setGoals} />
      <AddButton onClick={() => setIsModalOpen(true)}>+</AddButton>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddGoal}
      />
    </Home>
  );
};

export default HomeOrganism;