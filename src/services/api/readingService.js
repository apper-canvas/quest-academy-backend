import { readingLevels, readingProblems } from '@/services/mockData/readingData'

export const getReadingLevels = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  return [...readingLevels]
}

export const getReadingProblems = async (difficulty) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400))
  
  const problems = readingProblems.filter(p => p.difficulty === parseInt(difficulty))
  
  // Shuffle and return a subset of problems
  const shuffled = [...problems].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 3) // Return 3 problems per session (reading takes longer)
}

export const submitReadingAnswer = async (problemId, answer) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200))
  
  const problem = readingProblems.find(p => p.id === problemId)
  if (!problem) throw new Error('Problem not found')
  
  const isCorrect = answer === problem.correctAnswer
  return {
    correct: isCorrect,
    points: isCorrect ? problem.points : 0,
    correctAnswer: problem.correctAnswer
  }
}