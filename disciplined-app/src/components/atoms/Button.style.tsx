import styled from 'styled-components';

export const Button = styled.button`
box-shadow: 0 2px 4px var(--light-gray);
  margin-left: 15%;
  padding: 0.8rem 1rem;
  border-radius: 0.6rem;
  border: none;
  font-weight: 500;
  font-size: 1rem;
  color: white;
  transition: background-color 0.2s ease;
  cursor: pointer;

  ${({ variant }) =>
    variant === 'success'
      ? `
        background-color:#0d8f34;
        &:hover {
          background-color: #26c6da;
        }
      `
      : `
        background-color: #222222;
        &:hover {
          background-color: #00a938;
        }
      `}
`;
