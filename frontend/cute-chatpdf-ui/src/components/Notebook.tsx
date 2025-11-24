import { useState } from 'react';
import { Send, Sparkles, FileText, MessageSquare } from 'lucide-react';

// Use relative URL so it works in both dev and production
const API_URL = '';

const ImprovedNotebook = ({ filename }: { filename: string }) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Array<{type: 'user' | 'ai', text: string}>>([]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;

    const userMessage = query;
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setQuery('');
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('query', userMessage);
      formData.append('filename', filename);

      const res = await fetch(`${API_URL}/api/query`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      
      setMessages(prev => [...prev, { type: 'ai', text: data.answer }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { type: 'ai', text: "Sorry, something went wrong! 😿" }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  return (
    <div className="w-full max-w-6xl h-[85vh] mx-auto p-6">
      <div className="flex h-full bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl shadow-2xl overflow-hidden border-4 border-white/50">
        
        {/* Sidebar */}
        <div className="w-80 bg-white/80 backdrop-blur-xl border-r-2 border-pink-100 flex flex-col p-6">
          <div className="bg-gradient-to-r from-pink-400 to-purple-400 p-5 rounded-2xl shadow-lg mb-6">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-6 h-6 text-white" />
              <h2 className="text-xl font-bold text-white">Current PDF</h2>
            </div>
            <p className="text-white/90 text-sm font-medium truncate bg-white/20 px-3 py-2 rounded-lg mt-2">
              {filename}.pdf
            </p>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <h3 className="font-bold text-gray-600 uppercase text-xs tracking-wider mb-4 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Recent Questions
            </h3>
            <div className="space-y-3">
              {messages.filter(m => m.type === 'user').slice(-5).reverse().map((msg, i) => (
                <div key={i} className="bg-gradient-to-r from-pink-100 to-purple-100 p-3 rounded-xl text-sm shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <p className="text-gray-700 line-clamp-2">{msg.text}</p>
                </div>
              ))}
              {messages.filter(m => m.type === 'user').length === 0 && (
                <p className="text-gray-400 text-sm italic">No questions yet...</p>
              )}
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
                <Sparkles className="w-16 h-16 text-pink-300 mb-4" />
                <p className="text-gray-400 text-lg font-medium">Ask me anything about your PDF!</p>
                <p className="text-gray-300 text-sm mt-2">I'll help you understand the content 🐰</p>
              </div>
            )}
            
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-2xl ${msg.type === 'user' 
                  ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-2xl rounded-tr-sm' 
                  : 'bg-white text-gray-800 rounded-2xl rounded-tl-sm shadow-lg border-2 border-pink-100'
                } p-5 transform transition-all hover:scale-[1.02]`}>
                  {msg.type === 'ai' && (
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-pink-100">
                      <span className="text-2xl">🐰</span>
                      <span className="font-bold text-pink-500">AI Assistant</span>
                    </div>
                  )}
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 rounded-2xl rounded-tl-sm shadow-lg border-2 border-pink-100 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                    </div>
                    <span className="text-sm text-gray-500">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white/90 backdrop-blur-xl border-t-2 border-pink-100">
            <div className="flex gap-3">
              <input
                className="flex-1 bg-white border-2 border-pink-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all text-gray-700 placeholder-gray-400 shadow-sm"
                placeholder="Ask anything about your PDF..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
              />
              <button 
                onClick={handleAsk}
                disabled={loading || !query.trim()}
                className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white p-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 px-8"
              >
                <Send className="w-5 h-5" />
                <span>Ask</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImprovedNotebook;