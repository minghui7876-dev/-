import React, { useState } from 'react';
import { SCIENCE_UNITS, MAPPINGS, ENV_ISSUES } from '../constants';
import { ScienceUnit, EnvIssue } from '../types';
import { 
  ArrowRight, 
  Book, 
  Zap, 
  Atom, 
  FlaskConical, 
  Dna, 
  Globe, 
  Leaf, 
  Wind, 
  Droplets, 
  Flame, 
  Recycle,
  ShieldAlert,
  Waves,
  Target
} from 'lucide-react';

interface MappingViewProps {
  onSelectForAI: (unit: ScienceUnit, issue: EnvIssue) => void;
}

const MappingView: React.FC<MappingViewProps> = ({ onSelectForAI }) => {
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);

  const selectedUnit = SCIENCE_UNITS.find(u => u.id === selectedUnitId);
  
  const relatedMappings = selectedUnitId 
    ? MAPPINGS.filter(m => m.scienceUnitId === selectedUnitId)
    : [];

  // Helper to get icon for subject
  const getSubjectIcon = (subject: string) => {
    if (subject.includes('物理')) return <Atom className="text-purple-500" />;
    if (subject.includes('化學')) return <FlaskConical className="text-orange-500" />;
    if (subject.includes('生物')) return <Dna className="text-green-500" />;
    if (subject.includes('地球科學')) return <Globe className="text-blue-500" />;
    return <Book className="text-slate-500" />;
  };

  // Helper to get icon for env issue
  const getIssueIcon = (theme: string) => {
    if (theme.includes('氣候')) return <Wind className="text-blue-400" />;
    if (theme.includes('能源')) return <Zap className="text-yellow-400" />;
    if (theme.includes('災害') || theme.includes('防災')) return <ShieldAlert className="text-red-500" />;
    if (theme.includes('海洋')) return <Waves className="text-cyan-500" />;
    if (theme.includes('SDG')) return <Target className="text-rose-500" />;
    if (theme.includes('永續') || theme.includes('倫理')) return <Leaf className="text-green-400" />;
    return <Recycle className="text-teal-400" />;
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3">
          <span className="bg-gradient-to-r from-blue-600 to-teal-500 text-transparent bg-clip-text">
            課綱與議題對照
          </span>
        </h2>
        <p className="text-slate-600">
          點選左側的自然科學單元，系統將自動媒合適合的環境、海洋、防災及 SDGs 議題。
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 h-full overflow-hidden">
        
        {/* Left Column: Science Units Grid */}
        <div className="w-full lg:w-5/12 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-700 flex items-center gap-2 text-lg">
              <span className="bg-slate-200 p-1 rounded-md"><Book size={18} /></span> 
              選擇自然科學單元
            </h3>
            <span className="text-xs text-slate-400">共 {SCIENCE_UNITS.length} 個單元</span>
          </div>
          
          <div className="overflow-y-auto pr-2 pb-20 space-y-3">
            {SCIENCE_UNITS.map((unit) => (
              <button
                key={unit.id}
                onClick={() => setSelectedUnitId(unit.id)}
                className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 group relative overflow-hidden
                  ${selectedUnitId === unit.id 
                    ? 'bg-white border-blue-500 shadow-md transform scale-[1.02]' 
                    : 'bg-white border-transparent hover:border-blue-200 hover:shadow-sm shadow-sm'}
                `}
              >
                {/* Decorative background element */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br opacity-5 rounded-bl-full transition-opacity
                   ${selectedUnitId === unit.id ? 'from-blue-500 to-cyan-500 opacity-10' : 'from-slate-300 to-slate-100'}
                `} />

                <div className="flex items-start gap-4 relative z-10">
                  <div className={`p-3 rounded-2xl shadow-sm transition-colors
                    ${selectedUnitId === unit.id ? 'bg-blue-50' : 'bg-slate-50 group-hover:bg-blue-50'}
                  `}>
                    {React.cloneElement(getSubjectIcon(unit.subject) as React.ReactElement<any>, { size: 28 })}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold px-2 py-1 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        {unit.grade}
                      </span>
                      <span className="text-xs font-mono text-slate-400 group-hover:text-blue-500 transition-colors">{unit.code}</span>
                    </div>
                    <h4 className={`font-bold text-lg mb-1 ${selectedUnitId === unit.id ? 'text-blue-700' : 'text-slate-700'}`}>
                      {unit.topic}
                    </h4>
                    <p className="text-xs text-slate-500 truncate font-medium">{unit.subject}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Details & Mappings */}
        <div className="w-full lg:w-7/12 flex flex-col overflow-hidden relative">
          <div className="absolute inset-0 bg-slate-200/50 rounded-3xl -z-10 transform rotate-1"></div>
          <div className="h-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white flex flex-col overflow-hidden">
            {selectedUnit ? (
              <div className="flex flex-col h-full">
                {/* Unit Header */}
                <div className="p-8 border-b border-slate-100 bg-gradient-to-br from-white via-white to-blue-50/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100">
                        {getSubjectIcon(selectedUnit.subject)}
                    </div>
                    <div>
                        <span className="text-blue-600 font-bold text-sm tracking-wide uppercase">Selected Unit</span>
                        <h3 className="text-2xl font-bold text-slate-800 leading-none">{selectedUnit.topic}</h3>
                    </div>
                  </div>
                  <div className="bg-white/60 p-4 rounded-xl border border-slate-100 text-slate-600 text-sm leading-relaxed">
                    <span className="font-semibold text-slate-800">課綱內容：</span>
                    {selectedUnit.description}
                  </div>
                </div>

                {/* Mappings List */}
                <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
                  <h4 className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
                    <Leaf size={16} /> 推薦融入的議題 (環教/防災/海洋/SDGs)
                  </h4>
                  
                  {relatedMappings.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {relatedMappings.map((mapping, idx) => {
                        const issue = ENV_ISSUES.find(e => e.id === mapping.envIssueId);
                        if (!issue) return null;
                        return (
                          <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
                            
                            {/* Card Header */}
                            <div className="p-5 flex justify-between items-start border-b border-slate-100 bg-gradient-to-r from-white to-slate-50/30">
                               <div className="flex gap-4">
                                  <div className="bg-slate-100 p-3 rounded-xl h-fit">
                                    {React.cloneElement(getIssueIcon(issue.theme) as React.ReactElement<any>, { size: 24 })}
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold">
                                        {issue.code}
                                      </span>
                                      <h5 className="font-bold text-slate-800 text-lg">{issue.subTheme}</h5>
                                    </div>
                                    <p className="text-slate-500 text-xs font-medium">{issue.theme}</p>
                                  </div>
                               </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-5 space-y-4">
                              <div className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                 <span className="font-bold text-slate-700 block mb-1">議題實質內涵：</span>
                                 {issue.content}
                              </div>
                              
                              <div className="space-y-2">
                                <p className="text-sm text-slate-700">
                                  <span className="font-bold text-blue-600">關聯性：</span> {mapping.relevance}
                                </p>
                                <p className="text-sm text-slate-700">
                                  <span className="font-bold text-amber-600">範例活動：</span> {mapping.exampleActivity}
                                </p>
                              </div>

                              <button 
                                onClick={() => onSelectForAI(selectedUnit, issue)}
                                className="w-full mt-2 flex items-center justify-center gap-2 text-sm bg-slate-900 text-white px-4 py-3 rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-900/10 active:scale-95"
                              >
                                <Zap size={16} className="text-yellow-300" />
                                使用 AI 生成完整教案
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                       <Leaf className="mx-auto h-12 w-12 text-slate-200 mb-3" />
                       <p className="text-slate-400 font-medium">此單元尚無建議的對應議題。</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 p-8 text-center bg-slate-50/50">
                <div className="bg-white p-6 rounded-full shadow-sm mb-6 animate-pulse">
                  <ArrowRight size={48} className="text-blue-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-700 mb-2">準備開始備課</h3>
                <p className="text-sm max-w-xs mx-auto">
                  請從左側清單選擇一個您要教授的自然科學單元，系統將為您媒合適合的環境教育、防災、海洋及 SDGs 議題。
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MappingView;