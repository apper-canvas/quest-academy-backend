import React from "react";
import { mathLevels, mathProblems } from "@/services/mockData/mathData";
import Error from "@/components/ui/Error";

export const getMathLevels = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return [...mathLevels];
}

export const getMathProblems = async (difficulty, isChallenge = false, challengeType = null) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400))
  
  const problems = mathProblems.filter(p => p.difficulty === parseInt(difficulty))
  
  // Shuffle problems
  const shuffled = [...problems].sort(() => Math.random() - 0.5)
  
  // Return different amounts based on challenge type
  if (isChallenge) {
    switch (challengeType) {
      case 'speed-challenge':
        return shuffled.slice(0, 20) // More problems for speed
      case 'accuracy-challenge':
        return shuffled.slice(0, 20)
      case 'endurance-challenge':
        return shuffled.slice(0, 40) // Most problems for endurance
      default:
        return shuffled.slice(0, 15)
    }
  }
  
  return shuffled.slice(0, 5) // Return 5 problems per regular session
}

export const getChallenges = async (difficulty) => {
  const { getChallengeTypes } = await import('./leaderboardService')
  return getChallengeTypes('math')
}
export const submitMathAnswer = async (problemId, answer, timingData = null) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200))
  
  const problem = mathProblems.find(p => p.id === problemId)
  if (!problem) throw new Error('Problem not found')
  
  const isCorrect = answer === problem.correctAnswer
  let points = isCorrect ? problem.points : 0
  
  // Apply timing bonuses for challenges
  if (timingData && timingData.isChallenge) {
    if (isCorrect && timingData.responseTime < 10) { // Under 10 seconds
      points = Math.floor(points * 1.5) // 50% bonus for speed
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
    subject: 'math'
  })
}

// Mini-Game Integration
export const getMathGames = async (difficulty) => {
  const { getMathGames: getGames } = await import('./gameService')
  return getGames(difficulty)
}

export const startMathGame = async (gameId) => {
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