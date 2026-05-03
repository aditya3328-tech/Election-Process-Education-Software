const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL = 'gemini-2.5-flash';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

// Helper for cleaning JSON from AI response
const cleanJson = (text) => {
  if (text.includes('```json')) {
    return text.split('```json')[1].split('```')[0].trim();
  }
  return text.trim();
};

const safeGenerate = async (prompt, history = []) => {
  console.log('Generating content via REST API with model:', MODEL);
  
  // Format contents for the REST API
  const contents = history.map(h => ({
    role: h.role === 'user' ? 'user' : 'model',
    parts: [{ text: h.parts }],
  }));
  
  // Add current prompt
  contents.push({
    role: 'user',
    parts: [{ text: typeof prompt === 'string' ? prompt : JSON.stringify(prompt) }],
  });

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contents }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('REST API Error:', errorData);
      throw new Error(errorData.error?.message || 'API request failed');
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    return reply;
  } catch (err) {
    console.error('REST API Fetch Error:', err);
    throw err;
  }
};

export const chatWithAssistant = async (message, history = []) => {
  try {
    const prompt = `You are VoteWise AI, a smart election companion. Respond to the following user message: ${message}`;
    const text = await safeGenerate(prompt, history);
    return { reply: text };
  } catch (error) {
    return { reply: 'Sorry, I am having trouble connecting to the AI.' };
  }
};

export const chatWithElectionAssistant = async (message, history = [], language = 'en') => {
  const isHindi = language === 'hi';
  try {
    const systemPrompt = isHindi
      ? `आप VoteWise AI हैं। नागरिकों को चुनाव प्रक्रिया सरल हिंदी में समझाएं।\nनियम:\n- उत्तर बहुत छोटा और केवल मुख्य बिंदुओं (bullet points) में दें।\n- एक बार में 4-5 बिंदुओं से ज़्यादा न लिखें।\n- जटिल शब्दों से बचें और उत्तर को आकर्षक बनाएं।`
      : `You are VoteWise AI. Help citizens understand the election process in simple English.\nRules:\n- Keep responses very concise and use ONLY bullet points for the main info.\n- Limit yourself to 4-5 points per response.\n- Avoid jargon and make it visually easy to read.`;

    const text = await safeGenerate(`${systemPrompt}\n\nUser question: ${message}`, history);
    return { reply: text };
  } catch (error) {
    return {
      reply: isHindi
        ? 'माफ़ करें, कुछ तकनीकी समस्या है। कृपया पुनः प्रयास करें।'
        : 'Sorry, I am having a technical issue. Please try again.',
    };
  }
};

export const analyzeVotingPersonality = async (answers) => {
  try {
    const prompt = `Analyze the following user answers to political questions and determine their voting personality type: ${JSON.stringify(answers)}. Return a JSON format containing: personality (string), description (string), and keyIssues (array of strings).`;
    const text = await safeGenerate(prompt);
    const cleaned = cleanJson(text);
    return JSON.parse(cleaned);
  } catch (error) {
    console.error('Error in analyzePersonality:', error);
    throw error;
  }
};

export const compareCandidates = async (candidateA, candidateB) => {
  try {
    const prompt = `Provide an unbiased comparison of political candidates ${candidateA} and ${candidateB} across their key policies and voting records.`;
    const text = await safeGenerate(prompt);
    return { comparison: text };
  } catch (error) {
    console.error('Error in compareCandidates:', error);
    throw error;
  }
};

export const generateWhyYouVoteMessage = async (status, priority, followsNews) => {
  try {
    const prompt = `Write a short, powerful, personalized paragraph (3-4 sentences) explaining why voting is critical for a ${status} who cares most about ${priority} and ${followsNews ? 'regularly follows' : 'does not follow'} the news. Make it inspiring and direct.`;
    const text = await safeGenerate(prompt);
    return { message: text };
  } catch (error) {
    console.error('Error in whyYouVote:', error);
    throw error;
  }
};

export const detectBias = async (statement) => {
  try {
    const prompt = `Analyze this statement for political or cognitive bias: "${statement}". Return ONLY valid JSON with 3 keys: "biasType" (e.g. Emotional Bias, Confirmation Bias, Single-factor Bias, or None), "analysis" (short explanation), "suggestion" (how to think more balanced).`;
    const text = await safeGenerate(prompt);
    const cleaned = cleanJson(text);
    return JSON.parse(cleaned);
  } catch (error) {
    console.error('Error in detectBias:', error);
    throw error;
  }
};

export const checkFakeNews = async (newsText) => {
  try {
    const prompt = `Analyze this news snippet for authenticity: "${newsText}". Return ONLY valid JSON with 2 keys: "status" (must be exactly "Verified", "Misleading", or "Needs Verification"), and "explanation" (1-2 sentences explaining why).`;
    const text = await safeGenerate(prompt);
    const cleaned = cleanJson(text);
    return JSON.parse(cleaned);
  } catch (error) {
    console.error('Error in checkFakeNews:', error);
    throw error;
  }
};

export const getSmartAction = async () => {
  try {
    const prompt = `Act as an election assistant. Suggest one immediate smart action a voter should take right now. Return ONLY valid JSON with 2 keys: "action" (the action title) and "reason" (short explanation). Make it dynamic.`;
    const text = await safeGenerate(prompt);
    const cleaned = cleanJson(text);
    return JSON.parse(cleaned);
  } catch (error) {
    console.error('Error in getSmartAction:', error);
    throw error;
  }
};
