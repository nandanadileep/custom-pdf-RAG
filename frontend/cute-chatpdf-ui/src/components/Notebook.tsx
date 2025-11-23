import * as React from 'react';
import { useState } from 'react';
import { Upload, Heart } from 'lucide-react';
import axios from 'axios';
import { Send, BookOpen, Sparkles } from 'lucide-react';

interface NotebookProps {
  filename: string;
}

interface SearchResult {
  text: string;
  page?: number;
}

const Notebook: React.FC<NotebookProps> = ({ filename }) => {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<Array<{q: string, a: string}>>([]);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('query', query);
    formData.append('filename', filename);

    try {
      const res = await axios.post('http://127.0.0.1:8000/query', formData);
      const newAnswer = res.data.answer;
      setAnswer(newAnswer);
      setHistory(prev => [...prev, { q: query, a: newAnswer }]);
      setQuery('');
    } catch (err) {
      console.error(err);
      setAnswer("Oh no! Something went wrong talking to the AI 😿");
    } finally {
      setLoading(false);
    }
  };

    return (
        <div className="w-full max-w-5xl h-[75vh] flex items-center justify-center p-4 z-10 pb-20"> {/* pb-20 makes room for animals */}
        
        {/* The Notebook itself */}
        <div className="flex w-full h-full bg-white rounded-3xl shadow-[0_20px_50px_rgba(236,72,153,0.3)] overflow-hidden border-4 border-pink-100">
            
            {/* Left Sidebar (Darker Pink) */}
            <div className="w-1/3 bg-pink-50 border-r-2 border-pink-100 flex flex-col p-6 overflow-y-auto">
            <div className="bg-white p-4 rounded-2xl shadow-sm mb-6">
                <h2 className="text-xl font-bold text-pink-500 mb-1">📄 File Info</h2>
                <p className="text-gray-500 text-sm truncate">{filename}.pdf</p>
            </div>
            
            <h3 className="font-bold text-gray-400 uppercase text-xs tracking-wider mb-4">Chat History</h3>
            <div className="space-y-3">
                {/* History Items */}
                {history.map((h, i) => (
                <div key={i} className="bg-white p-3 rounded-xl text-xs shadow-sm opacity-80">
                    <span className="font-bold text-pink-400">Q:</span> {h.q}
                </div>
                ))}
            </div>
            </div>

            {/* Right Content (The Chat) */}
            <div className="flex-1 flex flex-col bg-[#fffdf5] relative">
            {/* Notebook lines background */}
            <div className="absolute inset-0 notebook-lines pointer-events-none opacity-50"></div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 relative z-10">
                {/* If answer exists, show it in a bubble */}
                {answer && (
                    <div className="animate-fade-in-up">
                    <div className="bg-white p-6 rounded-2xl rounded-tl-none shadow-md border-2 border-pink-100 inline-block max-w-full">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">🐰</span>
                            <span className="font-bold text-pink-500">Answer:</span>
                        </div>
                        <p className="leading-relaxed text-gray-700">{answer}</p>
                    </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-6 bg-white/80 backdrop-blur-sm border-t border-pink-100 relative z-20">
                <form onSubmit={handleAsk} className="flex gap-2">
                <input
                    className="flex-1 bg-gray-50 border-2 border-pink-100 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-300 transition-colors"
                    placeholder="Ask your cute PDF a question..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="bg-pink-400 hover:bg-pink-500 text-white px-6 rounded-xl font-bold shadow-lg shadow-pink-200 transition-transform active:scale-95">
                    Ask!
                </button>
                </form>
            </div>
            </div>
        </div>
        </div>
);
}