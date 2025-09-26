import React, { useMemo } from 'react';
import { Goal, GoalStats } from '../../types/goal';
import { GoalCard } from '../molecules/GoalCard';
import { Text } from '../atoms/Text';
import { 
  GoalsListContainer,
  Header,
  StatsBar,
  StatCard,
  StatNumber,
  StatLabel,
  ProgressRing,
  SectionHeader,
  SectionTitle,
  AddGoalButton,
  GoalsContainer,
  EmptyState
} from './GoalsList.style';
import api from '../../api/axiosConfig';

interface GoalsListProps {
  goals: Goal[];
  setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
  onEdit: (id: number) => void;
  onAddGoal?: () => void;
  userName?: string;
}

export const GoalsList: React.FC<GoalsListProps> = ({ 
  goals, 
  setGoals, 
  onEdit, 
  onAddGoal,
  userName = "User"
}) => {
  
  // Calculate stats from goals
  const stats: GoalStats = useMemo(() => {
    const todayTotal = goals.length;
    const todayCompleted = goals.filter(g => g.completed).length;
    const todayProgress = todayTotal > 0 ? Math.round((todayCompleted / todayTotal) * 100) : 0;
    
    // Mock streak and total completed for now - you can enhance this with backend data
    const currentStreak = 12; // This should come from backend
    const totalCompleted = 47; // This should come from backend
    
    return {
      todayProgress,
      currentStreak,
      totalCompleted,
      todayCompleted,
      todayTotal
    };
  }, [goals]);

  const handleMarkDone = async (id: number, currentCompleted: boolean) => {
    try {
      const response = await api.put(`/goals/${id}/complete`);
      const updatedGoal = response.data;
      
      if (updatedGoal) {
        setGoals((prevGoals) =>
          prevGoals.map((goal) =>
            goal.id === id ? { 
              ...goal, 
              completed: !currentCompleted,
              completedAt: !currentCompleted ? new Date() : undefined
            } : goal
          )
        );
        
        if (updatedGoal.type === 'daily' && !currentCompleted) {
          setGoals((prevGoals) => prevGoals.filter((g) => g.id !== id));
        }
      } else {
        setGoals((prevGoals) => prevGoals.filter((g) => g.id !== id));
      }
    } catch (error) {
      console.error('Error marking goal:', error);
    }
  };

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getProgressRingOffset = (progress: number) => {
    const circumference = 2 * Math.PI * 26; // radius = 26
    return circumference - (progress / 100) * circumference;
  };

  // Sort goals: incomplete first, then by priority
  const sortedGoals = useMemo(() => {
    return [...goals].sort((a, b) => {
      // Incomplete goals first
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      
      // Then by priority
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      const aPriority = priorityOrder[a.priority || 'low'];
      const bPriority = priorityOrder[b.priority || 'low'];
      
      return aPriority - bPriority;
    });
  }, [goals]);

  return (
    <GoalsListContainer>
      <Header>
        <Text variant="h1">Stay disciplined</Text>
        <Text variant="greeting">{getTimeBasedGreeting()}, {userName}!</Text>
        <Text variant="tagline">Start your day with purpose! 🚀</Text>
      </Header>

      <StatsBar>
        <StatCard>
          <ProgressRing>
            <svg width="60" height="60">
              <circle 
                cx="30" 
                cy="30" 
                r="26" 
                fill="transparent"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="4"
              />
              <circle 
                cx="30" 
                cy="30" 
                r="26" 
                fill="transparent"
                stroke="#81c784"
                strokeWidth="4"
                strokeDasharray={163}
                strokeDashoffset={getProgressRingOffset(stats.todayProgress)}
                transform="rotate(-90 30 30)"
                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
              />
            </svg>
          </ProgressRing>
          <StatNumber>{stats.todayProgress}%</StatNumber>
          <StatLabel>Today's Progress</StatLabel>
        </StatCard>

        <StatCard>
          <StatNumber>{stats.currentStreak}</StatNumber>
          <StatLabel>Day Streak</StatLabel>
        </StatCard>

        <StatCard>
          <StatNumber>{stats.totalCompleted}</StatNumber>
          <StatLabel>Goals Completed</StatLabel>
        </StatCard>
      </StatsBar>

      <SectionHeader>
        <SectionTitle>Today's Goals</SectionTitle>
        {onAddGoal && (
          <AddGoalButton onClick={onAddGoal}>
            <span>+</span> Add Goal
          </AddGoalButton>
        )}
      </SectionHeader>

      <GoalsContainer>
        {goals.length === 0 ? (
          <EmptyState>
            <Text variant="body">No goals today? Add one to get started! 🎯</Text>
          </EmptyState>
        ) : (
          <>
            {sortedGoals.map((goal, index) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onMarkDone={() => handleMarkDone(goal.id ?? 0, goal.completed ?? false)}
                onEdit={onEdit}
                animationDelay={index * 0.1} // Stagger animations
              />
            ))}
          </>
        )}
      </GoalsContainer>
    </GoalsListContainer>
  );
};

export default GoalsList;