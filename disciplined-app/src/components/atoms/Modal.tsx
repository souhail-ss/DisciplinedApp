import React from 'react';
import {
  ModalOverlay,
  ModalContent,
  CloseButton,
  FormGroup,
  RadioGroup,
  SubmitButton,
} from './Modal.style';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, description: string, isDaily: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [isDaily, setIsDaily] = React.useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, description, isDaily);
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="title">Goal Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <RadioGroup>
              <label>
                <input
                  type="radio"
                  checked={isDaily}
                  onChange={() => setIsDaily(true)}
                />
                Daily (Every Day)
              </label>
              <label>
                <input
                  type="radio"
                  checked={!isDaily}
                  onChange={() => setIsDaily(false)}
                />
                One-Time (Short Goal)
              </label>
            </RadioGroup>
          </FormGroup>
          <SubmitButton type="submit">Add Goal</SubmitButton>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;