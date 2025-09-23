import styled from 'styled-components';

export const GoalsListContainer = styled.div`
  margin-top: 0.2rem;
  border-radius: 3rem;
  padding: 1.5rem;
  text-align: center;
  
  min-height: 40vh;
  min-width: 20vw;

  & > div:first-child {
    margin-bottom: 2rem;
    border-bottom: 2px solid #ADD8E6;
    width: fit-content;
  
  }

  & > div:last-child {
    margin-top: 1rem;
  }
`;