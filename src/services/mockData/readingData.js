export const readingLevels = [
  {
    id: 1,
    name: "Story Explorer",
    description: "Begin your reading adventure with simple stories",
    icon: "Book",
    unlocked: true,
    completed: false,
    pointsRequired: 0
  },
  {
    id: 2,
    name: "Tale Master",
    description: "Discover longer stories with deeper meanings",
    icon: "BookOpen",
    unlocked: true,
    completed: false,
    pointsRequired: 600
  },
  {
    id: 3,
    name: "Reading Hero",
    description: "Conquer complex stories and advanced comprehension",
    icon: "Crown",
    unlocked: false,
    completed: false,
    pointsRequired: 1800
  }
]

export const readingProblems = [
  // Level 1 - Simple Stories
  {
    id: "reading-1-1",
    type: "comprehension",
    difficulty: 1,
    question: "What is the main character's name?",
    story: "Luna was a curious cat who loved to explore the garden. Every morning, she would wake up early and sneak outside to chase butterflies and smell the flowers. Her favorite spot was under the big oak tree where she could watch the birds.",
    options: ["Luna", "Oak", "Garden", "Bird"],
    correctAnswer: "Luna",
    points: 15
  },
  {
    id: "reading-1-2",
    type: "comprehension",
    difficulty: 1,
    question: "Where does Luna like to spend time?",
    story: "Luna was a curious cat who loved to explore the garden. Every morning, she would wake up early and sneak outside to chase butterflies and smell the flowers. Her favorite spot was under the big oak tree where she could watch the birds.",
    options: ["In the house", "Under the oak tree", "In the garage", "On the roof"],
    correctAnswer: "Under the oak tree",
    points: 15
  },
  {
    id: "reading-1-3",
    type: "vocabulary",
    difficulty: 1,
    question: "What does 'curious' mean in the story?",
    story: "Max found a mysterious box in his attic. He was curious about what was inside, so he carefully opened it. Inside, he discovered old photographs and letters from his grandmother.",
    options: ["Scared", "Wanting to know more", "Tired", "Happy"],
    correctAnswer: "Wanting to know more",
    points: 20
  },
  {
    id: "reading-1-4",
    type: "sequence",
    difficulty: 1,
    question: "What did Max do first?",
    story: "Max found a mysterious box in his attic. He was curious about what was inside, so he carefully opened it. Inside, he discovered old photographs and letters from his grandmother.",
    options: ["Opened the box", "Found the box", "Read the letters", "Looked at photos"],
    correctAnswer: "Found the box",
    points: 15
  },
  
  // Level 2 - Longer Stories
  {
    id: "reading-2-1",
    type: "theme",
    difficulty: 2,
    question: "What is the main lesson of this story?",
    story: "Emma had always been afraid of speaking in front of her class. When her teacher announced the talent show, Emma wanted to sing but was too scared. Her best friend Jake encouraged her every day. 'You have a beautiful voice,' he said. Finally, Emma decided to be brave. On the day of the show, she sang her favorite song. Everyone clapped loudly, and Emma felt proud of herself for overcoming her fear.",
    options: ["Friends are important", "Being brave helps you grow", "Singing is fun", "School shows are exciting"],
    correctAnswer: "Being brave helps you grow",
    points: 25
  },
  {
    id: "reading-2-2",
    type: "character",
    difficulty: 2,
    question: "How did Jake help Emma?",
    story: "Emma had always been afraid of speaking in front of her class. When her teacher announced the talent show, Emma wanted to sing but was too scared. Her best friend Jake encouraged her every day. 'You have a beautiful voice,' he said. Finally, Emma decided to be brave. On the day of the show, she sang her favorite song. Everyone clapped loudly, and Emma felt proud of herself for overcoming her fear.",
    options: ["He sang with her", "He encouraged her daily", "He chose her song", "He taught her to sing"],
    correctAnswer: "He encouraged her daily",
    points: 25
  },
  {
    id: "reading-2-3",
    type: "inference",
    difficulty: 2,
    question: "Why do you think the other students clapped?",
    story: "Emma had always been afraid of speaking in front of her class. When her teacher announced the talent show, Emma wanted to sing but was too scared. Her best friend Jake encouraged her every day. 'You have a beautiful voice,' he said. Finally, Emma decided to be brave. On the day of the show, she sang her favorite song. Everyone clapped loudly, and Emma felt proud of herself for overcoming her fear.",
    options: ["They were being polite", "They enjoyed her performance", "The teacher told them to", "They felt sorry for her"],
    correctAnswer: "They enjoyed her performance",
    points: 30
  },
  
  // Level 3 - Complex Stories
  {
    id: "reading-3-1",
    type: "analysis",
    difficulty: 3,
    question: "What does the lighthouse symbolize in the story?",
    story: "Captain Morgan had been sailing for thirty years, but he had never encountered a storm like this one. The waves crashed over his ship as rain pounded the deck. Through the darkness, he spotted a lighthouse in the distance, its beam cutting through the storm like a sword of light. 'That's our hope,' he told his crew. As they sailed toward the beacon, Morgan remembered his grandfather's words: 'In the darkest times, look for the light that guides you home.' The lighthouse keeper had stayed at his post all night, ensuring the light never failed. When Morgan's ship finally reached the harbor safely, he knew that sometimes the smallest acts of dedication can save lives.",
    options: ["A building by the sea", "Hope and guidance", "A place to live", "A warning sign"],
    correctAnswer: "Hope and guidance",
    points: 40
  },
  {
    id: "reading-3-2",
    type: "theme",
    difficulty: 3,
    question: "What is the deeper meaning of the grandfather's advice?",
    story: "Captain Morgan had been sailing for thirty years, but he had never encountered a storm like this one. The waves crashed over his ship as rain pounded the deck. Through the darkness, he spotted a lighthouse in the distance, its beam cutting through the storm like a sword of light. 'That's our hope,' he told his crew. As they sailed toward the beacon, Morgan remembered his grandfather's words: 'In the darkest times, look for the light that guides you home.' The lighthouse keeper had stayed at his post all night, ensuring the light never failed. When Morgan's ship finally reached the harbor safely, he knew that sometimes the smallest acts of dedication can save lives.",
    options: ["Always carry a flashlight", "Lighthouses are important", "Look for hope during difficult times", "Grandfathers give good advice"],
    correctAnswer: "Look for hope during difficult times",
    points: 45
  },
  {
    id: "reading-3-3",
    type: "character",
    difficulty: 3,
    question: "What character trait does the lighthouse keeper demonstrate?",
    story: "Captain Morgan had been sailing for thirty years, but he had never encountered a storm like this one. The waves crashed over his ship as rain pounded the deck. Through the darkness, he spotted a lighthouse in the distance, its beam cutting through the storm like a sword of light. 'That's our hope,' he told his crew. As they sailed toward the beacon, Morgan remembered his grandfather's words: 'In the darkest times, look for the light that guides you home.' The lighthouse keeper had stayed at his post all night, ensuring the light never failed. When Morgan's ship finally reached the harbor safely, he knew that sometimes the smallest acts of dedication can save lives.",
    options: ["Curiosity", "Dedication", "Intelligence", "Humor"],
    correctAnswer: "Dedication",
    points: 40
  }
]