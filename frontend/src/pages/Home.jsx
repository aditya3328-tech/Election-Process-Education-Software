import React from 'react';
import HeroSection from '../components/HeroSection';
import WhyVotingMatters from '../components/WhyVotingMatters';
import VoteImpact from '../components/VoteImpact';
import WhyYouVote from '../components/WhyYouVote';
import FAQ from '../components/FAQ';
import CivicTip from '../components/CivicTip';
import SmartAction from '../components/SmartAction';
import BiasDetector from '../components/BiasDetector';
import FakeNewsChecker from '../components/FakeNewsChecker';
import VotingReport from '../components/VotingReport';

const Home = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617] overflow-hidden w-full">
      {/* Global Daily Civic Tip Modal */}
      <CivicTip />

      {/* Hero Section */}
      <HeroSection />

      {/* Why Voting Matters Section */}
      <WhyVotingMatters />

      {/* Vote Impact Visualizer */}
      <VoteImpact />

      {/* Personalized AI Reason to Vote */}
      <WhyYouVote />

      {/* VoteWise AI Toolkit Grid */}
      <section className="relative py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              VoteWise <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">AI Toolkit</span>
            </h2>
            <p className="text-lg text-slate-400">Powerful AI utilities designed to make you a sharper, more informed voter.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SmartAction />
            <BiasDetector />
            <FakeNewsChecker />
            <VotingReport />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />
    </div>
  );
};

export default Home;
