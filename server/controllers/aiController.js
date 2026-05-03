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

exports.electionChatAssistant = async (req, res) => {
  try {
    const { message, history, language } = req.body;
    const isHindi = language === 'hi';

    const systemPrompt = isHindi
      ? `आप VoteWise AI हैं — एक सरल और मित्रवत चुनाव सहायक। आपका काम है भारतीय नागरिकों को चुनाव प्रक्रिया, मतदाता पंजीकरण, चुनाव की समय-सीमा और मतदान के चरण समझाना।
नियम:
- हमेशा सरल हिंदी में उत्तर दें (अंग्रेज़ी शब्द कम से कम उपयोग करें)
- जब भी ज़रूरी हो bullet points का उपयोग करें
- जटिल राजनीतिक शब्दों से बचें
- छोटे, स्पष्ट और सहायक उत्तर दें
- केवल चुनाव/मतदान से संबंधित प्रश्नों का उत्तर दें`
      : `You are VoteWise AI — a friendly and simple Election Assistant. Your role is to help citizens understand the election process, voter registration, election timelines, and voting steps.
Rules:
- Always respond in simple, clear English
- Use bullet points when listing steps or multiple items
- Avoid complex political jargon
- Keep responses concise and helpful
- Only answer questions related to elections and voting`;

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      const mock = isHindi
        ? `[Mock] "${message}" के बारे में: भारत में मतदान करने के लिए आपको मतदाता सूची में अपना नाम दर्ज करवाना होता है। आप voter.eci.gov.in पर ऑनलाइन पंजीकरण कर सकते हैं।`
        : `[Mock] About "${message}": To vote in India, you need to be registered on the electoral roll. You can register online at voter.eci.gov.in. On election day, bring your Voter ID card to your designated polling booth.`;
      return res.status(200).json({ reply: mock });
    }

    const prompt = `${systemPrompt}

User question: ${message}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.status(200).json({ reply: response.text });
  } catch (error) {
    console.error('Error in electionChatAssistant:', error);
    res.status(500).json({ error: 'Failed to process election chat' });
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
