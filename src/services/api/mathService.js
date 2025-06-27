import React from "react";
import { mathLevels, mathProblems } from "@/services/mockData/mathData";
import Error from "@/components/ui/Error";

export const getMathLevels = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return [...mathLevels];
}

export const getMathProblems = async (difficulty) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400))
  
  const problems = mathProblems.filter(p => p.difficulty === parseInt(difficulty))
  
  // Shuffle and return a subset of problems
  const shuffled = [...problems].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 5) // Return 5 problems per session
}

export const submitMathAnswer = async (problemId, answer) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200))
  
  const problem = mathProblems.find(p => p.id === problemId)
  if (!problem) throw new Error('Problem not found')
  
const isCorrect = answer === problem.correctAnswer
  return {
    correct: isCorrect,
    points: isCorrect ? problem.points : 0,
    correctAnswer: problem.correctAnswer
  }
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