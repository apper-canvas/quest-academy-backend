import { useState, useEffect } from 'react'

export const useUserProgress = () => {
const [progress, setProgress] = useState({
    totalPoints: 0,
    mathLevel: 1,
    readingLevel: 1,
    completedLessons: [],
    badges: [],
    currentStreak: 0,
    // Game-specific progress
    gamesPlayed: 0,
    gamePoints: 0,
    gameAchievements: [],
    bestGameScores: {}, // gameType: bestScore
    totalGameTime: 0,
    // Challenge-specific progress
    challengesCompleted: 0,
    challengePoints: 0,
    bestChallengeScores: {}, // challengeType: { score, accuracy, time }
    leaderboardRankings: {}, // subject-challengeType: bestRank
    totalChallengeTime: 0,
    challengeStreak: 0
  })
  
  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('questAcademyProgress')
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress)
        setProgress(parsed)
      } catch (error) {
        console.error('Failed to parse saved progress:', error)
      }
    }
  }, [])
  
  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('questAcademyProgress', JSON.stringify(progress))
  }, [progress])
  
const updateProgress = ({ 
    subject, 
    difficulty, 
    points, 
    completed, 
    isGame = false, 
    gameType = null, 
    correctAnswers = 0, 
    targetScore = 0,
    isChallenge = false,
    challengeType = null,
    totalQuestions = 0,
    timeUsed = 0,
    avgResponseTime = 0
  }) => {
setProgress(prev => {
      const newProgress = { ...prev }
      
      // Add points
      newProgress.totalPoints += points
      
      // Challenge-specific updates
      if (isChallenge) {
        newProgress.challengesCompleted += 1
        newProgress.challengePoints += points
        newProgress.totalChallengeTime += timeUsed
        
        // Update best challenge scores
        if (challengeType) {
          const currentBest = newProgress.bestChallengeScores[challengeType] || { score: 0, accuracy: 0, time: Infinity }
          const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0
          
          if (points > currentBest.score || 
              (points === currentBest.score && accuracy > currentBest.accuracy) ||
              (points === currentBest.score && accuracy === currentBest.accuracy && timeUsed < currentBest.time)) {
            newProgress.bestChallengeScores[challengeType] = {
              score: points,
              accuracy,
              time: timeUsed,
              correctAnswers,
              totalQuestions
            }
          }
        }
        
        // Update challenge streak
        if (completed) {
          newProgress.challengeStreak += 1
        } else {
          newProgress.challengeStreak = 0
        }
        
      } else if (isGame) {
        // Game-specific updates
        newProgress.gamesPlayed += 1
        newProgress.gamePoints += points
        
        // Update best score for this game type
        if (gameType) {
          const currentBest = newProgress.bestGameScores[gameType] || 0
          if (correctAnswers > currentBest) {
            newProgress.bestGameScores[gameType] = correctAnswers
          }
        }
        
        // Game achievements
        const gameAchievementId = `${gameType}-${Date.now()}`
        if (completed) {
          newProgress.gameAchievements.push({
            id: gameAchievementId,
            gameType,
            score: correctAnswers,
            targetScore,
            date: new Date().toISOString()
          })
        }
      } else {
        // Regular lesson updates
        // Update subject level
        if (subject === 'math') {
          newProgress.mathLevel = Math.max(newProgress.mathLevel, parseInt(difficulty))
        } else if (subject === 'reading') {
          newProgress.readingLevel = Math.max(newProgress.readingLevel, parseInt(difficulty))
        }
        
        // Add completed lesson
        const lessonId = `${subject}-${difficulty}-${Date.now()}`
        if (completed) {
          newProgress.completedLessons.push(lessonId)
        }
      }
      // Award badges based on milestones
      const newBadges = []
      
      // Points milestones
      if (newProgress.totalPoints >= 1000 && !prev.badges.includes('Point Collector')) {
        newBadges.push('Point Collector')
      }
      if (newProgress.totalPoints >= 5000 && !prev.badges.includes('Point Master')) {
        newBadges.push('Point Master')
      }
      
      // Lesson milestones
      if (newProgress.completedLessons.length >= 5 && !prev.badges.includes('Dedicated Learner')) {
        newBadges.push('Dedicated Learner')
      }
      if (newProgress.completedLessons.length >= 20 && !prev.badges.includes('Study Champion')) {
        newBadges.push('Study Champion')
      }
      
      // Subject specific badges
      if (subject === 'math' && newProgress.mathLevel >= 3 && !prev.badges.includes('Math Wizard')) {
        newBadges.push('Math Wizard')
      }
      if (subject === 'reading' && newProgress.readingLevel >= 3 && !prev.badges.includes('Reading Hero')) {
        newBadges.push('Reading Hero')
      }
      
// Challenge-specific badges
      if (isChallenge && challengeType) {
        // Speed challenge badges
        if (challengeType.includes('speed') && correctAnswers >= 15 && !prev.badges.includes('Speed Master')) {
          newBadges.push('Speed Master')
        }
        if (challengeType.includes('accuracy') && correctAnswers >= 18 && !prev.badges.includes('Accuracy Expert')) {
          newBadges.push('Accuracy Expert')
        }
        if (challengeType.includes('endurance') && correctAnswers >= 30 && !prev.badges.includes('Endurance Champion')) {
          newBadges.push('Endurance Champion')
        }
        
        // Challenge milestone badges
        if (newProgress.challengesCompleted >= 5 && !prev.badges.includes('Challenge Seeker')) {
          newBadges.push('Challenge Seeker')
        }
        if (newProgress.challengesCompleted >= 25 && !prev.badges.includes('Challenge Master')) {
          newBadges.push('Challenge Master')
        }
        if (newProgress.challengeStreak >= 5 && !prev.badges.includes('Streak Warrior')) {
          newBadges.push('Streak Warrior')
        }
        if (newProgress.challengePoints >= 3000 && !prev.badges.includes('Leaderboard Legend')) {
          newBadges.push('Leaderboard Legend')
        }
      }
      
      // Game-specific badges
      if (isGame && gameType) {
        // Speed badges
        if (gameType === 'speed-math' && correctAnswers >= 15 && !prev.badges.includes('Speed Demon')) {
          newBadges.push('Speed Demon')
        }
        if (gameType === 'word-scramble' && correctAnswers >= 10 && !prev.badges.includes('Word Master')) {
          newBadges.push('Word Master')
        }
        if (gameType === 'number-sequence' && correctAnswers >= 8 && !prev.badges.includes('Pattern Expert')) {
          newBadges.push('Pattern Expert')
        }
        
        // Game milestone badges
        if (newProgress.gamesPlayed >= 10 && !prev.badges.includes('Game Explorer')) {
          newBadges.push('Game Explorer')
        }
        if (newProgress.gamesPlayed >= 50 && !prev.badges.includes('Game Master')) {
          newBadges.push('Game Master')
        }
        if (newProgress.gamePoints >= 2000 && !prev.badges.includes('Mini-Game Champion')) {
          newBadges.push('Mini-Game Champion')
        }
      }
      
      newProgress.badges = [...prev.badges, ...newBadges]
      
      // Update streak (simplified - just increment for now)
      if (completed) {
        newProgress.currentStreak = Math.max(prev.currentStreak + 1, 1)
      }
      return newProgress
    })
  }
  
const resetProgress = () => {
    setProgress({
      totalPoints: 0,
      mathLevel: 1,
      readingLevel: 1,
      completedLessons: [],
      badges: [],
      currentStreak: 0,
      // Reset game progress
      gamesPlayed: 0,
      gamePoints: 0,
      gameAchievements: [],
      bestGameScores: {},
      totalGameTime: 0,
      // Reset challenge progress
      challengesCompleted: 0,
      challengePoints: 0,
      bestChallengeScores: {},
      leaderboardRankings: {},
      totalChallengeTime: 0,
      challengeStreak: 0
    })
  }
  
  return {
    progress,
    updateProgress,
    resetProgress
  }
}