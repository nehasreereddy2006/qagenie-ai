import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

function App() {
  const [isDashboard, setIsDashboard] = useState(false);

  return (
    <div className="app-container">
      <div className="mesh-gradient"></div>
      
      {!isDashboard ? (
        <LandingPage onStart={() => setIsDashboard(true)} />
      ) : (
        <Dashboard onBack={() => setIsDashboard(false)} />
      )}
    </div>
  );
}

export default App;
