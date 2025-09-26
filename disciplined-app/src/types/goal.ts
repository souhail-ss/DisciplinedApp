export interface Goal {
  id?: number;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  completed?: boolean;
  createdDate?: Date;
  lastResetDate?: Date;
  
  // NEW: Enhanced features
  priority: 'high' | 'medium' | 'low';
  category: GoalCategory;
  progress: number; // 0-100 percentage
  subtasks?: SubTask[];
  dueTime?: string; // "18:00" format
  estimatedDuration?: number; // minutes
  completedAt?: Date;
  streak?: number; // for daily/weekly goals
  tags?: string[];
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface GoalCategory {
  id: string;
  name: string;
  icon: string; // emoji or icon name
  color: string; // hex color
}

export interface GoalStats {
  todayProgress: number; // percentage 0-100
  currentStreak: number;
  totalCompleted: number;
  todayCompleted: number;
  todayTotal: number;
}

// Predefined categories
export const DEFAULT_CATEGORIES: GoalCategory[] = [
  { id: 'work', name: 'Work', icon: '💻', color: '#667eea' },
  { id: 'health', name: 'Health', icon: '💪', color: '#81c784' },
  { id: 'learning', name: 'Learning', icon: '🧠', color: '#ffd93d' },
  { id: 'personal', name: 'Personal', icon: '🏖️', color: '#ff8a65' },
  { id: 'finance', name: 'Finance', icon: '💰', color: '#4db6ac' },
  { id: 'family', name: 'Family', icon: '👨‍👩‍👧‍👦', color: '#f06292' },
  { id: 'hobbies', name: 'Hobbies', icon: '🎨', color: '#ba68c8' },
  { id: 'other', name: 'Other', icon: '📋', color: '#78909c' }
];

// Priority colors for UI
export const PRIORITY_COLORS = {
  high: '#ff6b6b',
  medium: '#ffd93d',
  low: '#81c784'
} as const;

export type Priority = keyof typeof PRIORITY_COLORS;