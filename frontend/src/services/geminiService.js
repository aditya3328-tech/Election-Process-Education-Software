const API_URL = 'http://localhost:5000/api/ai';

export const chatWithAssistant = async (message, history = []) => {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, history }),
    });
    
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error calling chat API:', error);
    return { reply: 'Sorry, I am having trouble connecting to the server.' };
  }
};

export const analyzeVotingPersonality = async (answers) => {
  try {
    const response = await fetch(`${API_URL}/analyze-personality`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answers }),
    });
    
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error calling personality API:', error);
    throw error;
  }
};

export const compareCandidates = async (candidateA, candidateB) => {
  try {
    const response = await fetch(`${API_URL}/compare-candidates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ candidateA, candidateB }),
    });
    
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error calling compare API:', error);
    throw error;
  }
};

export const generateWhyYouVoteMessage = async (status, priority, followsNews) => {
  try {
    const response = await fetch(`${API_URL}/why-you-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status, priority, followsNews }),
    });
    
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error calling why-you-vote API:', error);
    throw error;
  }
};

export const detectBias = async (statement) => {
  try {
    const response = await fetch(`${API_URL}/bias-detector`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ statement }),
    });
    if (!response.ok) throw new Error('Network error');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const checkFakeNews = async (newsText) => {
  try {
    const response = await fetch(`${API_URL}/fake-news-checker`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newsText }),
    });
    if (!response.ok) throw new Error('Network error');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSmartAction = async () => {
  try {
    const response = await fetch(`${API_URL}/smart-action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Network error');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
