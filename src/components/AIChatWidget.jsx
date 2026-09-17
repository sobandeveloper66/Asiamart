import React, { useState, useRef, useEffect } from 'react';
import { FiMessageCircle, FiX, FiSend, FiMinimize2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../data/products';

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! I'm the AsiaMart AI Assistant. How can I help you find the best of Asia today?", sender: 'ai' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMsg = { id: Date.now(), text: inputValue.trim(), sender: 'user' };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const searchTerms = inputValue.toLowerCase().split(' ').filter(t => t.length > 2);
      
      let matchedProducts = [];
      if (searchTerms.length > 0) {
        matchedProducts = MOCK_PRODUCTS.filter(product => {
          const searchableText = `${product.name} ${product.category} ${product.country} ${product.tags.join(' ')}`.toLowerCase();
          return searchTerms.some(term => searchableText.includes(term));
        }).slice(0, 3);
      }

      if (matchedProducts.length > 0) {
        setMessages(prev => [...prev, { 
          id: Date.now() + 1, 
          text: "Here are some top matches I found for you:", 
          sender: 'ai',
          products: matchedProducts 
        }]);
      } else {
        const responses = [
          "I couldn't find exactly that, but we have many other authentic products! Try searching for categories like 'Ramen', 'Snacks', or 'Tea'.",
          "I'm not finding a direct match for that in our current catalog. Is there a specific region's cuisine you prefer?",
          "AsiaMart specializes in bringing the best of Asia right to your doorstep. Have you checked out our 'Deals' section?",
          "Our premium ramen kits and spicy snacks are currently our best sellers. Would you like me to show you some?"
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        setMessages(prev => [...prev, { id: Date.now() + 1, text: randomResponse, sender: 'ai' }]);
      }
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[320px] sm:w-[380px] h-[450px] bg-brand-card border border-brand-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-brand-bg border-b border-brand-border p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center">
                  <FiMessageCircle size={16} className="text-white" />
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-brand-bg"></div>
              </div>
              <div>
                <h3 className="text-brand-primary text-sm font-bold leading-tight">AsiaMart AI</h3>
                <p className="text-brand-secondary text-[10px]">Usually replies instantly</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-brand-secondary hover:text-brand-primary transition-colors cursor-pointer p-1"
            >
              <FiMinimize2 size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none bg-brand-card-hover">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-brand-red text-white rounded-tr-sm' 
                      : 'bg-brand-card text-brand-primary border border-brand-border rounded-tl-sm'
                  }`}
                >
                  {msg.text}
                  {msg.products && msg.products.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {msg.products.map(p => (
                        <Link to={`/product/${p.id}`} key={p.id} onClick={() => setIsOpen(false)} className="block bg-brand-bg rounded-lg p-2 hover:bg-brand-card-hover transition-colors border border-brand-border">
                          <div className="flex gap-3 items-center">
                            <img src={p.images[0]} alt={p.name} className="w-12 h-12 object-cover rounded bg-brand-card" />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-brand-primary text-xs font-semibold truncate">{p.name}</h4>
                              <p className="text-brand-peach text-xs font-medium mt-0.5">₹{p.price}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-brand-card border border-brand-border rounded-2xl rounded-tl-sm px-4 py-3.5 flex gap-1.5 items-center">
                  <div className="w-1.5 h-1.5 bg-brand-secondary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 bg-brand-secondary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-brand-secondary rounded-full animate-bounce"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-3 bg-brand-bg border-t border-brand-border">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Ask me anything..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full bg-brand-card text-sm text-brand-primary placeholder-brand-secondary pl-4 pr-12 py-3 rounded-xl border border-brand-border focus:outline-none focus:border-brand-red transition-all"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="absolute right-2 text-brand-red hover:text-brand-peach disabled:text-zinc-600 p-2 transition-colors cursor-pointer"
              >
                <FiSend size={18} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative flex items-center justify-center w-14 h-14 bg-brand-red hover:bg-brand-red-hover text-white rounded-full shadow-brand-glow transition-all duration-300 cursor-pointer ${
          isOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
        }`}
      >
        <FiMessageCircle size={26} className="transition-transform group-hover:scale-110" />
        
        {/* Tooltip */}
        <div className={`absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-brand-card border border-brand-border text-brand-primary text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0 visible' : 'opacity-0 translate-x-2 invisible'
        }`}>
          Need help? Ask AI!
        </div>
      </button>

    </div>
  );
}
