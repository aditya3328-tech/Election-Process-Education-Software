import React, { useState } from 'react';
import { checkFakeNews } from '../services/geminiService';
import { ShieldAlert, Loader2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const FakeNewsChecker = () => {
  const [newsText, setNewsText] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheck = async (e) => {
    e.preventDefault();
    if (!newsText.trim()) return;
    setIsLoading(true);
    try {
      const data = await checkFakeNews(newsText);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    if (status === 'Verified') return 'text-green-400 bg-green-500/10 border-green-500/30';
    if (status === 'Misleading') return 'text-red-400 bg-red-500/10 border-red-500/30';
    return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
  };

  const getStatusIcon = (status) => {
    if (status === 'Verified') return <CheckCircle className="w-6 h-6" />;
    if (status === 'Misleading') return <XCircle className="w-6 h-6" />;
    return <AlertCircle className="w-6 h-6" />;
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-300">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-blue-500/20 rounded-xl">
          <ShieldAlert className="w-6 h-6 text-blue-400" />
        </div>
        <h3 className="text-2xl font-bold text-white">Fake News Checker</h3>
      </div>
      
      <p className="text-slate-400 mb-6">Paste a political news snippet or headline below. AI will check it for misleading information.</p>
      
      <form onSubmit={handleCheck} className="space-y-4">
        <textarea 
          value={newsText}
          onChange={(e) => setNewsText(e.target.value)}
          placeholder="Paste news text here..."
          className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-500 min-h-[100px]"
        />
        <button 
          type="submit"
          disabled={isLoading || !newsText.trim()}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all active:scale-95 disabled:opacity-50 flex justify-center items-center gap-2"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify Authenticity"}
        </button>
      </form>

      <>
        {result && !isLoading && (
          <div
            className={`mt-6 p-5 border rounded-xl space-y-3 ${getStatusColor(result.status)}`}
          >
            <div className="flex items-center gap-3 font-bold text-lg">
              {getStatusIcon(result.status)}
              {result.status}
            </div>
            <p className="text-sm opacity-90 leading-relaxed">
              {result.explanation}
            </p>
          </div>
        )}
      </>
    </div>
  );
};

export default FakeNewsChecker;
