import React from 'react';
import logo from './logo.svg';
import './App.css';
import { VacationsList } from './components/vacations';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { VacationDetail } from "./components/vacationDetail";

function App() {
  
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <nav className="App-nav">
            <Link to="/" className="home-button">🏠 Home</Link>
          </nav>
          <h1>Vacation desteny</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<VacationsList />} />
            <Route path="/vacations/:id" element={<VacationDetail />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;