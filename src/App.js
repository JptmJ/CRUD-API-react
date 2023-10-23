import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GET from './components/GET';
import POST from './components/POST';
import DELETE from './components/DELETE';
import PUT from './components/PUT';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<GET />} />
          <Route path="/POST" element={<POST />} />
          <Route path="/delete" element={<DELETE />} />
          <Route path="/PUT" element={<PUT />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
