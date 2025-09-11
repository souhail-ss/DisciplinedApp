import styled from 'styled-components';

export const Button = styled.button<{ variant?: 'primary' | 'success' }>`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  color: var(--white);
  transition: background-color 0.2s ease;
  cursor: pointer;

  ${({ variant }) =>
    variant === 'success'
      ? `
        background-color: var(--light-green);
        &:hover {
          background-color: #a5d6a7;
        }
      `
      : `
        background-color: var(--soft-teal);
        &:hover {
          background-color: #26c6da;
        }
      `}
`;