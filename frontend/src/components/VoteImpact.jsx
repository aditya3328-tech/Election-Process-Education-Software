import React, { useState } from 'react';
import { Users, TrendingDown, TrendingUp, Activity } from 'lucide-react';

const impactData = {
  low: {
    label: 'Low Participation',
    result: 'Weak Government',
    description: 'When fewer people vote, the government only represents a small fraction of the population. This leads to policies that favor the few rather than the many, and public trust drops significantly.',
    color: 'from-red-500 to-orange-500',
    iconColor: 'text-red-400',
    stats: [
      { name: 'Public Representation', value: 35 },
      { name: 'Policy Effectiveness', value: 40 },
      { name: 'Government Accountability', value: 25 },
    ]
  },
  medium: {
    label: 'Medium Participation',
    result: 'Balanced Government',
    description: 'Average voter turnout creates a functional but standard government. While basic needs are met, major progressive shifts or strong national unity might be lacking due to missing voices.',
    color: 'from-blue-500 to-cyan-500',
    iconColor: 'text-blue-400',
    stats: [
      { name: 'Public Representation', value: 65 },
      { name: 'Policy Effectiveness', value: 70 },
      { name: 'Government Accountability', value: 60 },
    ]
  },
  high: {
    label: 'High Participation',
    result: 'Strong Democracy',
    description: 'When the majority votes, the government truly reflects the will of the people. Leaders are held highly accountable, and policies benefit the vast majority of the population.',
    color: 'from-green-500 to-emerald-500',
    iconColor: 'text-green-400',
    stats: [
      { name: 'Public Representation', value: 95 },
      { name: 'Policy Effectiveness', value: 90 },
      { name: 'Government Accountability', value: 98 },
    ]
  }
};

const VoteImpact = () => {
  const [level, setLevel] = useState('medium');
  const currentData = impactData[level];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 space-y-4">
          <h2
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Vote <span className="bg-gradient-to-r from-orange-400 to-pink-500 text-transparent bg-clip-text">Impact</span> Visualizer
          </h2>
          <p
            className="text-lg text-slate-400 max-w-2xl mx-auto"
          >
            See exactly how voter turnout shapes the strength, accountability, and effectiveness of your democracy.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">
          
          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
            {Object.keys(impactData).map((key) => (
              <button
                key={key}
                onClick={() => setLevel(key)}
                className={`relative px-6 py-3 rounded-full font-medium transition-all duration-300 w-full sm:w-auto ${
                  level === key 
                    ? 'text-white shadow-lg' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {level === key && (
                  <div
                    layoutId="activePill"
                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${impactData[key].color} opacity-80`}
                  />
                )}
                <span className="relative z-10">{impactData[key].label}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Text Output Section */}
            <div className="space-y-6">
              <>
                <div
                  key={level}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${currentData.iconColor}`}>
                      {level === 'low' ? <TrendingDown className="w-8 h-8" /> : 
                       level === 'medium' ? <Activity className="w-8 h-8" /> : 
                       <TrendingUp className="w-8 h-8" />}
                    </div>
                    <h3 className={`text-3xl font-bold bg-gradient-to-r ${currentData.color} text-transparent bg-clip-text`}>
                      {currentData.result}
                    </h3>
                  </div>
                  <p className="text-slate-300 text-lg leading-relaxed mb-8 border-l-4 border-slate-700 pl-4 py-1">
                    {currentData.description}
                  </p>
                </div>
              </>
            </div>

            {/* Visualizer Chart */}
            <div className="bg-slate-900/50 rounded-2xl p-6 md:p-8 border border-white/5">
              <h4 className="text-white font-medium mb-6 flex items-center gap-2">
                <Users className="w-5 h-5 text-slate-400" />
                Democracy Metrics
              </h4>
              <div className="space-y-6">
                {currentData.stats.map((stat, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">{stat.name}</span>
                      <span className="text-white font-bold">{stat.value}%</span>
                    </div>
                    <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div style={{ width: `${stat.value}%` }}
                        className={`h-full rounded-full bg-gradient-to-r ${currentData.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default VoteImpact;
