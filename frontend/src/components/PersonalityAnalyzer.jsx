import React, { useState } from 'react';
import { Brain, CheckCircle2, ChevronRight, RefreshCw, Sparkles, TrendingUp, AlertCircle, Compass } from 'lucide-react';

const questions = [
  {
    question: "When evaluating a candidate, what matters most to you?",
    options: [
      { id: 'A', text: "Detailed policy proposals and past voting records." },
      { id: 'B', text: "A balanced mix of good policies and strong leadership." },
      { id: 'C', text: "Their passion and ability to inspire hope and anger." },
      { id: 'D', text: "Who my friends, family, or favorite influencers support." }
    ]
  },
  {
    question: "How do you consume political news?",
    options: [
      { id: 'A', text: "I read multiple verified sources and fact-check claims." },
      { id: 'B', text: "I watch reliable news channels and read daily articles." },
      { id: 'C', text: "I follow shocking headlines that grab my emotional attention." },
      { id: 'D', text: "I mostly see what trends on my social media feeds." }
    ]
  },
  {
    question: "A candidate you support is involved in a minor scandal. What do you do?",
    options: [
      { id: 'A', text: "Wait for objective facts and legal investigations before judging." },
      { id: 'B', text: "Feel disappointed but weigh it against their overall policies." },
      { id: 'C', text: "Feel personally betrayed and immediately withdraw my support." },
      { id: 'D', text: "Wait to see what public opinion or my social circle thinks." }
    ]
  },
  {
    question: "When discussing politics with someone who strongly disagrees:",
    options: [
      { id: 'A', text: "I try to debate using statistics and historical data." },
      { id: 'B', text: "I listen to their perspective and try to find common ground." },
      { id: 'C', text: "I get defensive because my beliefs are tied to my core values." },
      { id: 'D', text: "I avoid the argument or just agree to keep the peace." }
    ]
  },
  {
    question: "How do you decide on local ballot measures or propositions?",
    options: [
      { id: 'A', text: "I read the official voter guide and analyze economic impacts." },
      { id: 'B', text: "I skim the summary and make a reasonable educated guess." },
      { id: 'C', text: "I vote based on how the title of the bill makes me feel." },
      { id: 'D', text: "I vote based on the TV commercials I saw about it." }
    ]
  },
  {
    question: "Your reaction to negative attack ads is:",
    options: [
      { id: 'A', text: "I ignore them entirely and look up actual voting records." },
      { id: 'B', text: "I take them with a grain of salt but verify the claims." },
      { id: 'C', text: "They make me extremely angry at the opposing candidate." },
      { id: 'D', text: "They usually convince me because they are very persuasive." }
    ]
  },
  {
    question: "Ultimately, why do you vote?",
    options: [
      { id: 'A', text: "It is a logical civic duty necessary to maintain society." },
      { id: 'B', text: "It's important to have my voice heard and participate." },
      { id: 'C', text: "I want to fiercely protect my community from bad policies." },
      { id: 'D', text: "Everyone else is doing it and I feel pressured." }
    ]
  }
];

const resultsData = {
  A: {
    type: "The Logical Analyst",
    icon: <Brain className="w-12 h-12 text-blue-400" />,
    color: "from-blue-500 to-cyan-500",
    description: "You rely purely on facts, data, and policy. You don't let emotions cloud your judgment, and you thoroughly research candidates before making a decision.",
    improvement: "While logic is crucial, remember that politics also involves human emotion and empathy. Try to understand the emotional drivers behind why people support certain policies."
  },
  B: {
    type: "The Balanced Citizen",
    icon: <Compass className="w-12 h-12 text-emerald-400" />,
    color: "from-emerald-500 to-teal-500",
    description: "You weigh both logic and human elements to make sound decisions. You are open-minded, pragmatic, and seek to find common ground in a polarized world.",
    improvement: "Your balanced approach is excellent. Just ensure that your desire for compromise doesn't prevent you from taking a strong stance on critical moral issues."
  },
  C: {
    type: "The Passionate Advocate",
    icon: <Sparkles className="w-12 h-12 text-pink-400" />,
    color: "from-pink-500 to-rose-500",
    description: "You vote with your heart. You deeply care about moral outcomes, human rights, and protecting your community. Your passion drives your political engagement.",
    improvement: "Passion is a great motivator, but beware of emotional manipulation. Make sure to fact-check emotional appeals and look at the hard data before deciding."
  },
  D: {
    type: "The Social Voter",
    icon: <TrendingUp className="w-12 h-12 text-purple-400" />,
    color: "from-purple-500 to-indigo-500",
    description: "You are heavily influenced by your environment, peers, and social media algorithms. You tend to follow the crowd rather than diving deep into policy yourself.",
    improvement: "It's time to step out of the echo chamber. Try doing independent research on verified platforms to form your own conclusions, rather than relying on influencers."
  }
};

const PersonalityAnalyzer = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleNext = () => {
    if (!selectedOption) return;
    
    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const getResult = () => {
    const counts = { A: 0, B: 0, C: 0, D: 0 };
    answers.forEach(ans => {
      if (counts[ans] !== undefined) counts[ans]++;
    });
    
    // Find the highest count
    let maxKey = 'B'; // Default to balanced
    let maxVal = -1;
    for (const [key, value] of Object.entries(counts)) {
      if (value > maxVal) {
        maxVal = value;
        maxKey = key;
      }
    }
    return resultsData[maxKey];
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setSelectedOption(null);
    setShowResult(false);
  };

  const progressPercentage = ((currentStep) / questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl overflow-hidden relative min-h-[500px]">
        
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>

        {!showResult ? (
          <>
            <div 
              key={currentStep}
              className="flex flex-col h-full"
            >
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-slate-400 mb-2 font-medium">
                  <span>Question {currentStep + 1} of {questions.length}</span>
                  <span>{Math.round(progressPercentage)}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div style={{ width: `${progressPercentage}%` }}
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  />
                </div>
              </div>

              {/* Question */}
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-tight">
                {questions[currentStep].question}
              </h3>

              {/* Options */}
              <div className="space-y-4 flex-grow">
                {questions[currentStep].options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedOption(option.id)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center gap-4 group ${
                      selectedOption === option.id
                        ? 'border-purple-500 bg-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.2)] transform scale-[1.02]'
                        : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      selectedOption === option.id ? 'border-purple-400' : 'border-slate-500'
                    }`}>
                      {selectedOption === option.id && <div className="w-3 h-3 bg-purple-400 rounded-full"></div>}
                    </div>
                    <span className={`text-lg font-medium transition-colors ${
                      selectedOption === option.id ? 'text-white' : 'text-slate-300 group-hover:text-white'
                    }`}>
                      {option.text}
                    </span>
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleNext}
                  disabled={!selectedOption}
                  className="bg-white text-slate-900 font-bold py-3 px-8 rounded-xl flex items-center gap-2 hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentStep === questions.length - 1 ? 'See Results' : 'Next Question'}
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div
            className="flex flex-col items-center text-center py-8"
          >
            {(() => {
              const result = getResult();
              return (
                <>
                  <div className={`p-6 rounded-3xl bg-gradient-to-br ${result.color} bg-opacity-10 mb-6 border border-white/20 shadow-2xl`}>
                    {result.icon}
                  </div>
                  
                  <h2 className={`text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r ${result.color} text-transparent bg-clip-text`}>
                    {result.type}
                  </h2>
                  
                  <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 md:p-8 max-w-2xl mb-8">
                    <h4 className="text-white font-bold text-xl mb-3 flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-6 h-6 text-green-400" />
                      Your Profile
                    </h4>
                    <p className="text-slate-300 text-lg leading-relaxed mb-6">
                      {result.description}
                    </p>
                    
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                      <h4 className="text-yellow-400 font-bold mb-2 flex items-center justify-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        Improvement Area
                      </h4>
                      <p className="text-yellow-200/80 text-sm">
                        {result.improvement}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={resetQuiz}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Retake Quiz
                  </button>
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalityAnalyzer;
