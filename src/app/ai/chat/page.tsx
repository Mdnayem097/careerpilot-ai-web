'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { fetchApi } from '../../../lib/api';
import { ChatConversation, ChatMessage } from '../../../types';
import { Bot, Send, User, Sparkles, MessageSquare, History, RefreshCw, Cpu } from 'lucide-react';

export default function ChatAssistantPage() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadConversations = async () => {
    try {
      const res = await fetchApi<{ conversations: ChatConversation[] }>('/ai/chat/conversations');
      setConversations(res.conversations);
      if (res.conversations.length > 0 && !activeConvId) {
        setActiveConvId(res.conversations[0]._id);
        setMessages(res.conversations[0].messages);
      }
    } catch (err) {
      console.error('Error loading conversations:', err);
    }
  };

  useEffect(() => {
    if (user) {
      loadConversations();
    }
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const selectConversation = (conv: ChatConversation) => {
    setActiveConvId(conv._id);
    setMessages(conv.messages);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    const userMsg = inputMessage;
    setInputMessage('');

    // Optimistic user update
    const newMsgObj: ChatMessage = {
      sender: 'user',
      content: userMsg,
      timestamp: new Date().toISOString()
    };
    setMessages((prev) => [...prev, newMsgObj]);
    setLoading(true);

    try {
      const res = await fetchApi<{ conversation: ChatConversation }>('/ai/chat/message', {
        method: 'POST',
        body: JSON.stringify({
          conversationId: activeConvId,
          message: userMsg
        })
      });

      setActiveConvId(res.conversation._id);
      setMessages(res.conversation.messages);
      loadConversations();
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-4 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Bot className="w-6 h-6 text-cyan" />
            <span>AI Career Chat Assistant</span>
          </h1>
          <p className="text-xs text-slate-400">Contextual mentorship with persistent chat history in MongoDB</p>
        </div>
        
        <button
          onClick={() => { setActiveConvId(null); setMessages([]); }}
          className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-medium text-slate-300 hover:text-white transition-colors flex items-center space-x-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan" />
          <span>New Session</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[600px]">
        
        {/* Left Sidebar: Saved Sessions */}
        <div className="lg:col-span-4 glass-card rounded-2xl border border-border p-4 flex flex-col justify-between overflow-hidden">
          <div className="space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center space-x-1">
              <History className="w-3.5 h-3.5" />
              <span>Past Sessions ({conversations.length})</span>
            </span>

            <div className="space-y-2 overflow-y-auto max-h-[500px] pr-1">
              {conversations.map((conv) => (
                <button
                  key={conv._id}
                  onClick={() => selectConversation(conv)}
                  className={`w-full p-3 rounded-xl text-left text-xs transition-all flex items-center space-x-2.5 ${
                    activeConvId === conv._id
                      ? 'bg-cyan/10 border border-cyan/30 text-white font-semibold'
                      : 'bg-slate-900/60 border border-border/50 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 text-cyan flex-shrink-0" />
                  <div className="truncate">
                    <p className="truncate">{conv.title}</p>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {new Date(conv.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Main Chat Window */}
        <div className="lg:col-span-8 glass-card rounded-2xl border border-border flex flex-col justify-between overflow-hidden">
          
          {/* Chat Messages Log */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 text-slate-400">
                <Bot className="w-12 h-12 text-slate-500" />
                <p className="text-sm font-semibold text-white">Start a Career Strategy Conversation</p>
                <p className="text-xs max-w-xs">
                  Ask about ATS formatting, salary negotiation, mock interview preparation, or skill roadmaps.
                </p>
              </div>
            ) : (
              messages.map((msg, idx) => {
                if (msg.sender === 'system') return null;
                const isUser = msg.sender === 'user';

                return (
                  <div
                    key={idx}
                    className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        isUser ? 'bg-primary text-white' : 'bg-cyan/20 text-cyan border border-cyan/30'
                      }`}
                    >
                      {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    <div className="space-y-1 max-w-[80%]">
                      {msg.agentThinking && (
                        <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-[10px] font-mono text-cyan/80 flex items-center space-x-1">
                          <Cpu className="w-3 h-3 text-cyan" />
                          <span>{msg.agentThinking}</span>
                        </div>
                      )}

                      <div
                        className={`p-4 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                          isUser
                            ? 'bg-primary text-white rounded-tr-none'
                            : 'bg-slate-900/90 text-slate-200 border border-border rounded-tl-none'
                        }`}
                      >
                        {msg.content}
                      </div>

                      <span className="text-[10px] font-mono text-slate-500 block px-1">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSend} className="p-4 border-t border-border bg-slate-950/80 flex items-center space-x-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask your AI Career Mentor a question..."
              className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-border text-white text-xs focus:outline-none focus:border-cyan"
            />
            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="px-5 py-3 rounded-xl bg-cyan text-slate-950 font-bold text-xs hover:bg-cyan/90 transition-colors disabled:opacity-40 flex items-center space-x-1.5"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>Send</span>
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}
