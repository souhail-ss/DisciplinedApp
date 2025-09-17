import React, { useState, useEffect } from 'react';
import { Header } from '../molecules/Header';
import { GoalsList } from './GoalsList';
import { Button } from '../atoms/Button';
import { Home, AddButton } from './HomeOrganism.style';
import Modal from '../atoms/Modal';
import api from '../../api/axiosConfig';

interface Goal {
  id?: number;
  title: string;
  description: string;
  type: 'daily' | 'weekly';
  completed?: boolean;
  createdDate?: Date;
}

export const HomeOrganism: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await api.get('/goals');
      setGoals(response.data);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  const handleAddGoal = async (title: string, description: string, isDaily: boolean) => {
    try {
      console.log('Home receiving:', { title, description, isDaily }); // Debug log
      const type = isDaily ? 'daily' : 'weekly';
      const response = await api.post('/goals', { title, description, type });
      if (!response.data) throw new Error('No data returned');
      setGoals((prevGoals) => [...prevGoals, response.data]);
    } catch (error) {
      console.error('Error adding goal:', error);
    }
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