import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bot, UserCheck, Scale, Sparkles } from 'lucide-react';

const features = [
  {
    title: 'Ask AI',
    description: 'Get unbiased answers to your political questions from our smart AI assistant.',
    icon: <Bot className="w-8 h-8 text-blue-400" />,
    link: '/chat',
    glowColor: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]'
  },
  {
    title: 'Check Readiness',
    description: 'Find out how prepared you are for the upcoming elections with a quick quiz.',
    icon: <UserCheck className="w-8 h-8 text-green-400" />,
    link: '/analyzer',
    glowColor: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]'
  },
  {
    title: 'Compare Candidates',
    description: 'Side-by-side comparison of candidates, their policies, and track records.',
    icon: <Scale className="w-8 h-8 text-purple-400" />,
    link: '/compare',
    glowColor: 'hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]'
  },
  {
    title: 'Analyze Style',
    description: 'Discover your political leaning based on a comprehensive personality test.',
    icon: <Sparkles className="w-8 h-8 text-pink-400" />,
    link: '/analyzer',
    glowColor: 'hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]'
  },
];

const HeroSection = () => {
  return (
    <div className="relative min-h-[90vh] flex flex-col justify-center overflow-visible py-20">
      
      {/* 🌌 Premium Background Globs (Static for better performance) */}
      <div className="absolute w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px] top-0 left-0 -z-10 mix-blend-screen" />
      <div className="absolute w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[120px] bottom-0 right-0 -z-10 mix-blend-screen" />

      {/* Main Content */}
      <div className="relative z-10 text-center mb-20 space-y-8">
        {/* 🔥 Exploded Hero Heading */}
        <h1
          className="text-6xl md:text-8xl font-black text-center tracking-tight"
        >
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text drop-shadow-sm">
            VoteWise AI
          </span>
        </h1>
        
        <p
          className="text-xl md:text-3xl text-slate-300 max-w-3xl mx-auto font-medium"
        >
          Your smart companion for making informed and confident voting decisions.
        </p>
      </div>

      <div
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto w-full px-4"
      >
        {features.map((feature, index) => (
          <Link to={feature.link} key={index} className="block group perspective-1000">
            {/* 💎 Glass UI + Glow Cards (Optimized animations) */}
            <div
              className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 transform hover:-translate-y-3 hover:scale-105 transition-all duration-300 ${feature.glowColor}`}
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 shadow-lg shadow-black/20 group-hover:bg-white/10 transition-colors">
                  {feature.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-3 tracking-wide">
                    {feature.title}
                  </h2>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
