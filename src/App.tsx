import { Outlet } from 'react-router-dom';
import './App.css';
import {Nav} from './components/Nav';

function App() {
  return (
    <div className="App relative flex h-[100vh] text-primary-text">
      <Nav />
      <Outlet />
    </div>
  );
}

export default App;
