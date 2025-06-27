import gameData, { mathGames, readingGames, gameQuestions } from '@/services/mockData/gameData'

export const getMathGames = async (difficulty) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const games = mathGames.filter(game => 
    !difficulty || game.difficulty === parseInt(difficulty)
  )
  
  return [...games]
}

export const getReadingGames = async (difficulty) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const games = readingGames.filter(game => 
    !difficulty || game.difficulty === parseInt(difficulty)
  )
  
  return [...games]
}

export const getGameById = async (gameId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200))
  
  const allGames = [...mathGames, ...readingGames]
  const game = allGames.find(g => g.Id === parseInt(gameId))
  
  if (!game) throw new Error('Game not found')
  
  return { ...game }
}

export const getGameQuestions = async (gameType, difficulty) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400))
  
  const questions = gameQuestions[gameType]?.[difficulty] || []
  
  // Shuffle and return questions
  const shuffled = [...questions].sort(() => Math.random() - 0.5)
  return shuffled
}

export const submitGameAnswer = async (questionId, answer, gameType) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200))
  
  // Find the correct answer across all question types
  let correctAnswer = null
  let questionData = null
  
  for (const [type, difficulties] of Object.entries(gameQuestions)) {
    if (type === gameType) {
      for (const [diff, questions] of Object.entries(difficulties)) {
        const question = questions.find(q => q.Id === parseInt(questionId))
        if (question) {
          questionData = question
          correctAnswer = question.answer
          break
        }
      }
    }
  }
  
  if (!correctAnswer) throw new Error('Question not found')
  
  const isCorrect = answer.toString().toLowerCase() === correctAnswer.toString().toLowerCase()
  
  return {
    correct: isCorrect,
    correctAnswer: correctAnswer,
    points: isCorrect ? 10 : 0 // Base points for mini-games
  }
}

export const getGameLeaderboard = async (gameType) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  
  // Mock leaderboard data
  return [
    { Id: 1, playerName: 'Math Wizard', score: 2850, gameType },
    { Id: 2, playerName: 'Speed Demon', score: 2640, gameType },
    { Id: 3, playerName: 'Pattern Master', score: 2420, gameType },
    { Id: 4, playerName: 'Number Ninja', score: 2180, gameType },
    { Id: 5, playerName: 'Quiz Champion', score: 1950, gameType }
  ]
}