import React, { useEffect } from 'react';
import { redirect } from 'react-router-dom';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { useGuestStatus } from './app/hooks';
import './App.css';

function App() {
  const guest = useGuestStatus();
  useEffect(() => {
    // THIS WILL NEED TO BE CHANGED TO CHECK FOR USER AS WELL AS GUEST
    if (!guest) redirect('/login');
  }, [guest]);
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
