import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Homepage from './components/Homepage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/homepage" element={<Homepage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
