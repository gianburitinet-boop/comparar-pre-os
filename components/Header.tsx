
import React from 'react';

interface HeaderProps {
  onSearch: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.location.reload()}>
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
              <i className="fas fa-magnifying-glass-dollar text-xl"></i>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                SmartCart AI
              </span>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Comparador de Preços</p>
            </div>
          </div>

          <div className="flex-1 max-w-xl relative">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input
              type="text"
              placeholder="O que você quer economizar hoje?"
              className="w-full pl-12 pr-4 py-3.5 bg-slate-100 border-2 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 rounded-2xl transition-all text-sm outline-none font-medium"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-sm text-slate-600 font-bold transition-colors">
              <i className="fas fa-location-dot text-emerald-500"></i>
              <span>São Paulo, SP</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
