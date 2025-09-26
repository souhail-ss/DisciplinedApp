import React from 'react';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { 
  StyledGoalCard,
  GoalHeader,
  GoalTitle,
  GoalDescription,
  GoalMeta,
  MetaItem,
  PriorityBadge,
  CategoryTag,
  GoalProgress,
  ProgressBar,
  ProgressFill,
  ProgressText,
  GoalActions,
  ActionButton,
  DeleteButton
} from './GoalCard.style';
import { Goal, DEFAULT_CATEGORIES, PRIORITY_COLORS } from '../../types/goal';

interface GoalCardProps {
  goal: Goal;
  onMarkDone: (id: number, completed: boolean) => void;
  onEdit: (id: number) => void;
  onDelete?: (id: number) => void;
  animationDelay?: number;
}

export const GoalCard: React.FC<GoalCardProps> = ({ 
  goal, 
  onMarkDone, 
  onEdit, 
  onDelete,
  animationDelay = 0 
}) => {
  
  // Get category info
  const category = goal.category || DEFAULT_CATEGORIES.find(c => c.id === 'other')!;
  
  // Calculate progress from subtasks if available
  const calculateProgress = () => {
    if (goal.completed) return 100;
    if (goal.progress !== undefined) return goal.progress;
    if (goal.subtasks && goal.subtasks.length > 0) {
      const completedSubtasks = goal.subtasks.filter(st => st.completed).length;
      return Math.round((completedSubtasks / goal.subtasks.length) * 100);
    }
    return 0;
  };

  const progress = calculateProgress();
  
  // Format time display
  const formatTime = (time: string) => {
    if (!time) return '';
    const [hour, minute] = time.split(':');
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
    return `${displayHour}:${minute} ${ampm}`;
  };

  // Get progress text
  const getProgressText = () => {
    if (goal.completed) {
      return goal.completedAt 
        ? `Completed at ${formatTime(goal.completedAt.toLocaleTimeString().slice(0, 5))}`
        : 'Completed! Great job!';
    }
    
    if (goal.subtasks && goal.subtasks.length > 0) {
      const completed = goal.subtasks.filter(st => st.completed).length;
      return `${completed} of ${goal.subtasks.length} subtasks completed`;
    }
    
    if (progress > 0) {
      return `${progress}% complete`;
    }
    
    return 'Not started yet';
  };

  // Get priority display name
  const getPriorityDisplay = (priority: string) => {
    return priority.charAt(0).toUpperCase() + priority.slice(1) + ' Priority';
  };

  return (
    <StyledGoalCard 
      priority={goal.priority || 'low'}
      completed={goal.completed || false}
      animationDelay={animationDelay}
    >
      <GoalHeader>
        <div>
          <GoalTitle completed={goal.completed}>{goal.title}</GoalTitle>
          <GoalDescription>{goal.description}</GoalDescription>
        </div>
      </GoalHeader>

      <GoalMeta>
        {goal.dueTime && (
          <MetaItem>
            <span>⏰</span> Due: {formatTime(goal.dueTime)}
          </MetaItem>
        )}
        
        {goal.estimatedDuration && (
          <MetaItem>
            <span>📚</span> {goal.estimatedDuration} min estimated
          </MetaItem>
        )}
        
        {goal.completed && goal.completedAt && (
          <MetaItem>
            <span>✅</span> Completed at {formatTime(goal.completedAt.toLocaleTimeString().slice(0, 5))}
          </MetaItem>
        )}
        
        {!goal.dueTime && !goal.estimatedDuration && !goal.completed && (
          <MetaItem>
            <span>🗓️</span> Flexible timing
          </MetaItem>
        )}

        <PriorityBadge priority={goal.priority || 'low'}>
          {getPriorityDisplay(goal.priority || 'low')}
        </PriorityBadge>

        <CategoryTag color={category.color}>
          <span>{category.icon}</span> {category.name}
        </CategoryTag>
      </GoalMeta>

      <GoalProgress>
        <ProgressBar>
          <ProgressFill progress={progress} />
        </ProgressBar>
        <ProgressText>{getProgressText()}</ProgressText>
      </GoalProgress>

      <GoalActions>
        <ActionButton
          variant="mark-done"
          onClick={() => onMarkDone(goal.id ?? 0, goal.completed ?? false)}
          completed={goal.completed}
        >
          {goal.completed ? '↻ Undo' : '✓ Mark Done'}
        </ActionButton>
        
        <ActionButton
          variant="edit"
          onClick={() => onEdit(goal.id ?? 0)}
        >
          ✏️ Edit
        </ActionButton>
        
        {onDelete && (
          <DeleteButton onClick={() => onDelete(goal.id ?? 0)}>
            🗑️ Delete
          </DeleteButton>
        )}
      </GoalActions>

      {/* Subtasks Display (if you want to show them) */}
      {goal.subtasks && goal.subtasks.length > 0 && (
        <div style={{ marginTop: '15px', fontSize: '0.9rem', color: '#a0aec0' }}>
          <div style={{ fontWeight: '500', marginBottom: '8px' }}>Subtasks:</div>
          {goal.subtasks.slice(0, 3).map((subtask, index) => (
            <div key={subtask.id} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              marginBottom: '4px',
              textDecoration: subtask.completed ? 'line-through' : 'none',
              opacity: subtask.completed ? 0.7 : 1
            }}>
              <span>{subtask.completed ? '✅' : '⭕'}</span>
              <span>{subtask.title}</span>
            </div>
          ))}
          {goal.subtasks.length > 3 && (
            <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
              +{goal.subtasks.length - 3} more subtasks...
            </div>
          )}
        </div>
      )}

      {/* Tags Display (if available) */}
      {goal.tags && goal.tags.length > 0 && (
        <div style={{ 
          marginTop: '15px', 
          display: 'flex', 
          gap: '8px', 
          flexWrap: 'wrap' 
        }}>
          {goal.tags.map((tag, index) => (
            <span key={index} style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '0.75rem',
              color: '#cbd5e0'
            }}>
              #{tag}
            </span>
          ))}
        </div>
      )}
    </StyledGoalCard>
  );
};