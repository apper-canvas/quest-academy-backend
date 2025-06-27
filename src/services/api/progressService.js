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

export const getParentDashboardStats = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 450))
  
  // Generate comprehensive parent dashboard data
  const dailyProgressData = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    lessonsCompleted: Math.floor(Math.random() * 8) + 1,
    pointsEarned: Math.floor(Math.random() * 150) + 50,
    timeSpent: Math.floor(Math.random() * 45) + 15 // minutes
  }))
  
  const subjectPerformance = {
    math: {
      lessonsCompleted: 45,
      averageScore: 87,
      timeSpent: 12.5, // hours
      improvement: 15 // percentage
    },
    reading: {
      lessonsCompleted: 38,
      averageScore: 92,
      timeSpent: 10.2,
      improvement: 8
    }
  }
  
  const achievements = [
    { name: 'Math Mastery', date: '2024-01-28', category: 'Subject Excellence', icon: 'Calculator' },
    { name: 'Reading Streak', date: '2024-01-25', category: 'Consistency', icon: 'BookOpen' },
    { name: 'Perfect Week', date: '2024-01-20', category: 'Dedication', icon: 'Star' },
    { name: 'Point Collector', date: '2024-01-15', category: 'Progress', icon: 'Trophy' },
    { name: 'First Steps', date: '2024-01-10', category: 'Milestone', icon: 'Sparkles' }
  ]
  
  const weeklyComparison = Array.from({ length: 4 }, (_, i) => ({
    week: `Week ${i + 1}`,
    lessonsCompleted: Math.floor(Math.random() * 25) + 15,
    pointsEarned: Math.floor(Math.random() * 800) + 400,
    averageScore: Math.floor(Math.random() * 20) + 75
  }))
  
  return {
    overview: {
      totalLessons: 83,
      totalPoints: 3420,
      currentStreak: 7,
      weeklyGoalProgress: 85 // percentage
    },
    dailyProgress: dailyProgressData,
    subjectPerformance,
    achievements,
    weeklyComparison,
    insights: [
      { type: 'improvement', message: 'Math scores improved by 15% this month', trend: 'up' },
      { type: 'consistency', message: '7-day learning streak - excellent consistency!', trend: 'neutral' },
      { type: 'engagement', message: 'Reading engagement is exceptionally high', trend: 'up' },
      { type: 'recommendation', message: 'Consider challenging math activities', trend: 'neutral' }
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