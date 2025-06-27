import { readingLevels, readingProblems } from "@/services/mockData/readingData";

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

export const submitChallenge = async (challengeData) => {
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