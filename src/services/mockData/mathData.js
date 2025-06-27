export const mathLevels = [
  {
    id: 1,
    name: "Beginner Adventurer",
    description: "Start your math journey with simple addition and subtraction",
    icon: "Plus",
    unlocked: true,
    completed: false,
    pointsRequired: 0
  },
  {
    id: 2,
    name: "Number Explorer",
    description: "Discover multiplication and division adventures",
    icon: "X",
    unlocked: true,
    completed: false,
    pointsRequired: 500
  },
  {
    id: 3,
    name: "Math Wizard",
    description: "Master advanced calculations and word problems",
    icon: "Sparkles",
    unlocked: false,
    completed: false,
    pointsRequired: 1500
  }
]

export const mathProblems = [
  // Level 1 - Addition & Subtraction
  {
    id: "math-1-1",
    type: "addition",
    difficulty: 1,
    question: "What is 7 + 5?",
    options: ["11", "12", "13", "14"],
    correctAnswer: "12",
    points: 10
  },
  {
    id: "math-1-2",
    type: "subtraction",
    difficulty: 1,
    question: "What is 15 - 8?",
    options: ["6", "7", "8", "9"],
    correctAnswer: "7",
    points: 10
  },
  {
    id: "math-1-3",
    type: "addition",
    difficulty: 1,
    question: "What is 9 + 6?",
    options: ["14", "15", "16", "17"],
    correctAnswer: "15",
    points: 10
  },
  {
    id: "math-1-4",
    type: "subtraction",
    difficulty: 1,
    question: "What is 20 - 12?",
    options: ["7", "8", "9", "10"],
    correctAnswer: "8",
    points: 10
  },
  {
    id: "math-1-5",
    type: "addition",
    difficulty: 1,
    question: "What is 4 + 9?",
    options: ["12", "13", "14", "15"],
    correctAnswer: "13",
    points: 10
  },
  {
    id: "math-1-6",
    type: "word-problem",
    difficulty: 1,
    question: "Sarah has 8 apples. She gives 3 to her friend. How many apples does she have left?",
    options: ["4", "5", "6", "7"],
    correctAnswer: "5",
    points: 15
  },
  
  // Level 2 - Multiplication & Division
  {
    id: "math-2-1",
    type: "multiplication",
    difficulty: 2,
    question: "What is 6 × 7?",
    options: ["40", "42", "44", "48"],
    correctAnswer: "42",
    points: 20
  },
  {
    id: "math-2-2",
    type: "division",
    difficulty: 2,
    question: "What is 48 ÷ 6?",
    options: ["6", "7", "8", "9"],
    correctAnswer: "8",
    points: 20
  },
  {
    id: "math-2-3",
    type: "multiplication",
    difficulty: 2,
    question: "What is 9 × 4?",
    options: ["32", "34", "36", "38"],
    correctAnswer: "36",
    points: 20
  },
  {
    id: "math-2-4",
    type: "division",
    difficulty: 2,
    question: "What is 63 ÷ 9?",
    options: ["6", "7", "8", "9"],
    correctAnswer: "7",
    points: 20
  },
  {
    id: "math-2-5",
    type: "word-problem",
    difficulty: 2,
    question: "There are 5 bags with 8 cookies each. How many cookies are there in total?",
    options: ["35", "40", "45", "50"],
    correctAnswer: "40",
    points: 25
  },
  {
    id: "math-2-6",
    type: "word-problem",
    difficulty: 2,
    question: "24 students need to be divided into groups of 4. How many groups will there be?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "6",
    points: 25
  },
  
  // Level 3 - Advanced Problems
  {
    id: "math-3-1",
    type: "mixed",
    difficulty: 3,
    question: "What is (12 + 8) ÷ 4?",
    options: ["4", "5", "6", "7"],
    correctAnswer: "5",
    points: 30
  },
  {
    id: "math-3-2",
    type: "fractions",
    difficulty: 3,
    question: "What is 1/2 + 1/4?",
    options: ["2/6", "2/4", "3/4", "1/4"],
    correctAnswer: "3/4",
    points: 35
  },
  {
    id: "math-3-3",
    type: "decimals",
    difficulty: 3,
    question: "What is 2.5 + 1.75?",
    options: ["4.25", "4.5", "3.25", "3.75"],
    correctAnswer: "4.25",
    points: 35
  },
  {
    id: "math-3-4",
    type: "word-problem",
    difficulty: 3,
    question: "A pizza is cut into 8 equal slices. If Tom eats 3 slices and Sarah eats 2 slices, what fraction of the pizza is left?",
    options: ["3/8", "5/8", "2/8", "4/8"],
    correctAnswer: "3/8",
    points: 40
  },
  {
    id: "math-3-5",
    type: "percentage",
    difficulty: 3,
    question: "What is 25% of 80?",
    options: ["15", "20", "25", "30"],
    correctAnswer: "20",
    points: 40
  }
]