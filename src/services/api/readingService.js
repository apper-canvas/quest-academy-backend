import { readingLevels, readingProblems } from "@/services/mockData/readingData";
import { getGameById, getGameQuestions, getReadingGames, submitGameAnswer } from "@/services/api/gameService";
import { getChallengeTypes, submitChallengeResult } from "@/services/api/leaderboardService";
export const getReadingLevels = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  return [...readingLevels]
}

export const getReadingProblems = async (difficulty, isChallenge = false, challengeType = null) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400))
  
  const problems = readingProblems.filter(p => p.difficulty === parseInt(difficulty))
  
  // Shuffle problems
  const shuffled = [...problems].sort(() => Math.random() - 0.5)
  
  // Return different amounts based on challenge type
  if (isChallenge) {
    switch (challengeType) {
      case 'speed-challenge':
        return shuffled.slice(0, 15)
      case 'accuracy-challenge':
        return shuffled.slice(0, 15)
      case 'comprehension-challenge':
        return shuffled.slice(0, 15)
      case 'endurance-challenge':
        return shuffled.slice(0, 25)
      default:
        return shuffled.slice(0, 10)
    }
  }
  
  return shuffled.slice(0, 3) // Return 3 problems per regular session (reading takes longer)
}

export const getChallenges = async (difficulty) => {
  const { getChallengeTypes } = await import('./leaderboardService')
  return getChallengeTypes('reading')
}

export const submitReadingAnswer = async (problemId, answer, timingData = null) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200))
  
  const problem = readingProblems.find(p => p.id === problemId)
  if (!problem) throw new Error('Problem not found')
  
  const isCorrect = answer === problem.correctAnswer
  let points = isCorrect ? problem.points : 0
  
  // Apply timing bonuses for challenges
  if (timingData && timingData.isChallenge) {
    if (isCorrect && timingData.responseTime < 15) { // Under 15 seconds for reading
      points = Math.floor(points * 1.3) // 30% bonus for speed
    }
  }
  
  return {
    correct: isCorrect,
    points,
    correctAnswer: problem.correctAnswer,
    responseTime: timingData?.responseTime || 0
  }
}

export const submitReadingChallenge = async (challengeData) => {
  const { submitChallengeResult } = await import('./leaderboardService')
  return submitChallengeResult({
    ...challengeData,
    subject: 'reading'
  })
}
// Mini-Game Integration
export const getReadingGames = async (difficulty) => {
  const { getReadingGames: getGames } = await import('./gameService')
  return getGames(difficulty)
}

export const startReadingGame = async (gameId) => {
  const { getGameById, getGameQuestions } = await import('./gameService')
  const game = await getGameById(gameId)
  const questions = await getGameQuestions(game.type, game.difficulty)
  
  return {
    game: { ...game },
    questions: [...questions]
  }
}

export const submitGameAnswer = async (questionId, answer, gameType) => {
  const { submitGameAnswer: submitAnswer } = await import('./gameService')
  return submitAnswer(questionId, answer, gameType)
}

// Voice Narration Settings
export const getVoiceSettings = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  const savedSettings = localStorage.getItem('questAcademy_voiceSettings')
  const defaultSettings = {
    enabled: true,
    rate: 1.0, // 0.5 to 2.0
    pitch: 1.0, // 0 to 2
    volume: 0.8, // 0 to 1
    voice: null, // Will use system default
    autoPlay: false // Auto-play stories when loaded
  }
  
  return savedSettings ? { ...defaultSettings, ...JSON.parse(savedSettings) } : defaultSettings
}

export const updateVoiceSettings = async (settings) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  localStorage.setItem('questAcademy_voiceSettings', JSON.stringify(settings))
  return { ...settings }
}

export const getAvailableVoices = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 50))
  
  // Check if speechSynthesis is available (browser environment)
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    return []
  }
  
  return new Promise((resolve) => {
    const getVoices = () => {
      const voices = window.speechSynthesis.getVoices()
      if (voices.length > 0) {
        // Filter to get good quality voices, prefer English
        const filteredVoices = voices.filter(voice => 
          voice.lang.startsWith('en') || voice.default
        )
        resolve(filteredVoices.length > 0 ? filteredVoices : voices)
      } else {
        // Voices not loaded yet, try again
        setTimeout(getVoices, 100)
      }
    }
    
    // Load voices if not already loaded
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.addEventListener('voiceschanged', getVoices)
    }
    getVoices()
  })
}