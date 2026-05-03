import { Megaphone, UserCheck, Shield, Zap, Vote, Globe, Users } from 'lucide-react';
import manThinkingImage from '../assets/manThinking.png';

const features = [
  {
    icon: <Megaphone className="w-6 h-6 text-purple-400" />,
    title: "Your Voice Counts",
    description: "Every single vote contributes directly to major national and local decisions.",
    glowColor: "group-hover:shadow-purple-500/20",
    borderColor: "group-hover:border-purple-500/50"
  },
  {
    icon: <UserCheck className="w-6 h-6 text-blue-400" />,
    title: "Choose Better Leaders",
    description: "Select candidates who truly align with your core values and vision.",
    glowColor: "group-hover:shadow-blue-500/20",
    borderColor: "group-hover:border-blue-500/50"
  },
  {
    icon: <Shield className="w-6 h-6 text-teal-400" />,
    title: "Strengthen Democracy",
    description: "Voting ensures fair representation and protects our democratic institutions.",
    glowColor: "group-hover:shadow-teal-500/20",
    borderColor: "group-hover:border-teal-500/50"
  },
  {
    icon: <Zap className="w-6 h-6 text-amber-400" />,
    title: "Create Impact",
    description: "Small consistent actions at the ballot box lead to massive societal change.",
    glowColor: "group-hover:shadow-amber-500/20",
    borderColor: "group-hover:border-amber-500/50"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const WhyVotingMatters = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-background to-background -z-10"></div>
      
      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.03] -z-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2
            className="text-3xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Why Your <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">Vote</span> Matters
          </h2>
          <p
            className="text-lg text-slate-400 max-w-2xl mx-auto"
          >
            Your vote shapes the future of your country. Make informed decisions to drive the change you want to see in the world.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Image Illustration */}
          <div
            className="relative flex justify-center items-center"
          >
            {/* Glowing Backdrop for the image */}
            <div className="absolute w-[80%] h-[80%] bg-gradient-to-r from-purple-600/30 to-red-500/20 rounded-full blur-[80px] -z-10"></div>
            
            <img 
              src={manThinkingImage} 
              alt="Person thinking about voting" 
              className="w-full max-w-md object-contain drop-shadow-2xl z-10 transition-transform duration-500 hover:-translate-y-2 hover:scale-105"
            />
          </div>

          {/* Right Column: Feature Cards */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6"
          >
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`group relative bg-white/[0.02] backdrop-blur-md border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800/50 ${feature.glowColor} ${feature.borderColor}`}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-slate-900/80 flex items-center justify-center mb-4 border border-slate-700 group-hover:border-slate-500 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
      
      {/* Bottom Divider */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
    </section>
  );
};

export default WhyVotingMatters;
