import React from 'react';
import logo from './logo.svg';
import './App.css';
import { VacationsList } from './components/vacations';

function App() {
  
  return (
    <div className="App">
    <header className="App-header">
      <h1>Vacation desteny</h1>
    </header>
    <main>
      <VacationsList />
    </main>
  </div>
  );
}

export default App;
