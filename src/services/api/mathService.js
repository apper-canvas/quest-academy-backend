import { mathLevels, mathProblems } from '@/services/mockData/mathData'

export const getMathLevels = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  return [...mathLevels]
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