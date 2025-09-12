import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: var(--white);
  padding: 2rem;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--dark-gray);

  &:hover {
    color: var(--soft-teal);
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.25rem;
    font-weight: 500;
  }

  input,
  textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid var(--light-gray);
    border-radius: 0.25rem;
    font-size: 1rem;
  }

  textarea {
    min-height: 80px;
  }
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;

  label {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
`;

export const SubmitButton = styled.button`
  background-color: var(--soft-teal);
  color: var(--white);
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #26c6da;
  }
`;