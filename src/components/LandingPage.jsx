import React from 'react';
import { Sparkles, Shield, Zap, Bug, Github, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = ({ onStart }) => {
  const features = [
    {
      icon: <Sparkles className="w-8 h-8 text-purple-400" />,
      title: "AI-generated QA tests",
      description: "Leverage advanced LLMs to generate comprehensive test cases in seconds."
    },
    {
      icon: <Bug className="w-8 h-8 text-blue-400" />,
      title: "Edge-case detection",
      description: "Automatically identify potential pitfalls and boundary conditions for your features."
    },
    {
      icon: <Shield className="w-8 h-8 text-cyan-400" />,
      title: "Security vulnerability testing",
      description: "Get smart security test cases to ensure your application is battle-hardened."
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: "Fast automated workflow",
      description: "Streamline your QA process and release higher quality software faster."
    }
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="glass-card" style={{ display: 'inline-block', padding: '0.5rem 1.5rem', borderRadius: 'var(--radius-full)', marginBottom: '2rem', fontSize: '0.875rem' }}>
              ✨ Powered by Gemini AI
            </div>
            <h1 style={{ fontSize: '4rem', lineHeight: '1.2', marginBottom: '1.5rem' }}>
              Master Your Quality with <span className="gradient-text">QAgenie AI</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
              Generate intelligent software test cases instantly using AI. From happy paths to security vulnerabilities, we've got you covered.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn-primary" onClick={onStart}>
                Get Started <ArrowRight className="w-5 h-5" />
              </button>
              <button className="btn-secondary" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
                Try Demo
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            style={{ marginTop: '4rem' }}
          >
            <div className="glass-card animate-float" style={{ maxWidth: '900px', margin: '0 auto', height: '400px', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)' }}>
               <div style={{ textAlign: 'center' }}>
                  <Zap className="w-16 h-16 text-purple-400" style={{ margin: '0 auto 1rem' }} />
                  <p style={{ color: 'var(--text-secondary)' }}>AI Workbench Preview</p>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section" style={{ backgroundColor: 'rgba(255,255,255,0.01)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Powerful Features</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Everything you need to automate your QA workflow</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="glass-card"
                style={{ padding: '2rem' }}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div style={{ marginBottom: '1.5rem' }}>{feature.icon}</div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{feature.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--glass-border)', padding: '4rem 0 2rem' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
            <div>
              <h2 className="gradient-text" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>QAgenie AI</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>© 2026 QAgenie AI. Project for Hackathon.</p>
            </div>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>About</a>
              <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Contact</a>
              <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Github className="w-5 h-5" /> GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
