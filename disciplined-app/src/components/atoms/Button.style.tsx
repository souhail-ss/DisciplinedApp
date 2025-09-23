import styled from 'styled-components';

export const Button = styled.button`
  margin-left: 15%;
  padding: 0.7rem 1rem;
  border-radius: 0.6rem;
  border: none;
  font-weight: 500;
  font-size: 1rem;
  color: var(--black);
  transition: background-color 0.2s ease;
  cursor: pointer;

  ${({ variant }) =>
    variant === 'success'
      ? `
        background-color:#26c6da;
        &:hover {
          background-color: #26c6da;
        }
      `
      : `
        background-color: #e95d5d;
        &:hover {
          background-color: #ed2020;
        }
      `}
`;
