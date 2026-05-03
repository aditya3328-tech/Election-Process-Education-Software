const { GoogleGenAI } = require('@google/genai');

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'dummy_key' });

const hasKey = () =>
  process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here';

const safeGenerate = async (prompt) => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });
  return response.text;
};

// ─── Original chat assistant ──────────────────────────────────────────────────
exports.chatAssistant = async (req, res) => {
  try {
    const { message } = req.body;
    if (!hasKey()) {
      return res.status(200).json({
        reply: `[Mock AI Response] I heard: "${message}". Please configure your Gemini API key to enable real AI.`,
      });
    }
    const text = await safeGenerate(
      `You are VoteWise AI, a smart election companion. Respond to the following user message: ${message}`
    );
    res.status(200).json({ reply: text });
  } catch (error) {
    console.error('Error in chatAssistant:', error.message);
    res.status(500).json({ error: 'Failed to process chat' });
  }
};

// ─── Election multilingual chat assistant ─────────────────────────────────────
exports.electionChatAssistant = async (req, res) => {
  const isHindi = req.body?.language === 'hi';

  const fallback = {
    auth:    isHindi ? 'API key की समस्या है। कृपया admin से संपर्क करें।'                        : 'API key issue. Please contact the administrator.',
    quota:   isHindi ? 'बहुत अधिक अनुरोध। कृपया कुछ देर बाद पुनः प्रयास करें।'                   : 'Too many requests. Please try again in a moment.',
    generic: isHindi ? 'कुछ तकनीकी समस्या आई। कृपया पुनः प्रयास करें।'                            : 'A technical issue occurred. Please try again.',
    noKey:   isHindi ? 'भारत में मतदान के लिए voter.eci.gov.in पर पंजीकरण करें।'                  : 'To vote in India, register at voter.eci.gov.in. Bring your Voter ID on election day.',
  };

  try {
    const { message, language } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: isHindi ? 'अमान्य संदेश।' : 'Invalid message.' });
    }

    if (!hasKey()) {
      return res.status(200).json({ reply: fallback.noKey });
    }

    const systemPrompt = isHindi
      ? `आप VoteWise AI हैं — एक सरल और मित्रवत चुनाव सहायक। भारतीय नागरिकों को चुनाव प्रक्रिया, मतदाता पंजीकरण, चुनाव की समय-सीमा और मतदान के चरण सरल हिंदी में समझाएं। जब ज़रूरी हो bullet points का उपयोग करें। जटिल शब्दों से बचें।`
      : `You are VoteWise AI — a friendly Election Assistant. Help citizens understand the election process, voter registration, election timelines, and voting steps in simple English. Use bullet points when listing steps. Avoid political jargon.`;

    const text = await safeGenerate(`${systemPrompt}\n\nUser question: ${message}`);
    return res.status(200).json({ reply: text });

  } catch (error) {
    const code = error?.status || error?.code || 0;
    console.error(`[electionChatAssistant] Error (${code}):`, error?.message || error);

    if (code === 403 || code === 401) return res.status(200).json({ reply: fallback.auth });
    if (code === 429)                 return res.status(200).json({ reply: fallback.quota });
    return res.status(200).json({ reply: fallback.generic });
  }
};

// ─── Personality analyzer ─────────────────────────────────────────────────────
exports.analyzePersonality = async (req, res) => {
  try {
    const { answers } = req.body;
    if (!hasKey()) {
      return res.status(200).json({
        personality: 'Pragmatic Centrist',
        description: 'You tend to weigh issues from multiple perspectives before deciding.',
        keyIssues: ['Economy', 'Education'],
      });
    }
    const prompt = `Analyze the following user answers to political questions and determine their voting personality type: ${JSON.stringify(answers)}. Return a JSON format containing: personality (string), description (string), and keyIssues (array of strings).`;
    let result = await safeGenerate(prompt);
    if (result.includes('```json')) result = result.split('```json')[1].split('```')[0].trim();
    res.status(200).json(JSON.parse(result));
  } catch (error) {
    console.error('Error in analyzePersonality:', error.message);
    res.status(500).json({ error: 'Failed to analyze personality' });
  }
};

// ─── Candidate comparison ─────────────────────────────────────────────────────
exports.compareCandidates = async (req, res) => {
  try {
    const { candidateA, candidateB } = req.body;
    if (!hasKey()) {
      return res.status(200).json({
        comparison: `[Mock] Comparing ${candidateA} and ${candidateB}. They both have distinct approaches to key policies.`,
      });
    }
    const text = await safeGenerate(
      `Provide an unbiased comparison of political candidates ${candidateA} and ${candidateB} across their key policies and voting records.`
    );
    res.status(200).json({ comparison: text });
  } catch (error) {
    console.error('Error in compareCandidates:', error.message);
    res.status(500).json({ error: 'Failed to compare candidates' });
  }
};

// ─── Why You Should Vote ──────────────────────────────────────────────────────
exports.whyYouVote = async (req, res) => {
  try {
    const { status, priority, followsNews } = req.body;
    if (!hasKey()) {
      return res.status(200).json({
        message: `Since you are a ${status} who cares about ${priority} and ${followsNews ? 'follows' : 'does not follow'} the news, voting is your most powerful tool for real change.`,
      });
    }
    const text = await safeGenerate(
      `Write a short, powerful, personalized paragraph (3-4 sentences) explaining why voting is critical for a ${status} who cares most about ${priority} and ${followsNews ? 'regularly follows' : 'does not follow'} the news. Make it inspiring and direct.`
    );
    res.status(200).json({ message: text });
  } catch (error) {
    console.error('Error in whyYouVote:', error.message);
    res.status(500).json({ error: 'Failed to generate message' });
  }
};

// ─── Bias Detector ────────────────────────────────────────────────────────────
exports.detectBias = async (req, res) => {
  try {
    const { statement } = req.body;
    if (!hasKey()) {
      return res.status(200).json({
        biasType: 'Emotional Bias',
        analysis: 'The statement relies heavily on emotion rather than facts.',
        suggestion: 'Try to look at objective data.',
      });
    }
    const prompt = `Analyze this statement for political or cognitive bias: "${statement}". Return ONLY valid JSON with 3 keys: "biasType" (e.g. Emotional Bias, Confirmation Bias, Single-factor Bias, or None), "analysis" (short explanation), "suggestion" (how to think more balanced).`;
    let result = await safeGenerate(prompt);
    if (result.includes('```json')) result = result.split('```json')[1].split('```')[0].trim();
    res.status(200).json(JSON.parse(result));
  } catch (error) {
    console.error('Error in detectBias:', error.message);
    res.status(500).json({ error: 'Failed to analyze bias' });
  }
};

// ─── Fake News Checker ────────────────────────────────────────────────────────
exports.checkFakeNews = async (req, res) => {
  try {
    const { newsText } = req.body;
    if (!hasKey()) {
      return res.status(200).json({ status: 'Needs Verification', explanation: 'Check trusted sources.' });
    }
    const prompt = `Analyze this news snippet for authenticity: "${newsText}". Return ONLY valid JSON with 2 keys: "status" (must be exactly "Verified", "Misleading", or "Needs Verification"), and "explanation" (1-2 sentences explaining why).`;
    let result = await safeGenerate(prompt);
    if (result.includes('```json')) result = result.split('```json')[1].split('```')[0].trim();
    res.status(200).json(JSON.parse(result));
  } catch (error) {
    console.error('Error in checkFakeNews:', error.message);
    res.status(500).json({ error: 'Failed to check news' });
  }
};

// ─── Smart Action ─────────────────────────────────────────────────────────────
exports.getSmartAction = async (req, res) => {
  try {
    if (!hasKey()) {
      return res.status(200).json({ action: 'Check Candidate Policies', reason: "It's good to know who is running." });
    }
    const prompt = `Act as an election assistant. Suggest one immediate smart action a voter should take right now. Return ONLY valid JSON with 2 keys: "action" (the action title) and "reason" (short explanation). Make it dynamic.`;
    let result = await safeGenerate(prompt);
    if (result.includes('```json')) result = result.split('```json')[1].split('```')[0].trim();
    res.status(200).json(JSON.parse(result));
  } catch (error) {
    console.error('Error in getSmartAction:', error.message);
    res.status(500).json({ error: 'Failed to get smart action' });
  }
};
