import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Languages } from 'lucide-react';

const languages = [
  {
    code: 'en',
    label: 'English',
    native: 'English',
    flag: '🇬🇧',
    desc: 'Chat in English',
  },
  {
    code: 'hi',
    label: 'Hindi',
    native: 'हिंदी',
    flag: '🇮🇳',
    desc: 'हिंदी में बात करें',
  },
];

const LanguageSelector = ({ onSelect }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md px-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          className="bg-slate-900 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl w-full max-w-lg text-center relative overflow-hidden"
        >
          {/* Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-purple-600/20 rounded-full blur-[80px] pointer-events-none" />

          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 300 }}
            className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/30"
          >
            <Languages className="w-8 h-8 text-white" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-white mb-2"
          >
            Choose your language
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-slate-400 mb-8 text-sm"
          >
            अपनी भाषा चुनें • Select your preferred language
          </motion.p>

          <div className="grid grid-cols-2 gap-4">
            {languages.map((lang, i) => (
              <motion.button
                key={lang.code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSelect(lang.code)}
                className="group flex flex-col items-center gap-3 p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-purple-500/60 hover:bg-purple-500/10 transition-all duration-300 cursor-pointer"
              >
                <span className="text-4xl">{lang.flag}</span>
                <div>
                  <p className="text-white font-bold text-lg">{lang.native}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{lang.desc}</p>
                </div>
              </motion.button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="mt-6 flex items-center justify-center gap-2 text-slate-500 text-xs"
          >
            <Globe className="w-3 h-3" />
            <span>You can change language anytime during the chat</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LanguageSelector;
