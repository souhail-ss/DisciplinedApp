import React from 'react';
import { Text as StyledText } from './Text.style';

interface TextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'body' | 'caption';
  className?: string;
}

export const Text = ({ children, variant = 'body', className = '' }: TextProps) => {
  return <StyledText variant={variant} className={className}>{children}</StyledText>;
};