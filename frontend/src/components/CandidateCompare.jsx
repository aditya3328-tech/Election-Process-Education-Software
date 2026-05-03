import { useState } from 'react';
import { compareCandidates } from '../services/geminiService';
import { GitCompare, Loader2 } from 'lucide-react';

const CANDIDATES = [
  "Joe Biden",
  "Donald Trump",
  "Kamala Harris",
  "Ron DeSantis",
  "Nikki Haley",
  "Gavin Newsom",
  "Bernie Sanders",
  "Vivek Ramaswamy"
];

const CandidateCompare = () => {
  const [candidateA, setCandidateA] = useState('');
  const [candidateB, setCandidateB] = useState('');
  const [comparison, setComparison] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCompare = async (e) => {
    e.preventDefault();
    if (!candidateA || !candidateB || candidateA === candidateB) return;
    
    setIsLoading(true);
    setComparison('');
    try {
      const data = await compareCandidates(candidateA, candidateB);
      setComparison(data.comparison);
    } catch (error) {
      setComparison("Error fetching comparison data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="glass-card p-6 md:p-8">
        <form onSubmit={handleCompare} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            
            {/* VS Badge */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-600 items-center justify-center font-bold text-slate-300">
              VS
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-400">Select First Candidate</label>
              <select 
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
                value={candidateA}
                onChange={(e) => setCandidateA(e.target.value)}
              >
                <option value="" disabled>Choose a candidate...</option>
                {CANDIDATES.map(c => (
                  <option key={c} value={c} disabled={c === candidateB}>{c}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-400">Select Second Candidate</label>
              <select 
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
                value={candidateB}
                onChange={(e) => setCandidateB(e.target.value)}
              >
                <option value="" disabled>Choose a candidate...</option>
                {CANDIDATES.map(c => (
                  <option key={c} value={c} disabled={c === candidateA}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="w-full btn-primary flex justify-center items-center gap-2"
            disabled={isLoading || !candidateA || !candidateB || candidateA === candidateB}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing Policies...
              </>
            ) : (
              <>
                <GitCompare className="w-5 h-5" />
                Compare Policies
              </>
            )}
          </button>
        </form>
      </div>

      {comparison && (
        <div
          className="glass-card p-6 md:p-8 border-t-4 border-t-purple-500"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <GitCompare className="w-6 h-6 text-purple-400" />
            Comparison Results
          </h3>
          <div className="prose prose-invert max-w-none">
            <p className="text-slate-300 leading-relaxed whitespace-pre-wrap font-medium">
              {comparison}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateCompare;
