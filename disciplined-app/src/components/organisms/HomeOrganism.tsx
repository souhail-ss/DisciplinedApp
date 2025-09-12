import React, { useState } from 'react';
import { Header } from '../molecules/Header';
import { GoalsList } from './GoalsList';
import { Button } from '../atoms/Button';
import { Home, AddButton } from './HomeOrganism.style';
import Modal from '../atoms/Modal';
import axios from 'axios';

interface Goal {
  id?: number;
  title: string;
  description: string;
  isDaily: boolean;
  completed?: boolean;
}

export const HomeOrganism: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddGoal = async (title: string, description: string, isDaily: boolean) => {
    try {
      const response = await axios.post('http://localhost:3000/goals', {
        title,
        description,
        isDaily,
        completed: false,
      });
      // Assuming the backend returns the new goal with an ID
      const newGoal: Goal = response.data;
      // This update will be reflected when GoalsList fetches again due to useEffect
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  return (
    <Home>
      <Header userName="Souhail" />
      <br />
      <GoalsList />
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