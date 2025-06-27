import { useState, useEffect } from 'react'

export const useUserProgress = () => {
  const [progress, setProgress] = useState({
    totalPoints: 0,
    mathLevel: 1,
    readingLevel: 1,
    completedLessons: [],
    badges: [],
    currentStreak: 0
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
  
  const updateProgress = ({ subject, difficulty, points, completed }) => {
    setProgress(prev => {
      const newProgress = { ...prev }
      
      // Add points
      newProgress.totalPoints += points
      
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
      currentStreak: 0
    })
  }
  
  return {
    progress,
    updateProgress,
    resetProgress
  }
}