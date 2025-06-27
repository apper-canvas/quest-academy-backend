export const getProgressStats = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 350))
  
  // Generate mock weekly activity data
  const weeklyActivity = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10))
  
  return {
    weeklyActivity,
    monthlyPoints: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100)),
    subjectBreakdown: {
      math: 60,
      reading: 40
    },
    streakHistory: Array.from({ length: 14 }, () => Math.random() > 0.3),
    achievements: [
      { name: 'First Steps', date: '2024-01-15', type: 'milestone' },
      { name: 'Math Wizard', date: '2024-01-20', type: 'subject' },
      { name: 'Reading Hero', date: '2024-01-25', type: 'subject' },
      { name: 'Point Collector', date: '2024-01-30', type: 'points' }
    ]
  }
}

export const getLeaderboard = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400))
  
  return [
    { rank: 1, name: 'Quest Master', points: 15430, badge: 'Legend' },
    { rank: 2, name: 'Math Wizard', points: 12890, badge: 'Expert' },
    { rank: 3, name: 'Reading Champion', points: 11200, badge: 'Expert' },
    { rank: 4, name: 'Smart Cookie', points: 9870, badge: 'Advanced' },
    { rank: 5, name: 'Future Einstein', points: 8650, badge: 'Advanced' }
  ]
}