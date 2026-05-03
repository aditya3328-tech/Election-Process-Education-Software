export const calculateReadinessScore = (interactions, articlesRead, quizzesTaken) => {
  // Simple scoring logic based on user engagement
  let score = 0;
  
  // Base points for interacting with the AI chat
  score += Math.min(interactions * 5, 40); 
  
  // Points for reading informational articles/content
  score += Math.min(articlesRead * 10, 30);
  
  // Points for taking the personality quiz or other quizzes
  score += quizzesTaken * 15;
  
  // Cap at 100
  return Math.min(score, 100);
};

export const getReadinessLevel = (score) => {
  if (score >= 80) return { level: 'Fully Prepared', color: 'var(--success)' };
  if (score >= 50) return { level: 'Getting There', color: 'var(--primary-color)' };
  return { level: 'Just Starting', color: 'var(--text-secondary)' };
};
