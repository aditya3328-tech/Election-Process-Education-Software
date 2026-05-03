import React, { useState } from 'react';
import { Plus, Minus, Bot, Send, Loader2 } from 'lucide-react';
import { chatWithAssistant } from '../services/geminiService';

const faqs = [
  {
    question: "Why is voting important?",
    answer: "Voting is the foundation of a democratic society. It allows citizens to have a direct say in who leads their country and what policies are implemented. Your vote is your voice on issues that affect your daily life, from taxes and healthcare to education and infrastructure."
  },
  {
    question: "How does my vote impact results?",
    answer: "Elections are often decided by narrow margins. When you vote, you join a collective mandate. Your single vote, combined with others who share your values, determines the mathematical outcome of elections and dictates the direction of local and national leadership."
  },
  {
    question: "Can one vote really make a difference?",
    answer: "Absolutely. History is full of elections decided by incredibly tight margins—sometimes by a single vote. Furthermore, high voter turnout in specific demographics signals to politicians what issues they must prioritize to stay in office."
  },
  {
    question: "What if I don't vote?",
    answer: "If you don't vote, you are essentially letting others decide your future. Politicians tend to ignore the needs of non-voting demographics. Not voting surrenders your power and leaves critical decisions about your community to people who may not share your interests."
  },
  {
    question: "When am I eligible to vote?",
    answer: "In most democracies, you become eligible to vote when you turn 18 years old. You must also be a legally recognized citizen of the country and be officially registered to vote in your specific state or electoral district."
  },
  {
    question: "How and where do I register to vote?",
    answer: "Voter registration processes vary by location, but most places allow you to register online via official government portals, by mail, or in person at local electoral offices or transportation departments (like the DMV in the US)."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  
  // Custom AI Question state
  const [showAskAI, setShowAskAI] = useState(false);
  const [customQuestion, setCustomQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleAskAI = async (e) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;

    setIsLoading(true);
    setAiAnswer('');
    
    try {
      const response = await chatWithAssistant(customQuestion);
      setAiAnswer(response.reply);
    } catch (error) {
      setAiAnswer("Sorry, our AI is currently taking a nap. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Frequently Asked <span className="text-blue-400">Questions</span>
          </h2>
          <p
            className="text-lg text-slate-400"
          >
            Everything you need to know about the power of your vote.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4 mb-12">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-white/10"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="text-lg font-medium text-slate-200">{faq.question}</span>
                <div className={`p-2 rounded-full transition-colors ${openIndex === index ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-400'}`}>
                  {openIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
              </button>
              
              <>
                {openIndex === index && (
                  <div
                  >
                    <div className="px-6 pb-5 text-slate-400 leading-relaxed border-t border-white/5 pt-4">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </>
            </div>
          ))}
        </div>

        {/* Ask AI Section */}
        <div
          className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 relative overflow-hidden"
        >
          {/* Glowing background blob inside card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[80px] opacity-20 -z-10"></div>

          {!showAskAI ? (
            <div className="text-center">
              <Bot className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Still have questions?</h3>
              <p className="text-slate-300 mb-6">Our AI assistant is ready to answer any specific queries you have about voting.</p>
              <button 
                onClick={() => setShowAskAI(true)}
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-medium shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all duration-300 hover:-translate-y-1"
              >
                Ask AI Now
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <Bot className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-bold text-white">Ask VoteWise AI</h3>
              </div>
              
              <form onSubmit={handleAskAI} className="relative">
                <input 
                  type="text" 
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  placeholder="e.g., Do I need ID to vote?"
                  className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-4 pr-14 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-500"
                />
                <button 
                  type="submit"
                  disabled={isLoading || !customQuestion.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </button>
              </form>

              <>
                {aiAnswer && (
                  <div
                    className="bg-slate-900/80 border border-slate-700 p-6 rounded-xl mt-4"
                  >
                    <p className="text-slate-300 leading-relaxed font-medium">
                      {aiAnswer}
                    </p>
                  </div>
                )}
              </>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
