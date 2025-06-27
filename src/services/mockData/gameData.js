// Math Mini-Games Data
export const mathGames = [
  {
    Id: 1,
    type: 'speed-math',
    title: 'Speed Math Challenge',
    description: 'Solve as many problems as you can in 60 seconds!',
    icon: 'Zap',
    difficulty: 1,
    timeLimit: 60,
    targetScore: 10,
    pointsPerCorrect: 5
  },
  {
    Id: 2,
    type: 'speed-math',
    title: 'Advanced Speed Math',
    description: 'Fast multiplication and division challenges!',
    icon: 'Zap',
    difficulty: 2,
    timeLimit: 60,
    targetScore: 15,
    pointsPerCorrect: 8
  },
  {
    Id: 3,
    type: 'number-sequence',
    title: 'Number Patterns',
    description: 'Find the missing numbers in the sequence',
    icon: 'TrendingUp',
    difficulty: 1,
    timeLimit: 90,
    targetScore: 8,
    pointsPerCorrect: 10
  },
  {
    Id: 4,
    type: 'number-sequence',
    title: 'Complex Patterns',
    description: 'Advanced number sequences and patterns',
    icon: 'TrendingUp',
    difficulty: 2,
    timeLimit: 120,
    targetScore: 6,
    pointsPerCorrect: 15
  },
  {
    Id: 5,
    type: 'pattern-recognition',
    title: 'Shape Patterns',
    description: 'Identify geometric patterns and sequences',
    icon: 'Shapes',
    difficulty: 1,
    timeLimit: 75,
    targetScore: 7,
    pointsPerCorrect: 12
  },
  {
    Id: 6,
    type: 'pattern-recognition',
    title: 'Advanced Patterns',
    description: 'Complex pattern recognition challenges',
    icon: 'Shapes',
    difficulty: 3,
    timeLimit: 90,
    targetScore: 5,
    pointsPerCorrect: 20
  }
]

// Reading Mini-Games Data
export const readingGames = [
  {
    Id: 7,
    type: 'word-scramble',
    title: 'Word Scramble',
    description: 'Unscramble words to reveal the hidden message',
    icon: 'Shuffle',
    difficulty: 1,
    timeLimit: 120,
    targetScore: 8,
    pointsPerCorrect: 8
  },
  {
    Id: 8,
    type: 'word-scramble',
    title: 'Advanced Scramble',
    description: 'Challenging vocabulary and longer words',
    icon: 'Shuffle',
    difficulty: 2,
    timeLimit: 150,
    targetScore: 6,
    pointsPerCorrect: 12
  },
  {
    Id: 9,
    type: 'sentence-builder',
    title: 'Sentence Builder',
    description: 'Arrange words to create proper sentences',
    icon: 'Type',
    difficulty: 1,
    timeLimit: 180,
    targetScore: 5,
    pointsPerCorrect: 15
  },
  {
    Id: 10,
    type: 'sentence-builder',
    title: 'Grammar Master',
    description: 'Complex sentence structure challenges',
    icon: 'Type',
    difficulty: 2,
    timeLimit: 240,
    targetScore: 4,
    pointsPerCorrect: 20
  },
  {
    Id: 11,
    type: 'story-completion',
    title: 'Story Completion',
    description: 'Choose the best ending for short stories',
    icon: 'BookOpen',
    difficulty: 1,
    timeLimit: 300,
    targetScore: 3,
    pointsPerCorrect: 25
  },
  {
    Id: 12,
    type: 'vocabulary-match',
    title: 'Vocabulary Match',
    description: 'Match words with their correct definitions',
    icon: 'Link',
    difficulty: 1,
    timeLimit: 90,
    targetScore: 10,
    pointsPerCorrect: 6
  }
]

// Game Questions/Problems by Type
export const gameQuestions = {
  'speed-math': {
    1: [
      { Id: 1, question: '7 + 8', answer: '15', type: 'addition' },
      { Id: 2, question: '12 - 5', answer: '7', type: 'subtraction' },
      { Id: 3, question: '6 × 4', answer: '24', type: 'multiplication' },
      { Id: 4, question: '18 ÷ 3', answer: '6', type: 'division' },
      { Id: 5, question: '9 + 6', answer: '15', type: 'addition' },
      { Id: 6, question: '15 - 8', answer: '7', type: 'subtraction' },
      { Id: 7, question: '5 × 7', answer: '35', type: 'multiplication' },
      { Id: 8, question: '24 ÷ 4', answer: '6', type: 'division' },
      { Id: 9, question: '13 + 9', answer: '22', type: 'addition' },
      { Id: 10, question: '20 - 7', answer: '13', type: 'subtraction' }
    ],
    2: [
      { Id: 11, question: '17 × 13', answer: '221', type: 'multiplication' },
      { Id: 12, question: '144 ÷ 12', answer: '12', type: 'division' },
      { Id: 13, question: '25 × 16', answer: '400', type: 'multiplication' },
      { Id: 14, question: '169 ÷ 13', answer: '13', type: 'division' },
      { Id: 15, question: '19 × 11', answer: '209', type: 'multiplication' }
    ]
  },
  'number-sequence': {
    1: [
      { Id: 16, sequence: [2, 4, 6, 8, '?'], answer: '10', rule: 'Add 2' },
      { Id: 17, sequence: [1, 3, 5, 7, '?'], answer: '9', rule: 'Add 2' },
      { Id: 18, sequence: [5, 10, 15, 20, '?'], answer: '25', rule: 'Add 5' },
      { Id: 19, sequence: [3, 6, 9, 12, '?'], answer: '15', rule: 'Add 3' }
    ],
    2: [
      { Id: 20, sequence: [2, 6, 18, 54, '?'], answer: '162', rule: 'Multiply by 3' },
      { Id: 21, sequence: [1, 4, 9, 16, '?'], answer: '25', rule: 'Perfect squares' }
    ]
  },
  'word-scramble': {
    1: [
      { Id: 22, scrambled: 'TAC', answer: 'CAT', hint: 'Furry pet' },
      { Id: 23, scrambled: 'ERET', answer: 'TREE', hint: 'Grows in forest' },
      { Id: 24, scrambled: 'KBOO', answer: 'BOOK', hint: 'You read this' },
      { Id: 25, scrambled: 'HSUO', answer: 'HOUSE', hint: 'Where you live' }
    ],
    2: [
      { Id: 26, scrambled: 'TAINMON', answer: 'MOUNTAIN', hint: 'Very tall landform' },
      { Id: 27, scrambled: 'RTLEUBT', answer: 'BUTTERFLY', hint: 'Colorful flying insect' }
    ]
  },
  'sentence-builder': {
    1: [
      { Id: 28, words: ['The', 'cat', 'is', 'sleeping'], answer: 'The cat is sleeping' },
      { Id: 29, words: ['I', 'like', 'to', 'read', 'books'], answer: 'I like to read books' }
    ]
  }
}

export default { mathGames, readingGames, gameQuestions }