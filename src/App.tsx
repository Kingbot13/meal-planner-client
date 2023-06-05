import { Outlet } from 'react-router-dom';
import './App.css';
import {Nav} from './components/Nav';

function App() {
  return (
    <div className="App relative flex min-h-[100vh] overflow-x-hidden text-primary-text">
      <Nav />
      <Outlet />
    </div>
  );
}

export default App;
