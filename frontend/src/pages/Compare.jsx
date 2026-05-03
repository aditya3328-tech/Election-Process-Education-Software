import CandidateCompare from '../components/CandidateCompare';

const Compare = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 min-h-[calc(100vh-80px)]">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
          Candidate Comparison
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Evaluate candidate policies side-by-side to make an informed decision on election day.
        </p>
      </div>
      <CandidateCompare />
    </div>
  );
};

export default Compare;
