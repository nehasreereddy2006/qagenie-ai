import React, { useState } from 'react';
import { ChevronLeft, Send, Trash2, Loader2, Copy, Download, FileText, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateTestCases } from '../services/gemini';
import ResultSection from './ResultSection';

const Dashboard = ({ onBack }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await generateTestCases(input);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to generate test cases. Please check your API key.');
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setInput('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="dashboard-page" style={{ minHeight: '100vh', padding: '2rem 1.5rem' }}>
      <div className="container">
        {/* Header */}
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem' }}>
          <button className="btn-secondary" onClick={onBack} style={{ padding: '0.5rem 1rem' }}>
            <ChevronLeft className="w-4 h-4" /> Back to Home
          </button>
          <div className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 700 }}>QAgenie AI</div>
        </header>

        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {/* Input Section */}
          <motion.div 
            className="glass-card" 
            style={{ padding: '2rem', marginBottom: '3rem' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Describe your Feature</h2>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your software feature, API, or workflow... (e.g. Login system with email/password and OTP verification)"
              style={{
                width: '100%',
                minHeight: '150px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-md)',
                color: 'white',
                padding: '1.5rem',
                fontSize: '1rem',
                marginBottom: '1.5rem',
                resize: 'vertical',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                className="btn-primary" 
                onClick={handleGenerate}
                disabled={loading || !input.trim()}
                style={{ flex: 1, justifyContent: 'center' }}
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                {loading ? 'Generating...' : 'Generate Test Cases'}
              </button>
              <button 
                className="btn-secondary" 
                onClick={clearAll}
                disabled={loading}
              >
                <Trash2 className="w-5 h-5" /> Clear
              </button>
            </div>
          </motion.div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ 
                  backgroundColor: 'rgba(239, 68, 68, 0.1)', 
                  border: '1px solid rgba(239, 68, 68, 0.2)', 
                  padding: '1rem', 
                  borderRadius: 'var(--radius-md)', 
                  color: '#fca5a5',
                  marginBottom: '2rem',
                  fontSize: '0.9rem'
                }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Section */}
          <AnimatePresence>
            {loading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ textAlign: 'center', padding: '4rem 0' }}
              >
                <Loader2 className="w-12 h-12 animate-spin text-purple-500" style={{ margin: '0 auto 1.5rem' }} />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>QAgenie is thinking...</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Analyzing your feature and generating comprehensive test cases.</p>
              </motion.div>
            )}

            {result && !loading && (
              <ResultSection content={result} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
