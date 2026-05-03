const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// Chat assistant route
router.post('/chat', aiController.chatAssistant);

// Election-specific multilingual chat
router.post('/election-chat', aiController.electionChatAssistant);

// Voting personality analyzer
router.post('/analyze-personality', aiController.analyzePersonality);

// Candidate comparison
router.post('/compare-candidates', aiController.compareCandidates);

// Why you should vote
router.post('/why-you-vote', aiController.whyYouVote);

// New features
router.post('/bias-detector', aiController.detectBias);
router.post('/fake-news-checker', aiController.checkFakeNews);
router.post('/smart-action', aiController.getSmartAction);

module.exports = router;
