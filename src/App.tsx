import { Outlet } from 'react-router-dom';
import './App.css';
import {Nav} from './components/Nav';

function App() {
  return (
    <div className="App relative">
      <Nav />
      <Outlet />
    </div>
  );
}

export default App;
