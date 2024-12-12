import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login'; 
import RegistroMuestras from './components/RegistroMuestras';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {}
          <Route path="/" element={<Login />} />

          {}
          <Route path="/registro-muestras" element={<RegistroMuestras />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
