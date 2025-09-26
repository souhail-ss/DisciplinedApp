import styled, { keyframes } from 'styled-components';

// Animations
const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const GoalsListContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
  z-index: 10;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
  animation: ${fadeInDown} 1s ease-out;
  
  h1 {
    font-size: 3.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 10px;
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }
  
  .greeting {
    font-size: 1.3rem;
    color: #cbd5e0;
    margin-bottom: 5px;
  }
  
  .tagline {
    font-size: 1rem;
    color: #81c784;
    font-style: italic;
  }
`;

export const StatsBar = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  animation: ${fadeInUp} 1s ease-out 0.2s both;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

export const StatCard = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
`;

export const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #81c784;
  margin-bottom: 5px;
`;

export const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #a0aec0;
`;

export const ProgressRing = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto 15px;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0 20px 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: #f7fafc;
  margin: 0;
`;

export const AddGoalButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  padding: 12px 24px;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  span {
    font-size: 1.2rem;
    font-weight: 700;
  }
`;

export const GoalsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  & > * {
    animation: ${slideIn} 0.5s ease-out;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  
  p {
    font-size: 1.1rem;
    color: #a0aec0;
    margin: 0;
  }
`;

// Additional utility styles for the Text component variants
export const StyledText = styled.div<{ variant?: string }>`
  ${({ variant }) => {
    switch (variant) {
      case 'h1':
        return `
          font-size: 3.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 10px;
          
          @media (max-width: 768px) {
            font-size: 2.5rem;
          }
        `;
      case 'greeting':
        return `
          font-size: 1.3rem;
          color: #cbd5e0;
          margin-bottom: 5px;
        `;
      case 'tagline':
        return `
          font-size: 1rem;
          color: #81c784;
          font-style: italic;
        `;
      case 'body':
        return `
          font-size: 1.1rem;
          color: #a0aec0;
          line-height: 1.6;
        `;
      default:
        return `
          color: #f7fafc;
        `;
    }
  }}
`;

// Background styles for the main container (you'll need to add this to your main app)
export const AppBackground = styled.div`
  background: linear-gradient(135deg, #0d1421 0%, #1a2332 50%, #2d3748 100%);
  min-height: 100vh;
  color: white;
  position: relative;
  overflow-x: hidden;
  
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
      radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 50px 50px;
    pointer-events: none;
    z-index: 1;
  }
`;

// Floating Add Button (if you want to add it later)
export const FloatingAddButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  z-index: 1000;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
  }
  
  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
  }
`;