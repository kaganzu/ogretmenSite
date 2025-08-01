import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './comps/navbar';
import Home from './comps/Home';
import AboutMe from './comps/Cv'; 
import Contact from './comps/Contact'; 
import Books from './comps/Books';
import Admin from './comps/Admin';
import AdminLogin from './comps/AdminLogin';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/books" element={<Books />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
