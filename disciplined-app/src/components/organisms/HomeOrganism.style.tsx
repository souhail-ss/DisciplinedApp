import styled from 'styled-components';

export const Home = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, var(--mid-light-blue), var(--white));
  padding: 1rem;
  position: relative;
  display: flex;
  align-items: center;
`;

export const AddButton = styled.button`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px var(--light-gray);
  background-color: var(--soft-teal);
  color: var(--white);
  transition: transform 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;