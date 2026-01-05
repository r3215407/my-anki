
import { Question, Status, Category, UserStats } from '../types';

const DB_KEY = 'xiaozhi_notebook_db';
const STATS_KEY = 'xiaozhi_notebook_stats';

const DEFAULT_QUESTIONS: Question[] = [
  {
    id: '1',
    title: 'Butterfly',
    meaning: '蝴蝶',
    category: Category.ENGLISH,
    sentence: 'Look at the pretty butterfly.',
    status: Status.REVIEW,
    level: 30,
    createdAt: Date.now()
  },
  {
    id: '2',
    title: 'Apple',
    meaning: '苹果',
    category: Category.ENGLISH,
    sentence: 'The apple is sweet and red.',
    status: Status.MASTERED,
    level: 95,
    createdAt: Date.now()
  }
];

const DEFAULT_STATS: UserStats = {
  streak: 12,
  totalMastered: 100,
  totalNew: 15,
  totalReview: 5,
  energyPoints: 120
};

export const getQuestions = (): Question[] => {
  const data = localStorage.getItem(DB_KEY);
  return data ? JSON.parse(data) : DEFAULT_QUESTIONS;
};

export const saveQuestions = (questions: Question[]) => {
  localStorage.setItem(DB_KEY, JSON.stringify(questions));
};

export const getUserStats = (): UserStats => {
  const data = localStorage.getItem(STATS_KEY);
  return data ? JSON.parse(data) : DEFAULT_STATS;
};

export const saveUserStats = (stats: UserStats) => {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
};
