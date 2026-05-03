import React, { useState } from 'react';
import { detectBias } from '../services/geminiService';
import { Search, Loader2, AlertTriangle, CheckCircle2 } from 'lucide-react';

const BiasDetector = () => {
  const [statement, setStatement] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!statement.trim()) return;
    setIsLoading(true);
    try {
      const data = await detectBias(statement);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:shadow-[0_0_30px_rgba(236,72,153,0.2)] transition-all duration-300">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-pink-500/20 rounded-xl">
          <Search className="w-6 h-6 text-pink-400" />
        </div>
        <h3 className="text-2xl font-bold text-white">Voting Bias Detector</h3>
      </div>
      
      <p className="text-slate-400 mb-6">Paste an opinion or statement below. Our AI will analyze it for emotional or single-factor biases.</p>
      
      <form onSubmit={handleAnalyze} className="space-y-4">
        <textarea 
          value={statement}
          onChange={(e) => setStatement(e.target.value)}
          placeholder="e.g. 'I'm only voting for X because the economy is bad.'"
          className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all placeholder:text-slate-500 min-h-[100px]"
        />
        <button 
          type="submit"
          disabled={isLoading || !statement.trim()}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-pink-500/25 transition-all active:scale-95 disabled:opacity-50 flex justify-center items-center gap-2"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Detect Bias"}
        </button>
      </form>

      <>
        {result && !isLoading && (
          <div
            className="mt-6 p-5 bg-slate-900/50 border border-slate-700 rounded-xl space-y-4"
          >
            <div className="flex items-center gap-3">
              {result.biasType === 'None' || result.biasType === 'No Bias' ? (
                <CheckCircle2 className="w-6 h-6 text-green-400" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
              )}
              <h4 className="text-white font-bold text-lg">{result.biasType}</h4>
            </div>
            <div className="space-y-2">
              <p className="text-slate-300 text-sm"><strong className="text-white">Analysis:</strong> {result.analysis}</p>
              <p className="text-pink-300 text-sm bg-pink-500/10 p-3 rounded-lg"><strong className="text-pink-400">Suggestion:</strong> {result.suggestion}</p>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default BiasDetector;
