import React, { useState, useRef } from 'react';
import { Copy, Download, FileText, Check, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ResultSection = ({ content }) => {
  const [copied, setCopied] = useState(null);
  const resultRef = useRef(null);

  // Simple parser to separate sections based on markdown-ish headers
  const parseSections = (text) => {
    const sections = {
      positive: '',
      negative: '',
      edge: '',
      security: ''
    };

    // Very basic regex-based split (this can be improved)
    const lowerText = text.toLowerCase();
    
    const parts = text.split(/#{1,3}\s*(?=\d|\w)/g);
    
    // Fallback: If AI doesn't follow strict markdown, just show the whole thing in sections
    // But for hackathon, let's try to map them
    let sectionsList = [
      { id: 'positive', title: 'Positive Test Cases', icon: <Check className="w-5 h-5 text-green-400" /> },
      { id: 'negative', title: 'Negative Test Cases', icon: <Share2 className="w-5 h-5 text-red-400" /> },
      { id: 'edge', title: 'Edge Cases', icon: <Share2 className="w-5 h-5 text-blue-400" /> },
      { id: 'security', title: 'Security Test Cases', icon: <Share2 className="w-5 h-5 text-cyan-400" /> }
    ];

    // For simplicity in this demo, we'll split by common keywords if markdown split fails
    // However, the prompt asks Gemini to format with headings and bullet points.
    // Let's assume we show the content as a whole if parsing is hard, 
    // but the user wants "Sections: Positive, Negative, Edge, Security".
    
    // I'll use a better parsing strategy:
    const regex = /(?:^|\n)(?:#+\s*|\d+\.\s+)?(Positive|Negative|Edge|Security)(?:\s+Test\s+Cases|\s+Cases)?[:\-\s]*/gi;
    const matches = [...text.matchAll(regex)];
    
    const parsedSections = [];
    if (matches.length > 0) {
      for (let i = 0; i < matches.length; i++) {
        const start = matches[i].index;
        const end = matches[i + 1] ? matches[i + 1].index : text.length;
        const type = matches[i][1].toLowerCase();
        let sectionTitle = matches[i][1] + ' Cases';
        if (type === 'positive') sectionTitle = 'Positive Test Cases';
        if (type === 'negative') sectionTitle = 'Negative Test Cases';
        
        parsedSections.push({
          id: type,
          title: sectionTitle,
          content: text.substring(start, end).replace(matches[i][0], '').trim()
        });
      }
    } else {
      // Fallback
      parsedSections.push({ id: 'all', title: 'Generated Test Cases', content: text });
    }

    return parsedSections;
  };

  const sections = parseSections(content);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const downloadPDF = async () => {
    const element = resultRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      backgroundColor: '#050505',
      scale: 2
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('QAgenie-TestCases.pdf');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="results-container"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem' }}>AI Generated Results</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-secondary" onClick={() => handleCopy(content, 'all')} style={{ padding: '0.5rem 1rem' }}>
            {copied === 'all' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied === 'all' ? 'Copied All' : 'Copy All'}
          </button>
          <button className="btn-primary" onClick={downloadPDF} style={{ padding: '0.5rem 1rem' }}>
            <FileText className="w-4 h-4" /> Download PDF
          </button>
        </div>
      </div>

      <div ref={resultRef} style={{ padding: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
          {sections.map((section, index) => (
            <motion.div 
              key={section.id + index}
              className="glass-card"
              style={{ padding: '2rem', position: 'relative' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: index % 2 === 0 ? '#a855f7' : '#38bdf8' }}>{section.title}</h3>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={() => handleCopy(section.content, section.id)}
                    style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.5rem', borderRadius: 'var(--radius-sm)', transition: 'var(--transition)' }}
                    title="Copy Section"
                  >
                    {copied === section.id ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div style={{ 
                whiteSpace: 'pre-wrap', 
                color: 'var(--text-secondary)',
                fontSize: '0.95rem',
                lineHeight: '1.8'
              }}>
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* AI Assistant Graphic (Optional) */}
      <div style={{ textAlign: 'center', marginTop: '4rem', padding: '2rem', borderTop: '1px solid var(--glass-border)' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Generated by QAgenie AI Assistant. Review cases before implementation.
        </p>
      </div>
    </motion.div>
  );
};

export default ResultSection;
