import { useEffect, useState } from 'react';
import { calculateReadinessScore, getReadinessLevel } from '../utils/scoringLogic';

const ReadinessScore = () => {
  const [score, setScore] = useState(0);
  const [levelInfo, setLevelInfo] = useState({ level: '', color: '' });

  useEffect(() => {
    // In a real app, these values would be fetched from user state/database
    const mockInteractions = 5;
    const mockArticlesRead = 3;
    const mockQuizzesTaken = 1;
    
    const calculatedScore = calculateReadinessScore(mockInteractions, mockArticlesRead, mockQuizzesTaken);
    setScore(calculatedScore);
    setLevelInfo(getReadinessLevel(calculatedScore));
  }, []);

  return (
    <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
      <h3 style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>Your Vote Readiness Score</h3>
      <div style={{ position: 'relative', width: '150px', height: '150px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%' }}>
          <path
            stroke="var(--surface)"
            strokeWidth="3"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            stroke={levelInfo.color}
            strokeWidth="3"
            strokeDasharray={`${score}, 100`}
            strokeLinecap="round"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831", 100` }}
          />
        </svg>
        <div style={{ position: 'absolute', fontSize: '2rem', fontWeight: 'bold' }}>
          {score}
        </div>
      </div>
      <p style={{ marginTop: '1rem', fontWeight: 600, color: levelInfo.color }}>{levelInfo.level}</p>
    </div>
  );
};

export default ReadinessScore;
