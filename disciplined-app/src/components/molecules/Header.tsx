import React from 'react';
import { Text } from '../atoms/Text';
import { Header as StyledHeader } from './Header.style';

interface HeaderProps {
  userName: string;
}

export const Header = ({ userName }: HeaderProps) => {
  return (
    <StyledHeader>
      <Text variant="h1">Stay disciplined</Text>
      <Text variant="body">Good Morning, {userName}!</Text>
      <Text variant="caption">Start your day with purpose!</Text>
    </StyledHeader>
  );
};