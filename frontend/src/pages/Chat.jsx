import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatBox from '../components/ChatBox';
import LanguageSelector from '../components/LanguageSelector';
import { Vote, Sparkles } from 'lucide-react';

const ChatPage = () => {
  const [language, setLanguage] = useState(null); // null = show selector

  return (
    <div className="min-h-[calc(100vh-80px)] relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 py-10 md:py-14 relative z-10">

        {/* Page Header */}
        <AnimatePresence>
          {language && (
            <motion.div
              key="header"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <Vote className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                  AI{' '}
                  <span className="bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text">
                    {language === 'hi' ? 'चुनाव सहायक' : 'Election Assistant'}
                  </span>
                </h1>
              </div>
              <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
                {language === 'hi'
                  ? 'चुनाव प्रक्रिया, मतदान के चरणों और समय-सीमा के बारे में आसान भाषा में जानें।'
                  : 'Learn about the election process, voting steps, and timelines in simple, easy-to-understand language.'}
              </p>

              <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
                {[
                  language === 'hi' ? '🗳️ मतदान प्रक्रिया' : '🗳️ Voting Process',
                  language === 'hi' ? '📅 चुनाव समय-सीमा' : '📅 Election Timelines',
                  language === 'hi' ? '✅ चरण-दर-चरण मार्गदर्शन' : '✅ Step-by-Step Guide',
                ].map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-purple-500/10 border border-purple-500/20 text-purple-300 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Language Selector Modal */}
        {!language && <LanguageSelector onSelect={setLanguage} />}

        {/* Chat Interface */}
        <AnimatePresence>
          {language && (
            <motion.div
              key="chatbox"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <ChatBox language={language} onLanguageChange={setLanguage} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChatPage;
