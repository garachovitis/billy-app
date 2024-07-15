import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Categories from './components/categories/Categories';
import Schedule from './components/schedule/Schedule';
import Settings from './components/settings/Settings';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/settings" element={<Settings />} />
          {/* Προσθέστε εδώ οποιεσδήποτε άλλες διαδρομές χρειάζεστε */}
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;