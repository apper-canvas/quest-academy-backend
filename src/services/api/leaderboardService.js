import mockLeaderboardData, { challengeTypes } from "@/services/mockData/leaderboardData";

let leaderboardData = [...mockLeaderboardData];
let nextId = Math.max(...leaderboardData.map(entry => entry.Id)) + 1;

export const getLeaderboard = async (filters = {}) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let filteredData = [...leaderboardData];
  
  // Filter by subject
  if (filters.subject) {
    filteredData = filteredData.filter(entry => entry.subject === filters.subject);
  }
  
  // Filter by challenge type
  if (filters.challengeType) {
    filteredData = filteredData.filter(entry => entry.challengeType === filters.challengeType);
  }
  
  // Filter by skill level
  if (filters.skillLevel) {
    filteredData = filteredData.filter(entry => entry.skillLevel === parseInt(filters.skillLevel));
  }
  
  // Filter by time period
  if (filters.period) {
    const now = new Date();
    const cutoffDate = new Date();
    
    switch (filters.period) {
      case 'today':
        cutoffDate.setHours(0, 0, 0, 0);
        break;
      case 'week':
        cutoffDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        cutoffDate.setMonth(now.getMonth() - 1);
        break;
      default:
        cutoffDate.setFullYear(2000); // All time
    }
    
    filteredData = filteredData.filter(entry => new Date(entry.date) >= cutoffDate);
  }
  
  // Sort by score (descending) and recalculate ranks
  filteredData.sort((a, b) => b.score - a.score);
  filteredData.forEach((entry, index) => {
    entry.rank = index + 1;
  });
  
  return filteredData.slice(0, filters.limit || 50);
};

export const getPlayerRanking = async (userId, filters = {}) => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const leaderboard = await getLeaderboard(filters);
  const playerEntry = leaderboard.find(entry => entry.userId === userId);
  
  if (!playerEntry) {
    return null;
  }
  
  return {
    ...playerEntry,
    totalPlayers: leaderboard.length
  };
};

export const submitChallengeResult = async (challengeResult) => {
  await new Promise(resolve => setTimeout(resolve, 250));
  
  const newEntry = {
    Id: nextId++,
    userId: challengeResult.userId || 'current_user',
    userName: challengeResult.userName || 'Player',
    subject: challengeResult.subject,
    challengeType: challengeResult.challengeType,
    skillLevel: challengeResult.skillLevel,
    score: challengeResult.score,
    correctAnswers: challengeResult.correctAnswers,
    totalQuestions: challengeResult.totalQuestions,
    timeUsed: challengeResult.timeUsed,
    accuracy: Math.round((challengeResult.correctAnswers / challengeResult.totalQuestions) * 100),
    rank: 0, // Will be calculated when fetching leaderboard
    date: new Date().toISOString()
  };
  
  leaderboardData.push(newEntry);
  
  // Calculate new ranking
  const updatedLeaderboard = await getLeaderboard({
    subject: challengeResult.subject,
    challengeType: challengeResult.challengeType,
    skillLevel: challengeResult.skillLevel
  });
  
  const playerRank = updatedLeaderboard.find(entry => entry.Id === newEntry.Id)?.rank || 0;
  
  return {
    ...newEntry,
    rank: playerRank,
    totalPlayers: updatedLeaderboard.length
  };
};

export const getChallengeTypes = async (subject = null) => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  let types = [...challengeTypes];
  
  if (subject) {
    types = types.filter(type => type.subjects.includes(subject));
  }
  
  return types;
};

export const getChallengeById = async (challengeId) => {
  await new Promise(resolve => setTimeout(resolve, 150));
  
  const challenge = challengeTypes.find(type => type.Id === parseInt(challengeId));
  if (!challenge) {
    throw new Error('Challenge not found');
  }
  
  return { ...challenge };
};

export const getPlayerStats = async (userId, subject = null) => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  let playerEntries = leaderboardData.filter(entry => entry.userId === userId);
  
  if (subject) {
    playerEntries = playerEntries.filter(entry => entry.subject === subject);
  }
  
  if (playerEntries.length === 0) {
    return {
      totalChallenges: 0,
      bestScore: 0,
      averageAccuracy: 0,
      totalPoints: 0,
      favoriteChallenge: null
    };
  }
  
  const stats = {
    totalChallenges: playerEntries.length,
    bestScore: Math.max(...playerEntries.map(entry => entry.score)),
    averageAccuracy: Math.round(
      playerEntries.reduce((sum, entry) => sum + entry.accuracy, 0) / playerEntries.length
    ),
    totalPoints: playerEntries.reduce((sum, entry) => sum + entry.score, 0),
    favoriteChallenge: playerEntries.reduce((acc, entry) => {
      acc[entry.challengeType] = (acc[entry.challengeType] || 0) + 1;
      return acc;
    }, {})
  };
  
  // Find most played challenge type
  stats.favoriteChallenge = Object.keys(stats.favoriteChallenge).reduce((a, b) => 
    stats.favoriteChallenge[a] > stats.favoriteChallenge[b] ? a : b
  );
  
  return stats;
};