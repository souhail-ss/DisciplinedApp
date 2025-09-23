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
      const type = isDaily ? 'daily' : 'weekly';
      const response = await api.post('/goals', { title, description, type });
      setGoals((prevGoals) => [...prevGoals, response.data]);
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  const handleEdit = async (id: number) => {
    const goalToEdit = goals.find((g) => g.id === id);
    if (!goalToEdit) {
      console.error('Goal not found for ID:', id);
      return;
    }

    const newTitle = prompt('New title:', goalToEdit.title) || goalToEdit.title;
    const newDescription = prompt('New description:', goalToEdit.description) || goalToEdit.description;
    if (newTitle !== goalToEdit.title || newDescription !== goalToEdit.description) {
      try {
        const response = await api.patch(`/goals/${id}`, {
          title: newTitle,
          description: newDescription,
        });
        console.log('Patch response:', response.data);
        setGoals(goals.map((g) => (g.id === id ? { ...g, ...response.data } : g)));
      } catch (error) {
        console.error('Error updating goal:', error.response?.data || error.message);
      }
    }
  };

  return (
    <Home>
      <Header userName="Souhail" />
      <br />
      <GoalsList goals={goals} setGoals={setGoals} onEdit={handleEdit} /> {/* Pass onEdit here */}
      <AddButton onClick={() => setIsModalOpen(true)}>+</AddButton>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddGoal}
        onEdit={handleEdit} 
      />
    </Home>
  );
};

export default HomeOrganism;