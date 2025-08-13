import React from 'react';
import logo from './logo.svg';
import './App.css';
import { VacationsList } from './components/vacations';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { VacationDetail } from "./components/vacationDetail";

function App() {
  
  return (
    <div className="App">
    <header className="App-header">
      <h1>Vacation desteny</h1>
    </header>
    <main>
    <Router>
      <Routes>
        <Route path="/" element={<VacationsList />} />
        <Route path="/vacations/:id" element={<VacationDetail />} />
      </Routes>
    </Router>
    </main>
  </div>
  );
}

export default App;
