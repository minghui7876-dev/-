import React from 'react';
import { BookOpen, Leaf, Cpu, Menu, X, Sprout } from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentTab, setCurrentTab, isOpen, setIsOpen }) => {
  const tabs = [
    { id: 'mapping', label: '課綱對照與範例', icon: <BookOpen size={20} />, emoji: '🗺️' },
    { id: 'ai-gen', label: 'AI 教案生成', icon: <Cpu size={20} />, emoji: '🤖' },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-xl shadow-lg text-slate-600 border border-slate-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Container */}
      <div className={`
        fixed top-0 left-0 h-full bg-slate-900 text-white w-64 transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col shadow-2xl
      `}>
        <div className="p-6 flex items-center gap-3 border-b border-slate-800/50 bg-slate-900">
          <div className="bg-gradient-to-br from-nature-400 to-nature-600 p-2.5 rounded-xl shadow-lg shadow-nature-500/20">
            <Sprout size={24} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight text-white">EcoSci</h1>
            <p className="text-xs text-slate-400 font-medium tracking-wide">自然科 x 環教</p>
          </div>
        </div>

        <nav className="flex-1 mt-6 px-3 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setCurrentTab(tab.id);
                if (window.innerWidth < 1024) setIsOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group
                ${currentTab === tab.id 
                  ? 'bg-gradient-to-r from-nature-600 to-nature-500 text-white shadow-md shadow-nature-900/20 translate-x-1' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white hover:translate-x-1'}
              `}
            >
              <span className="text-xl group-hover:scale-110 transition-transform duration-200">{tab.emoji}</span>
              <span className="font-bold text-sm tracking-wide">{tab.label}</span>
              
              {currentTab === tab.id && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2 text-nature-400">
               <Leaf size={14} />
               <span className="text-xs font-bold uppercase tracking-wider">About Tool</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              專為自然科教師設計，整合十二年國教課綱與環境教育議題，運用 AI 協助備課。
            </p>
          </div>
          <div className="text-center mt-4 text-[10px] text-slate-600 font-mono">
            v1.0.0
          </div>
        </div>
      </div>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;