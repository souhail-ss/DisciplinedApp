import styled from 'styled-components';

export const Text = styled.div<{ variant?: 'h1' | 'h2' | 'body' | 'caption' }>`
  ${({ variant }) => {
    switch (variant) {
      case 'h1':
        return `
          font-size: 2rem;
          font-weight: bold;
          color: var(--white);
        `;
      case 'h2':
        return `
          font-size: 1.55rem;
          font-weight: 600;
          color: var(--white);
        `;
      case 'body':
        return `
          font-size: 1.3rem;
          color: var(--light-gray);
        `;
      case 'caption':
        return `
          font-size: 1rem;
          font-style: italic;
          color: var(--soft-teal);
        `;
      default:
        return '';
    }
  }}
`;