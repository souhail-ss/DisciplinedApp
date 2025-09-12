import styled from 'styled-components';

export const GoalsListContainer = styled.div`
  margin-top: 0.5rem;
  border: 2px solid white;
  border-radius: 0.5rem;
  padding: 1.5rem;

  & > div:first-child {
    margin-bottom: 0.5rem;
    border-bottom: 2px solid var(--soft-teal);
    width: fit-content;
  }

  & > div:last-child {
    margin-top: 1rem;
  }
`;