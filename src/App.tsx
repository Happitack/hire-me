import React from 'react';
import ChildList from './components/ChildList';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Nursery Attendance Management</h1>
      </header>
      <main>
        <ChildList />
      </main>
    </div>
  );
};

export default App;