import React, { useState } from 'react';
import { Bot, MessageSquare } from 'lucide-react';
import ChatPopup from './ChatPopup';

const FloatingAIButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <>
        {isOpen && <ChatPopup onClose={() => setIsOpen(false)} />}
      </>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group mt-4 block ml-auto"
      >
        {/* Glow Effects */}
        <div className="absolute inset-0 bg-purple-500 rounded-full blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-300"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-pulse opacity-60"></div>
        
        {/* Button Core */}
        <div className="relative w-16 h-16 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-full flex items-center justify-center shadow-2xl border border-white/20 z-10 overflow-hidden">
          <>
            {!isOpen ? (
              <div
                key="bot"
              >
                <Bot className="w-8 h-8 text-white drop-shadow-md" />
              </div>
            ) : (
              <div
                key="close"
              >
                <MessageSquare className="w-7 h-7 text-white drop-shadow-md" />
              </div>
            )}
          </>
        </div>
      </button>
    </div>
  );
};

export default FloatingAIButton;
