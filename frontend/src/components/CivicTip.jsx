import React, { useState, useEffect } from 'react';
import { X, Lightbulb } from 'lucide-react';

const tips = [
  "Verify news before sharing on social media.",
  "Research candidates' voting records, not just their speeches.",
  "Make a plan for Election Day: know your polling place and time.",
  "Encourage three friends to register to vote this week.",
  "Look into local elections; they impact your daily life the most."
];

const CivicTip = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [tip, setTip] = useState('');

  useEffect(() => {
    // Show a tip after a slight delay
    const timer = setTimeout(() => {
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      setTip(randomTip);
      setIsVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isVisible && (
        <div
          className="fixed bottom-6 left-6 z-50 max-w-sm w-full"
        >
          <div className="bg-slate-900/90 backdrop-blur-xl border border-yellow-500/30 rounded-2xl p-5 shadow-[0_0_30px_rgba(234,179,8,0.15)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl -z-10 group-hover:bg-yellow-500/20 transition-colors"></div>
            
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-start gap-4 pr-6">
              <div className="p-3 bg-yellow-500/20 rounded-xl text-yellow-400">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Daily Civic Tip</h4>
                <p className="text-slate-300 text-sm leading-relaxed">{tip}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CivicTip;
