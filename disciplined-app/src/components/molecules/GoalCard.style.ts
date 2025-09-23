import styled from 'styled-components';

export const GoalCard = styled.div`
  background-color: var(--white);
  min-height: 15vh;
  padding: 0.75rem;
  border-radius: 1rem;
  box-shadow: 0 1px 3px var(--light-gray);
  margin-bottom: 1rem;
  text-align: center; 
  

  & > button {
    margin-top: 0.5rem;
  }
`;

export const GoalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color:black;
`;  

export const GoalDescription = styled.p`
  font-size: 1.2rem;
  color: var(--dark-gray);
  margin-top: 0.25rem;
`;
  
// export const GoalCardButton = styled.button`
//   margin-top: 5rem;
//   padding: 0.5rem 1rem;
//   border: none;
//   border-radius: 5px;
//   background-color: #141e2dff;
//   transition: background-color 0.2s ease;
//   color:white;

//   &:hover {
//     background-color: #0c1d37;
//   }

//   &:active {
//     background-color: var(--dark-blue);
//   }
// `;  
