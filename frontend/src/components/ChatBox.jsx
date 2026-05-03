import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { chatWithAssistant } from '../services/geminiService';

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your VoteWise AI Assistant. Ask me anything about the upcoming elections, candidates, or voting procedures.", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.sender === 'user' ? 'user' : 'model', parts: m.text }));
      const response = await chatWithAssistant(userMessage, history);
      setMessages(prev => [...prev, { text: response.reply, sender: 'ai' }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: "Sorry, I'm experiencing technical difficulties.", sender: 'ai' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card flex flex-col h-[600px] shadow-2xl relative overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 custom-scrollbar">
        {messages.map((msg, index) => (
          <div
            key={index} 
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                <Bot className="w-5 h-5 text-blue-400" />
              </div>
            )}
            <div 
              className={`max-w-[80%] md:max-w-[70%] p-4 text-[15px] leading-relaxed shadow-md ${
                msg.sender === 'user' 
                  ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm' 
                  : 'bg-slate-800 border border-slate-700 text-slate-100 rounded-2xl rounded-tl-sm'
              }`}
            >
              {msg.text}
            </div>
            {msg.sender === 'user' && (
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-md">
                <User className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
              <Bot className="w-5 h-5 text-blue-400" />
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-tl-sm p-4 flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
              <span className="text-slate-400 text-sm">AI is thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 bg-slate-900/50 backdrop-blur-md border-t border-slate-700/50">
        <form onSubmit={handleSend} className="flex gap-2">
          <input 
            type="text" 
            className="flex-1 bg-slate-800/80 border border-slate-700 text-white rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-400" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed" 
            disabled={isLoading || !input.trim()}
          >
            <Send className="w-5 h-5 ml-[-2px]" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
