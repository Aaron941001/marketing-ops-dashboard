import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Dashboard from './pages/Dashboard';
import Automation from './pages/Automation';
import Budget from './pages/Budget';
import SocialScheduler from './pages/SocialScheduler';
import FileManager from './pages/FileManager';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Router>
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/automation" element={<Automation />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/scheduler" element={<SocialScheduler />} />
              <Route path="/files" element={<FileManager />} />
            </Routes>
          </main>
        </Router>
      </div>
    </div>
  );
}

export default App;
