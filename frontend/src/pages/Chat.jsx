import ChatBox from '../components/ChatBox';

const Chat = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 min-h-[calc(100vh-80px)]">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
          AI Election Assistant
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Have questions about voting? Ask our AI assistant anything related to the elections.
        </p>
      </div>
      <ChatBox />
    </div>
  );
};

export default Chat;
