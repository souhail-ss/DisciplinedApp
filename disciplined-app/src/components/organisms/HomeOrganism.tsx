import React from 'react';
import { Header } from '../molecules/Header';
import { GoalsList } from './GoalsList';
import { Button } from '../atoms/Button';
import { Home, AddButton } from './HomeOrganism.style';

export const HomeOrganism = () => {
  const handleAddGoal = () => {
    console.log('Navigate to Add Goal'); // Replace with routing later
  };

  return (
    <Home>
      <Header userName="Souhail" />
      <br/>
      <GoalsList />
      <AddButton onClick={handleAddGoal}>+</AddButton>
    </Home>
  );
};