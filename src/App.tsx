import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SecondPage from './pages/SecondPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/second" element={<SecondPage />} />
      </Routes>
    </Router>
  );
};

export default App;
