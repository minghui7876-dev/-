import React from 'react';
import { BookOpen, Leaf, Cpu, Menu, X } from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentTab, setCurrentTab, isOpen, setIsOpen }) => {
  const tabs = [
    { id: 'mapping', label: '課綱對照與範例', icon: <BookOpen size={20} /> },
    { id: 'ai-gen', label: 'AI 教案生成', icon: <Cpu size={20} /> },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md text-slate-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Container */}
      <div className={`
        fixed top-0 left-0 h-full bg-slate-900 text-white w-64 transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 flex items-center gap-3 border-b border-slate-700">
          <div className="bg-nature-500 p-2 rounded-lg">
            <Leaf size={24} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">EcoSci</h1>
            <p className="text-xs text-slate-400">自然科 x 環教</p>
          </div>
        </div>

        <nav className="mt-8 px-4 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setCurrentTab(tab.id);
                if (window.innerWidth < 1024) setIsOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${currentTab === tab.id 
                  ? 'bg-nature-600 text-white shadow-lg' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'}
              `}
            >
              {tab.icon}
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">
          <div className="bg-slate-800 rounded-lg p-4">
            <h4 className="text-xs font-semibold text-slate-400 uppercase mb-2">關於工具</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              整合十二年國教課綱與環境教育議題，運用 Gemini AI 協助教師備課。
            </p>
          </div>
        </div>
      </div>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;