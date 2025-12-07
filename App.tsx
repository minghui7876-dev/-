import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MappingView from './components/MappingView';
import AIGenerator from './components/AIGenerator';
import { ScienceUnit, EnvIssue } from './types';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('mapping');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // State for passing data from Mapping to AI Generator
  const [selectedUnit, setSelectedUnit] = useState<ScienceUnit | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<EnvIssue | null>(null);

  const handleSelectForAI = (unit: ScienceUnit, issue: EnvIssue) => {
    setSelectedUnit(unit);
    setSelectedIssue(issue);
    setCurrentTab('ai-gen');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
      {/* Navigation */}
      <Sidebar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 p-4 lg:p-8 h-screen overflow-hidden">
        <div className="h-full pt-12 lg:pt-0"> {/* Mobile padding for hamburger */}
          
          {currentTab === 'mapping' && (
            <MappingView onSelectForAI={handleSelectForAI} />
          )}

          {currentTab === 'ai-gen' && (
            <AIGenerator 
              initialUnit={selectedUnit} 
              initialIssue={selectedIssue} 
            />
          )}

        </div>
      </main>
    </div>
  );
};

export default App;