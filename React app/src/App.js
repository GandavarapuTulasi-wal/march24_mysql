import logo from './logo.svg';
import './App.css';
import Home from './Home';
import { Routes, BrowserRouter, Route, Link } from 'react-router-dom';
import Todos from './Todos';
import Authors from './Authors';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <div>
            <h1 className="heading">Car Rental app</h1>
          </div>
          <div className="nav">
            <Link to="/" className="link">
              Home
            </Link>
            <Link to="/authors" className="link">
              Authors
            </Link>
            <Link to="/todos" className="link">
              Todos
            </Link>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/authors" element={<Authors />}></Route>
          <Route path="/todos" element={<Todos />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
