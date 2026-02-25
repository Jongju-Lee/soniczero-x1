import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './layouts/Header';
import Footer from './layouts/Footer';

// Pages
import Home from './pages/Home';
import TechPage from './pages/TechPage';
import SpecsPage from './pages/SpecsPage';
import SupportPage from './pages/SupportPage';
import ShopPage from './pages/ShopPage';

const App = () => {
  return (
    <div className="app-wrapper">
      <Header />
      <main className="main-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/technology" element={<TechPage />} />
          <Route path="/specs" element={<SpecsPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/shop" element={<ShopPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
