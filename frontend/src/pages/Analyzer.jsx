import PersonalityAnalyzer from '../components/PersonalityAnalyzer';

const Analyzer = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 min-h-[calc(100vh-80px)]">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-500 mb-4">
          Voting Personality Quiz
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Answer a few questions to understand your core values and how they align with current political issues.
        </p>
      </div>
      <PersonalityAnalyzer />
    </div>
  );
};

export default Analyzer;
