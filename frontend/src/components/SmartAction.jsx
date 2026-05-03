import React, { useState } from 'react';
import { getSmartAction } from '../services/geminiService';
import { Zap, Loader2, ArrowRight } from 'lucide-react';

const SmartAction = () => {
  const [actionData, setActionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAction = async () => {
    setIsLoading(true);
    try {
      const data = await getSmartAction();
      setActionData(data);
    } catch (error) {
      setActionData({ action: "Error connecting to AI", reason: "Please try again later." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] transition-all duration-300">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-orange-500/20 rounded-xl">
          <Zap className="w-6 h-6 text-orange-400" />
        </div>
        <h3 className="text-2xl font-bold text-white">Smart Assistant</h3>
      </div>
      
      <p className="text-slate-400 mb-6">Not sure what to do next? Let AI analyze the current election context and suggest your next best move.</p>
      
      <button 
        onClick={fetchAction}
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all active:scale-95 disabled:opacity-50 flex justify-center items-center gap-2"
      >
        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "What Should I Do Now?"}
      </button>

      <>
        {actionData && !isLoading && (
          <div
            className="mt-6 p-5 bg-slate-900/50 border border-slate-700 rounded-xl"
          >
            <h4 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
              <ArrowRight className="w-5 h-5 text-orange-400" />
              {actionData.action}
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed">{actionData.reason}</p>
          </div>
        )}
      </>
    </div>
  );
};

export default SmartAction;
