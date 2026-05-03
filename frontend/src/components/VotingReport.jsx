import React from 'react';
import { FileText, Download } from 'lucide-react';

const VotingReport = () => {
  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-emerald-500/20 rounded-xl">
            <FileText className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="text-2xl font-bold text-white">Voting Report</h3>
        </div>
        
        <p className="text-slate-400 mb-6">Generate your personalized voting summary, combining your personality analysis and readiness score.</p>
        
        <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-700 mb-6 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-700 pb-3">
            <span className="text-slate-400">Voter Profile</span>
            <span className="text-emerald-400 font-bold">Logical Voter</span>
          </div>
          <div className="flex justify-between items-center border-b border-slate-700 pb-3">
            <span className="text-slate-400">Readiness Score</span>
            <span className="text-blue-400 font-bold">75% Ready</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Key Focus</span>
            <span className="text-pink-400 font-bold">Economy & Tech</span>
          </div>
        </div>
      </div>

      <button 
        onClick={handleDownload}
        className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all active:scale-95 flex justify-center items-center gap-2"
      >
        <Download className="w-5 h-5" />
        Download as PDF
      </button>
    </div>
  );
};

export default VotingReport;
