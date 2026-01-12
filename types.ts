
export enum Category {
  ENGLISH = '英语',
  CHINESE = '语文',
}

export enum Status {
  NEW = '新词',
  REVIEW = '需复习',
  MASTERED = '已掌握'
}

export interface Question {
  id: string;
  title: string;
  meaning: string;
  category: Category;
  sentence: string;
  status: Status;
  level: number; // 0-100
  createdAt: number;
  lastReviewedAt?: number;
}

export interface UserStats {
  streak: number;
  totalMastered: number;
  totalNew: number;
  totalReview: number;
  energyPoints: number;
}
