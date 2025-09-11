import styled from 'styled-components';

export const Text = styled.div<{ variant?: 'h1' | 'h2' | 'body' | 'caption' }>`
  ${({ variant }) => {
    switch (variant) {
      case 'h1':
        return `
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--dark-gray);
        `;
      case 'h2':
        return `
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--dark-gray);
        `;
      case 'body':
        return `
          font-size: 1rem;
          color: var(--light-gray);
        `;
      case 'caption':
        return `
          font-size: 0.875rem;
          font-style: italic;
          color: var(--soft-teal);
        `;
      default:
        return '';
    }
  }}
`;