import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader2, Globe, ChevronDown } from 'lucide-react';
import { chatWithElectionAssistant } from '../services/geminiService';

const QUICK_QUESTIONS = {
  en: [
    'How do I register to vote?',
    'What is the election timeline?',
    'What are the steps to vote on election day?',
    'What ID do I need to bring?',
  ],
  hi: [
    'मैं मतदाता पंजीकरण कैसे करूं?',
    'चुनाव की समय-सीमा क्या है?',
    'चुनाव के दिन मतदान करने के चरण क्या हैं?',
    'मुझे कौन सा पहचान पत्र लाना होगा?',
  ],
};

const WELCOME_MSG = {
  en: "Hello! 👋 I'm your VoteWise AI Election Assistant. I can help you understand the election process, timelines, voting steps, and more. Ask me anything!",
  hi: "नमस्ते! 👋 मैं आपका VoteWise AI चुनाव सहायक हूं। मैं आपको चुनाव प्रक्रिया, समय-सीमा, मतदान के चरण और बहुत कुछ समझने में मदद कर सकता हूं। कुछ भी पूछें!",
};

const LANG_LABELS = {
  en: { label: 'English', flag: '🇬🇧', other: 'hi', otherLabel: 'हिंदी', otherFlag: '🇮🇳' },
  hi: { label: 'हिंदी', flag: '🇮🇳', other: 'en', otherLabel: 'English', otherFlag: '🇬🇧' },
};

const MessageBubble = ({ msg, index }) => {
  const isUser = msg.sender === 'user';
  // Simple markdown-like rendering for bullet points
  const renderText = (text) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      if (line.startsWith('* ') || line.startsWith('• ') || line.startsWith('- ')) {
        return (
          <div key={i} className="flex gap-2 my-0.5">
            <span className="mt-1 text-purple-400 flex-shrink-0">•</span>
            <span>{line.replace(/^(\*|•|-)\s/, '')}</span>
          </div>
        );
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-bold my-1">{line.slice(2, -2)}</p>;
      }
      return line ? <p key={i} className="my-0.5">{line}</p> : <div key={i} className="h-2" />;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-md shadow-purple-500/20">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}
      <div
        className={`max-w-[82%] md:max-w-[72%] p-4 text-[14.5px] leading-relaxed shadow-md rounded-2xl ${
          isUser
            ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-tr-sm'
            : 'bg-slate-800/80 border border-slate-700/60 text-slate-100 rounded-tl-sm'
        }`}
      >
        {renderText(msg.text)}
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center shadow-md">
          <User className="w-4 h-4 text-slate-300" />
        </div>
      )}
    </motion.div>
  );
};

const ChatBox = ({ language, onLanguageChange }) => {
  const [messages, setMessages] = useState([
    { text: WELCOME_MSG[language], sender: 'ai' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // When language changes, add a context message
  const prevLang = useRef(language);
  useEffect(() => {
    if (prevLang.current !== language) {
      prevLang.current = language;
      setMessages(prev => [
        ...prev,
        { text: WELCOME_MSG[language], sender: 'ai' },
      ]);
    }
  }, [language]);

  const handleSend = async (text) => {
    const userMessage = (text || input).trim();
    if (!userMessage) return;
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setIsLoading(true);
    try {
      const history = messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: m.text,
      }));
      const response = await chatWithElectionAssistant(userMessage, history, language);
      setMessages(prev => [...prev, { text: response.reply, sender: 'ai' }]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          text: language === 'hi'
            ? 'माफ़ करें, कुछ तकनीकी समस्या है। कृपया पुनः प्रयास करें।'
            : "Sorry, I'm experiencing a technical issue. Please try again.",
          sender: 'ai',
        },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend();
  };

  const langInfo = LANG_LABELS[language];
  const placeholder = language === 'hi' ? 'अपना प्रश्न यहाँ लिखें...' : 'Ask about elections, voting steps...';
  const quickQs = QUICK_QUESTIONS[language];

  return (
    <div className="flex flex-col h-[75vh] max-h-[700px] bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden relative">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-slate-900/80 backdrop-blur-md flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-none">VoteWise AI</p>
            <p className="text-emerald-400 text-xs mt-0.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse inline-block" />
              Online
            </p>
          </div>
        </div>

        {/* Language Toggle */}
        <div className="relative">
          <button
            onClick={() => setShowLangMenu(v => !v)}
            className="flex items-center gap-2 bg-slate-800/80 border border-white/10 hover:border-purple-500/50 text-slate-300 hover:text-white text-sm px-3 py-2 rounded-xl transition-all duration-200"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{langInfo.flag} {langInfo.label}</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${showLangMenu ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {showLangMenu && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 bg-slate-800 border border-white/10 rounded-xl shadow-xl z-20 overflow-hidden min-w-[140px]"
              >
                <button
                  onClick={() => { onLanguageChange(langInfo.other); setShowLangMenu(false); }}
                  className="w-full flex items-center gap-2 px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 text-sm transition-colors"
                >
                  {langInfo.otherFlag} {langInfo.otherLabel}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-5 space-y-4 custom-scrollbar">
        {messages.map((msg, i) => (
          <MessageBubble key={i} msg={msg} index={i} />
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 justify-start"
          >
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl rounded-tl-sm p-4 flex items-center gap-2">
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-purple-400 rounded-full"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </div>
              <span className="text-slate-400 text-sm ml-1">
                {language === 'hi' ? 'AI सोच रहा है...' : 'AI is thinking...'}
              </span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      <div className="px-4 md:px-6 py-2 border-t border-white/5 flex-shrink-0">
        <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
          {quickQs.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              disabled={isLoading}
              className="flex-shrink-0 text-xs bg-slate-800/60 hover:bg-purple-600/20 border border-white/10 hover:border-purple-500/40 text-slate-400 hover:text-purple-300 rounded-full px-3 py-1.5 transition-all duration-200 disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="px-4 md:px-6 pb-4 pt-3 bg-slate-900/60 backdrop-blur-md border-t border-white/5 flex-shrink-0">
        <form onSubmit={handleSubmit} className="flex gap-2 items-center">
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-slate-800/80 border border-slate-700/60 text-white rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition-all placeholder:text-slate-500"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={placeholder}
            disabled={isLoading}
          />
          <motion.button
            type="submit"
            disabled={isLoading || !input.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white flex items-center justify-center shadow-lg shadow-purple-500/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
          >
            {isLoading
              ? <Loader2 className="w-4 h-4 animate-spin" />
              : <Send className="w-4 h-4 ml-0.5" />
            }
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
