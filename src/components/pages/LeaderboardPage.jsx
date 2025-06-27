import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import { useUserProgress } from '@/hooks/useUserProgress';
import { 
  getLeaderboard, 
  getPlayerRanking, 
  getChallengeTypes,
  getPlayerStats 
} from '@/services/api/leaderboardService';

const LeaderboardPage = () => {
  const { progress } = useUserProgress();
  const [leaderboard, setLeaderboard] = useState([]);
  const [playerRanking, setPlayerRanking] = useState(null);
  const [playerStats, setPlayerStats] = useState(null);
  const [challengeTypes, setChallengeTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filters
  const [selectedSubject, setSelectedSubject] = useState('math');
  const [selectedChallenge, setSelectedChallenge] = useState('');
  const [selectedSkillLevel, setSelectedSkillLevel] = useState('1');
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  useEffect(() => {
    loadLeaderboardData();
  }, [selectedSubject, selectedChallenge, selectedSkillLevel, selectedPeriod]);

  const loadLeaderboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const filters = {
        subject: selectedSubject,
        challengeType: selectedChallenge || undefined,
        skillLevel: selectedSkillLevel,
        period: selectedPeriod,
        limit: 20
      };

      const [leaderboardData, playerRank, types, stats] = await Promise.all([
        getLeaderboard(filters),
        getPlayerRanking('current_user', filters),
        getChallengeTypes(selectedSubject),
        getPlayerStats('current_user', selectedSubject)
      ]);

      setLeaderboard(leaderboardData);
      setPlayerRanking(playerRank);
      setChallengeTypes(types);
      setPlayerStats(stats);

    } catch (err) {
      setError(err.message);
      toast.error('Failed to load leaderboard data');
    } finally {
      setLoading(false);
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return 'text-yellow-600 bg-yellow-100';
      case 2: return 'text-gray-600 bg-gray-100';
      case 3: return 'text-amber-600 bg-amber-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return 'Crown';
      case 2: return 'Medal';
      case 3: return 'Award';
      default: return 'User';
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadLeaderboardData} />;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-display font-bold text-gray-800 mb-4">
          🏆 Challenge Leaderboard
        </h1>
        <p className="text-xl text-gray-600">
          Compete with players of similar skill level and climb the rankings!
        </p>
      </motion.div>

      {/* Player Stats Summary */}
      {playerStats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Your Stats</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">{playerStats.totalChallenges}</div>
                <div className="text-sm text-gray-600">Challenges</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{playerStats.bestScore}</div>
                <div className="text-sm text-gray-600">Best Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{playerStats.averageAccuracy}%</div>
                <div className="text-sm text-gray-600">Avg Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{playerStats.totalPoints}</div>
                <div className="text-sm text-gray-600">Total Points</div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Card className="p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Filter Rankings</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Subject Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="math">Math</option>
                <option value="reading">Reading</option>
              </select>
            </div>

            {/* Challenge Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Challenge Type</label>
              <select
                value={selectedChallenge}
                onChange={(e) => setSelectedChallenge(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Challenges</option>
                {challengeTypes.map(type => (
                  <option key={type.Id} value={type.type}>{type.name}</option>
                ))}
              </select>
            </div>

            {/* Skill Level Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skill Level</label>
              <select
                value={selectedSkillLevel}
                onChange={(e) => setSelectedSkillLevel(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="1">Beginner (Level 1)</option>
                <option value="2">Intermediate (Level 2)</option>
                <option value="3">Advanced (Level 3)</option>
              </select>
            </div>

            {/* Time Period Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="all">All Time</option>
              </select>
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Leaderboard */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Rankings</h2>
              <Badge variant="secondary">
                {leaderboard.length} players
              </Badge>
            </div>

            {leaderboard.length === 0 ? (
              <div className="text-center py-12">
                <ApperIcon name="Trophy" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No rankings available for the selected filters.</p>
                <Button
                  variant="primary"
                  className="mt-4"
                  onClick={() => window.location.href = selectedSubject === 'math' ? '/math' : '/reading'}
                >
                  Start a Challenge
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {leaderboard.map((entry, index) => (
                  <motion.div
                    key={entry.Id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                      entry.userId === 'current_user' 
                        ? 'border-primary-300 bg-primary-50' 
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getRankColor(entry.rank)}`}>
                        <ApperIcon name={getRankIcon(entry.rank)} className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-800">
                          {entry.userName}
                          {entry.userId === 'current_user' && (
                            <Badge variant="primary" className="ml-2">You</Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatTime(entry.timeUsed)} • {entry.accuracy}% accuracy
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-primary-600">{entry.score}</div>
                      <div className="text-sm text-gray-600">{entry.correctAnswers}/{entry.totalQuestions} correct</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Challenge Types & Player Ranking */}
        <div className="space-y-6">
          
          {/* Current Player Ranking */}
          {playerRanking && (
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Your Current Rank</h3>
              <div className="text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${getRankColor(playerRanking.rank)}`}>
                  <ApperIcon name={getRankIcon(playerRanking.rank)} className="w-8 h-8" />
                </div>
                <div className="text-2xl font-bold text-gray-800">#{playerRanking.rank}</div>
                <div className="text-sm text-gray-600">out of {playerRanking.totalPlayers} players</div>
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-primary-600">{playerRanking.score} points</div>
                  <div className="text-sm text-gray-600">{playerRanking.accuracy}% accuracy</div>
                </div>
              </div>
            </Card>
          )}

          {/* Available Challenges */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Challenge Types</h3>
            <div className="space-y-3">
              {challengeTypes.map(challenge => (
                <div key={challenge.Id} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <ApperIcon name={challenge.icon} className="w-5 h-5 text-primary-600" />
                    <div className="font-medium text-gray-800">{challenge.name}</div>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">{challenge.description}</div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>⏱️ {Math.floor(challenge.timeLimit / 60)}min</span>
                    <span>📝 {challenge.maxQuestions} questions</span>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="primary"
              className="w-full mt-4"
              onClick={() => window.location.href = selectedSubject === 'math' ? '/math' : '/reading'}
            >
              <ApperIcon name="Play" className="w-4 h-4 mr-2" />
              Start Challenge
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;