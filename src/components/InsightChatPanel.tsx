import React, { useState, useRef, useEffect } from 'react';

interface InsightChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const promptSuggestions = [
  'How can I optimize my ROAS?',
  'What campaigns are underperforming?',
  'Show me budget allocation recommendations',
  'Which ad sets have the highest CTR?',
  'Analyze my CPA trends',
  'Recommend budget adjustments',
  'Compare performance across platforms',
  'Identify top-performing creatives',
  'Suggest campaign scaling opportunities',
  'What are my conversion rate trends?',
  'Analyze audience performance',
  'Recommend bid strategy changes',
  'Show me cost efficiency insights',
];

export const InsightChatPanel: React.FC<InsightChatPanelProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'current' | 'history'>('current');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [suggestions] = useState(() => {
    // Randomly select 3 prompts
    const shuffled = [...promptSuggestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!isOpen) return null;

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const newMessage: Message = { id: Date.now().toString(), role: 'user', content: inputValue };
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    
    // Simulate assistant response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I can help you optimize your advertising workflows. What would you like to know?',
      }]);
    }, 500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-2xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('current')}
            className={`px-3 py-1 text-sm rounded ${
              activeTab === 'current' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Current
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1 text-sm rounded ${
              activeTab === 'history' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            History
          </button>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="space-y-3">
            <div className="text-center text-gray-500 mt-8">
              <p className="text-sm mb-4">Start a conversation to get insights about your workflows</p>
            </div>
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 border border-gray-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        ) : (
          <>
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    msg.role === 'user'
                      ? 'bg-purple-primary text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder="Ask a question..."
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-primary focus:border-transparent"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-purple-primary text-white rounded-lg hover:bg-purple-secondary"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
