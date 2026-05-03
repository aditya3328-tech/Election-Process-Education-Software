import React, { useState } from 'react';
import { generateWhyYouVoteMessage } from '../services/geminiService';
import { Briefcase, BookOpen, UserX, LineChart, Cpu, Sparkles, Newspaper, ShieldOff, Loader2 } from 'lucide-react';

const WhyYouVote = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    status: '',
    priority: '',
    followsNews: null
  });
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSelection = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTimeout(() => {
      if (step < 3) setStep(step + 1);
    }, 300);
  };

  const handleGenerate = async (followsNews) => {
    setFormData(prev => ({ ...prev, followsNews }));
    setIsLoading(true);
    setStep(4); // Loading & Result step
    try {
      const data = await generateWhyYouVoteMessage(formData.status, formData.priority, followsNews);
      setResult(data.message);
    } catch (error) {
      setResult("Oops, something went wrong while connecting to our AI. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setResult('');
    setFormData({ status: '', priority: '', followsNews: null });
  };

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 space-y-4">
          <h2
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Why Should <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">YOU</span> Vote?
          </h2>
          <p
            className="text-lg text-slate-400"
          >
            Let our AI analyze your unique situation and tell you exactly why your single vote changes everything.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl min-h-[400px] flex flex-col justify-center relative overflow-hidden">
          
          {/* Progress Indicator */}
          {step < 4 && (
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          )}

          <>
            
            {step === 1 && (
              <div 
                key="step1"
                className="space-y-8"
              >
                <h3 className="text-2xl text-white font-bold text-center">Which best describes your current status?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: 'Student', icon: <BookOpen className="w-8 h-8" /> },
                    { id: 'Working Professional', icon: <Briefcase className="w-8 h-8" /> },
                    { id: 'Unemployed / Looking', icon: <UserX className="w-8 h-8" /> },
                  ].map(item => (
                    <button 
                      key={item.id}
                      onClick={() => handleSelection('status', item.id)}
                      className={`flex flex-col items-center gap-4 p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                        formData.status === item.id 
                          ? 'border-purple-500 bg-purple-500/20' 
                          : 'border-white/10 bg-white/5 hover:border-purple-500/50 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-purple-400">{item.icon}</div>
                      <span className="text-white font-medium">{item.id}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div 
                key="step2"
                className="space-y-8"
              >
                <h3 className="text-2xl text-white font-bold text-center">What is your top priority right now?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: 'Jobs & Economy', icon: <LineChart className="w-8 h-8" /> },
                    { id: 'Education System', icon: <BookOpen className="w-8 h-8" /> },
                    { id: 'Tech & Infrastructure', icon: <Cpu className="w-8 h-8" /> },
                  ].map(item => (
                    <button 
                      key={item.id}
                      onClick={() => handleSelection('priority', item.id)}
                      className={`flex flex-col items-center gap-4 p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                        formData.priority === item.id 
                          ? 'border-pink-500 bg-pink-500/20' 
                          : 'border-white/10 bg-white/5 hover:border-pink-500/50 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-pink-400">{item.icon}</div>
                      <span className="text-white font-medium text-center">{item.id}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div 
                key="step3"
                className="space-y-8"
              >
                <h3 className="text-2xl text-white font-bold text-center">Do you actively follow the news/politics?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
                  <button 
                    onClick={() => handleGenerate(true)}
                    className="flex flex-col items-center gap-4 p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300 hover:-translate-y-1"
                  >
                    <Newspaper className="w-8 h-8 text-blue-400" />
                    <span className="text-white font-medium">Yes, I stay updated</span>
                  </button>
                  <button 
                    onClick={() => handleGenerate(false)}
                    className="flex flex-col items-center gap-4 p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-slate-500/50 hover:bg-slate-500/10 transition-all duration-300 hover:-translate-y-1"
                  >
                    <ShieldOff className="w-8 h-8 text-slate-400" />
                    <span className="text-white font-medium text-center">No, not really</span>
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div 
                key="step4"
                className="flex flex-col items-center text-center space-y-6"
              >
                {isLoading ? (
                  <div className="flex flex-col items-center gap-4 py-12">
                    <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
                    <h3 className="text-xl text-white font-medium animate-pulse">Our AI is analyzing your profile...</h3>
                  </div>
                ) : (
                  <>
                    <div className="p-4 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-2 border border-purple-500/30">
                      <Sparkles className="w-10 h-10 text-purple-400" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">Here is why YOU matter:</h3>
                    <div className="bg-slate-900/50 p-6 md:p-8 rounded-2xl border border-white/10 max-w-3xl">
                      <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-medium">
                        "{result}"
                      </p>
                    </div>
                    <button 
                      onClick={resetForm}
                      className="mt-6 text-purple-400 hover:text-purple-300 underline underline-offset-4 transition-colors"
                    >
                      Try another profile
                    </button>
                  </>
                )}
              </div>
            )}
          </>

        </div>
      </div>
    </section>
  );
};

export default WhyYouVote;
