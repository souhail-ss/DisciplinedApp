import styled from 'styled-components';

export const GoalsListContainer = styled.div`
  margin-top: 0.5rem;
  border: 2px solid white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  text-align: center;
  
  min-height: auto;
  min-width: 20vw;

  & > div:first-child {
    margin-bottom: 0.5rem;
    border-bottom: 2px solid #ADD8E6;
    width: fit-content;
  
  }

  & > div:last-child {
    margin-top: 1rem;
  }
`;