import styled from 'styled-components';

export const GoalCard = styled.div`
  background-color: var(--white);
  padding: 0.75rem;
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px var(--light-gray);
  margin-bottom: 1rem;
  text-align: center; /* Center content within the card */

  & > button {
    margin-top: 0.5rem;
  }
`;