const { GoogleGenAI } = require('@google/genai');

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'dummy_key' });

exports.chatAssistant = async (req, res) => {
  try {
    const { message, history } = req.body;
    
    // Default response logic using the new @google/genai SDK
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
       return res.status(200).json({ 
          reply: `[Mock AI Response] I heard: "${message}". Please configure your Gemini API key to enable real AI.` 
       });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are VoteWise AI, a smart election companion. Respond to the following user message: ${message}`
    });
    
    res.status(200).json({ reply: response.text });
  } catch (error) {
    console.error('Error in chatAssistant:', error);
    res.status(500).json({ error: 'Failed to process chat' });
  }
};

exports.analyzePersonality = async (req, res) => {
  try {
    const { answers } = req.body;
    
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
        return res.status(200).json({ 
           personality: 'Pragmatic Centrist',
           description: 'You tend to weigh issues from multiple perspectives before deciding.',
           keyIssues: ['Economy', 'Education']
        });
    }

    const prompt = `Analyze the following user answers to political questions and determine their voting personality type: ${JSON.stringify(answers)}. Return a JSON format containing: personality (string), description (string), and keyIssues (array of strings).`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });

    let result = response.text;
    // Basic cleanup to extract JSON
    if (result.includes('```json')) {
      result = result.split('```json')[1].split('```')[0].trim();
    }
    
    res.status(200).json(JSON.parse(result));
  } catch (error) {
    console.error('Error in analyzePersonality:', error);
    res.status(500).json({ error: 'Failed to analyze personality' });
  }
};

exports.compareCandidates = async (req, res) => {
  try {
    const { candidateA, candidateB } = req.body;
    
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
        return res.status(200).json({ 
           comparison: `[Mock Comparison] Comparing ${candidateA} and ${candidateB}. They both have distinct approaches to key policies.` 
        });
    }

    const prompt = `Provide an unbiased comparison of political candidates ${candidateA} and ${candidateB} across their key policies and voting records.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });

    res.status(200).json({ comparison: response.text });
  } catch (error) {
    console.error('Error in compareCandidates:', error);
    res.status(500).json({ error: 'Failed to compare candidates' });
  }
};

exports.whyYouVote = async (req, res) => {
  try {
    const { status, priority, followsNews } = req.body;
    
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
        return res.status(200).json({ 
           message: `[Mock AI] Since you are a ${status} who cares about ${priority} and ${followsNews ? 'follows' : 'does not follow'} the news, voting is your most powerful tool to demand real changes that affect your daily life and future.` 
        });
    }

    const prompt = `Write a short, powerful, and highly personalized paragraph (3-4 sentences max) explaining why voting is critical for a person who is a ${status}, cares most about ${priority}, and ${followsNews ? 'regularly follows' : 'does not follow'} the news. Make it inspiring and direct.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });

    res.status(200).json({ message: response.text });
  } catch (error) {
    console.error('Error in whyYouVote:', error);
    res.status(500).json({ error: 'Failed to generate personalized message' });
  }
};

exports.detectBias = async (req, res) => {
  try {
    const { statement } = req.body;
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      return res.status(200).json({ biasType: "Emotional Bias", analysis: "[Mock] The statement relies heavily on emotion rather than facts.", suggestion: "Try to look at objective data." });
    }

    const prompt = `Analyze this statement for political or cognitive bias: "${statement}". Return ONLY valid JSON with 3 keys: "biasType" (e.g. Emotional Bias, Confirmation Bias, Single-factor Bias, or None), "analysis" (short explanation), "suggestion" (how to think more balanced).`;
    
    const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
    let result = response.text;
    if (result.includes('```json')) result = result.split('```json')[1].split('```')[0].trim();
    res.status(200).json(JSON.parse(result));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to analyze bias' });
  }
};

exports.checkFakeNews = async (req, res) => {
  try {
    const { newsText } = req.body;
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      return res.status(200).json({ status: "Needs Verification", explanation: "[Mock] Check trusted sources." });
    }

    const prompt = `Analyze this news snippet for authenticity: "${newsText}". Return ONLY valid JSON with 2 keys: "status" (must be exactly "Verified", "Misleading", or "Needs Verification"), and "explanation" (1-2 sentences explaining why).`;
    
    const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
    let result = response.text;
    if (result.includes('```json')) result = result.split('```json')[1].split('```')[0].trim();
    res.status(200).json(JSON.parse(result));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to check news' });
  }
};

exports.getSmartAction = async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      return res.status(200).json({ action: "Check Candidate Policies", reason: "[Mock] It's good to know who is running." });
    }

    const prompt = `Act as an election assistant. Suggest one immediate smart action a voter should take right now (e.g. Learn about candidates, Check readiness, Avoid misinformation). Return ONLY valid JSON with 2 keys: "action" (the suggested action title) and "reason" (short explanation of why they should do this now). Make it dynamic.`;
    
    const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
    let result = response.text;
    if (result.includes('```json')) result = result.split('```json')[1].split('```')[0].trim();
    res.status(200).json(JSON.parse(result));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to get smart action' });
  }
};
