import React, { useEffect } from 'react';
import { redirect, Outlet } from 'react-router-dom';
import { useGuestStatus } from './app/hooks';
import './App.css';
import { Dashboard } from './routes/Dashboard';

function App() {
  const guest = useGuestStatus();
  useEffect(() => {
    // THIS WILL NEED TO BE CHANGED TO CHECK FOR USER AS WELL AS GUEST
    if (!guest) redirect('/login');
  }, [guest]);
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
