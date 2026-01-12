
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Learn from './components/Learn';
import List from './components/List';
import Add from './components/Add';
import Settings from './components/Settings';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: 'menu_book', label: '学习' },
    { path: '/list', icon: 'book_2', label: '词库' },
    { path: '/home', icon: 'bar_chart', label: '排行' },
    { path: '/settings', icon: 'person', label: '我的' }
  ];

  return (
    <div className="fixed bottom-0 w-full bg-card-light dark:bg-card-dark border-t border-gray-200 dark:border-gray-800 pb-safe pt-2 px-6 flex justify-between items-end h-[80px] pb-6 z-40 transition-colors">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center gap-1 transition-all w-16 group ${isActive ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}
          >
            {/* {isActive && item.path === '/settings' ? (
              <div className="absolute -top-12 bg-primary rounded-full p-3 border-4 border-background-light dark:border-background-dark shadow-bubbly animate-bounce">
                <span className="material-symbols-outlined text-white text-3xl">person</span>
              </div>
            ) : (
              <span className={`material-symbols-outlined text-3xl ${isActive ? 'fill-current font-bold' : ''}`}>
                {item.icon}
              </span>
            )} */}
            <div className={isActive && item.path === '/settings' ? 'h-8' : ''}></div>
            <span className="text-xs font-bold">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="relative flex min-h-screen w-full flex-col max-w-md mx-auto bg-background-light dark:bg-background-dark shadow-2xl overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/list" element={<List />} />
          <Route path="/add" element={<Add />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <Navigation />
      </div>
    </Router>
  );
};

export default App;
