// Mock leaderboard data for timed challenges
const mockLeaderboardData = [
  // Math Challenge Leaderboards
  { 
    Id: 1, 
    userId: 'user_001', 
    userName: 'Alex', 
    subject: 'math', 
    challengeType: 'speed-challenge', 
    skillLevel: 1, 
    score: 250, 
    correctAnswers: 15, 
    totalQuestions: 20, 
    timeUsed: 180, // seconds
    accuracy: 75,
    rank: 1,
    date: '2024-01-15T10:30:00Z'
  },
  { 
    Id: 2, 
    userId: 'user_002', 
    userName: 'Emma', 
    subject: 'math', 
    challengeType: 'speed-challenge', 
    skillLevel: 1, 
    score: 225, 
    correctAnswers: 13, 
    totalQuestions: 20, 
    timeUsed: 175, 
    accuracy: 65,
    rank: 2,
    date: '2024-01-15T11:15:00Z'
  },
  { 
    Id: 3, 
    userId: 'user_003', 
    userName: 'Jordan', 
    subject: 'math', 
    challengeType: 'speed-challenge', 
    skillLevel: 1, 
    score: 200, 
    correctAnswers: 12, 
    totalQuestions: 20, 
    timeUsed: 190, 
    accuracy: 60,
    rank: 3,
    date: '2024-01-15T14:20:00Z'
  },
  { 
    Id: 4, 
    userId: 'user_004', 
    userName: 'Sam', 
    subject: 'math', 
    challengeType: 'accuracy-challenge', 
    skillLevel: 2, 
    score: 400, 
    correctAnswers: 18, 
    totalQuestions: 20, 
    timeUsed: 300, 
    accuracy: 90,
    rank: 1,
    date: '2024-01-15T16:45:00Z'
  },
  { 
    Id: 5, 
    userId: 'user_005', 
    userName: 'Riley', 
    subject: 'math', 
    challengeType: 'accuracy-challenge', 
    skillLevel: 2, 
    score: 375, 
    correctAnswers: 17, 
    totalQuestions: 20, 
    timeUsed: 285, 
    accuracy: 85,
    rank: 2,
    date: '2024-01-15T17:30:00Z'
  },
  
  // Reading Challenge Leaderboards
  { 
    Id: 6, 
    userId: 'user_006', 
    userName: 'Maya', 
    subject: 'reading', 
    challengeType: 'speed-challenge', 
    skillLevel: 1, 
    score: 300, 
    correctAnswers: 12, 
    totalQuestions: 15, 
    timeUsed: 240, 
    accuracy: 80,
    rank: 1,
    date: '2024-01-15T09:15:00Z'
  },
  { 
    Id: 7, 
    userId: 'user_007', 
    userName: 'Zoe', 
    subject: 'reading', 
    challengeType: 'speed-challenge', 
    skillLevel: 1, 
    score: 275, 
    correctAnswers: 11, 
    totalQuestions: 15, 
    timeUsed: 235, 
    accuracy: 73,
    rank: 2,
    date: '2024-01-15T12:45:00Z'
  },
  { 
    Id: 8, 
    userId: 'user_008', 
    userName: 'Blake', 
    subject: 'reading', 
    challengeType: 'comprehension-challenge', 
    skillLevel: 2, 
    score: 450, 
    correctAnswers: 14, 
    totalQuestions: 15, 
    timeUsed: 420, 
    accuracy: 93,
    rank: 1,
    date: '2024-01-15T15:20:00Z'
  },
  { 
    Id: 9, 
    userId: 'user_009', 
    userName: 'Casey', 
    subject: 'reading', 
    challengeType: 'comprehension-challenge', 
    skillLevel: 2, 
    score: 420, 
    correctAnswers: 13, 
    totalQuestions: 15, 
    timeUsed: 390, 
    accuracy: 87,
    rank: 2,
    date: '2024-01-15T18:10:00Z'
  },
  { 
    Id: 10, 
    userId: 'user_010', 
    userName: 'Taylor', 
    subject: 'math', 
    challengeType: 'endurance-challenge', 
    skillLevel: 3, 
    score: 800, 
    correctAnswers: 35, 
    totalQuestions: 40, 
    timeUsed: 600, 
    accuracy: 88,
    rank: 1,
    date: '2024-01-15T20:30:00Z'
  }
];

// Challenge type definitions
const challengeTypes = [
  {
    Id: 1,
    type: 'speed-challenge',
    name: 'Speed Challenge',
    description: 'Complete as many problems as possible in limited time',
    icon: 'Zap',
    timeLimit: 300, // 5 minutes
    maxQuestions: 20,
    subjects: ['math', 'reading']
  },
  {
    Id: 2,
    type: 'accuracy-challenge',
    name: 'Accuracy Challenge',
    description: 'Focus on getting the highest accuracy score',
    icon: 'Target',
    timeLimit: 600, // 10 minutes
    maxQuestions: 20,
    subjects: ['math', 'reading']
  },
  {
    Id: 3,
    type: 'comprehension-challenge',
    name: 'Comprehension Challenge',
    description: 'Deep reading comprehension under time pressure',
    icon: 'BookOpen',
    timeLimit: 480, // 8 minutes
    maxQuestions: 15,
    subjects: ['reading']
  },
  {
    Id: 4,
    type: 'endurance-challenge',
    name: 'Endurance Challenge',
    description: 'Extended session to test sustained performance',
    icon: 'Activity',
    timeLimit: 900, // 15 minutes
    maxQuestions: 40,
    subjects: ['math', 'reading']
  }
];

export default mockLeaderboardData;
export { challengeTypes };