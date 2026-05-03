import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlus, 
  Search, 
  Users, 
  MapPin, 
  CheckCircle, 
  ChevronDown, 
  Sparkles, 
  Loader2,
  Check
} from 'lucide-react';
import { chatWithElectionAssistant } from '../services/geminiService';

const votingSteps = [
  {
    id: 1,
    title: 'Register as voter',
    icon: <UserPlus className="w-6 h-6" />,
    description: 'The first step is to get registered. Ensure you have your Form 6 filled.',
    details: 'You can register online via the Voter Helpline App or voters.eci.gov.in. You need age proof and address proof (like Aadhaar or electricity bill).',
    query: 'Explain how to register as a new voter in India step by step.'
  },
  {
    id: 2,
    title: 'Check voter list',
    icon: <Search className="w-6 h-6" />,
    description: 'Confirm your name exists in the electoral roll of your area.',
    details: 'Visit the electoral search portal. You can search by your EPIC number or by your details (name, DOB, etc.). Being registered is not enough; your name must be in the list.',
    query: 'How can I check if my name is in the voter list/electoral roll?'
  },
  {
    id: 3,
    title: 'Know candidates',
    icon: <Users className="w-6 h-6" />,
    description: 'Research the people running for office in your constituency.',
    details: 'Download the KYC (Know Your Candidate) app. Check their educational background, criminal records (if any), and assets listed in their affidavits.',
    query: 'What is the best way to research political candidates and their backgrounds?'
  },
  {
    id: 4,
    title: 'Visit polling booth',
    icon: <MapPin className="w-6 h-6" />,
    description: 'Find your designated booth and visit during polling hours.',
    details: 'Polling usually happens from 7 AM to 6 PM. Carry your Voter ID or any other govt-approved photo ID like Aadhaar or PAN card.',
    query: 'What documents should I carry to the polling booth and how to find my booth?'
  },
  {
    id: 5,
    title: 'Cast vote',
    icon: <CheckCircle className="w-6 h-6" />,
    description: 'Verify your identity and cast your vote on the EVM.',
    details: 'The polling officer will check your ID and mark your finger. You then press the button next to your candidate on the EVM. Wait for the VVPAT beep.',
    query: 'Explain the process inside the polling booth and how to use the EVM machine.'
  }
];

const VotingGuide = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [aiResponses, setAiResponses] = useState({});
  const [loadingId, setLoadingId] = useState(null);

  const toggleStep = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const toggleComplete = (e, id) => {
    e.stopPropagation();
    setCompletedSteps(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const fetchAiGuide = async (e, step) => {
    e.stopPropagation();
    if (aiResponses[step.id]) return;
    
    setLoadingId(step.id);
    try {
      const response = await chatWithElectionAssistant(step.query, [], 'en');
      setAiResponses(prev => ({ ...prev, [step.id]: response.reply }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  const progress = (completedSteps.length / votingSteps.length) * 100;

  return (
    <section className="py-24 relative overflow-hidden bg-slate-950">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-6"
          >
            Step-by-Step <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Voting Guide</span>
          </motion.h2>
          <p className="text-slate-400 text-lg mb-10">Your path to becoming an active citizen, simplified.</p>

          {/* Progress Bar */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-xl mb-12">
            <div className="flex justify-between items-center mb-3">
              <span className="text-white font-medium">Readiness Progress</span>
              <span className="text-blue-400 font-bold">{Math.round(progress)}%</span>
            </div>
            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {votingSteps.map((step, index) => {
            const isExpanded = expandedId === step.id;
            const isCompleted = completedSteps.includes(step.id);

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`group cursor-pointer rounded-2xl border transition-all duration-300 ${
                  isExpanded 
                    ? 'bg-white/10 border-blue-500/50 shadow-2xl shadow-blue-500/10' 
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                } backdrop-blur-xl`}
                onClick={() => toggleStep(step.id)}
              >
                <div className="p-5 md:p-6 flex items-center gap-5">
                  {/* Step Number */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 transition-colors ${
                    isCompleted ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {isCompleted ? <Check className="w-5 h-5" /> : step.id}
                  </div>

                  {/* Icon & Content */}
                  <div className={`p-3 rounded-xl flex-shrink-0 transition-colors ${
                    isExpanded ? 'bg-blue-500 text-white' : 'bg-white/5 text-blue-400'
                  }`}>
                    {step.icon}
                  </div>

                  <div className="flex-1">
                    <h3 className={`font-bold text-lg transition-colors ${isExpanded ? 'text-white' : 'text-slate-200'}`}>
                      {step.title}
                    </h3>
                    <p className="text-slate-400 text-sm line-clamp-1">{step.description}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => toggleComplete(e, step.id)}
                      className={`p-2 rounded-lg border transition-all ${
                        isCompleted 
                          ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' 
                          : 'bg-white/5 border-white/10 text-slate-500 hover:text-white hover:border-white/30'
                      }`}
                      title={isCompleted ? "Mark as Undone" : "Mark as Done"}
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                    <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-white/10">
                        <p className="text-slate-300 leading-relaxed mb-6">
                          {step.details}
                        </p>

                        <div className="flex flex-wrap gap-4">
                          <button
                            onClick={(e) => fetchAiGuide(e, step)}
                            disabled={loadingId === step.id}
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50"
                          >
                            {loadingId === step.id ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Analyzing...
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-4 h-4" />
                                Guide Me
                              </>
                            )}
                          </button>
                        </div>

                        {/* AI Insight Box */}
                        <AnimatePresence>
                          {aiResponses[step.id] && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-6 p-5 rounded-2xl bg-slate-900/80 border border-purple-500/30 relative overflow-hidden group"
                            >
                              <div className="absolute top-0 right-0 p-3 opacity-20">
                                <Sparkles className="w-10 h-10 text-purple-400" />
                              </div>
                              <h4 className="text-purple-400 font-bold text-sm mb-3 flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                AI Insight
                              </h4>
                              <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                                {aiResponses[step.id]}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VotingGuide;
