import React, { useState } from 'react';
import { SCIENCE_UNITS, MAPPINGS, ENV_ISSUES } from '../constants';
import { ScienceUnit, EnvIssue } from '../types';
import { 
  Zap, 
  ArrowRight
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

  // Helper to get cute emoji for subject
  const getSubjectEmoji = (subject: string) => {
    if (subject.includes('物理')) return '⚡';
    if (subject.includes('化學')) return '🧪';
    if (subject.includes('生物')) return '🐸';
    if (subject.includes('地球')) return '🌍';
    return '📚';
  };

  // Helper to get cute emoji for env issue
  const getIssueEmoji = (theme: string) => {
    if (theme.includes('氣候')) return '🌡️';
    if (theme.includes('能源')) return '🔋';
    if (theme.includes('災害') || theme.includes('防災')) return '⛑️';
    if (theme.includes('海洋')) return '🐳';
    if (theme.includes('SDG')) return '🌈';
    if (theme.includes('永續') || theme.includes('倫理')) return '🌱';
    return '♻️';
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3">
            <span className="text-4xl">🗺️</span>
            <span className="bg-gradient-to-r from-green-600 to-blue-500 text-transparent bg-clip-text">
              課綱與議題對照
            </span>
          </h2>
          <p className="text-slate-600">
            點選左側的自然科學單元，小幫手將為您媒合適合的環境、海洋、防災及 SDGs 議題！
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-full overflow-hidden">
        
        {/* Left Column: Science Units Grid */}
        <div className="w-full lg:w-5/12 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-4 bg-white/50 p-2 rounded-lg backdrop-blur-sm">
            <h3 className="font-bold text-slate-700 flex items-center gap-2 text-lg">
              <span className="bg-orange-100 p-1.5 rounded-md text-xl">📖</span> 
              選擇教學單元
            </h3>
            <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-full">
              {SCIENCE_UNITS.length} 個單元
            </span>
          </div>
          
          <div className="overflow-y-auto pr-2 pb-20 space-y-3 custom-scrollbar">
            {SCIENCE_UNITS.map((unit) => (
              <button
                key={unit.id}
                onClick={() => setSelectedUnitId(unit.id)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 group relative overflow-hidden
                  ${selectedUnitId === unit.id 
                    ? 'bg-white border-orange-400 shadow-md scale-[1.02] ring-2 ring-orange-100' 
                    : 'bg-white border-slate-100 hover:border-orange-200 hover:shadow-sm'}
                `}
              >
                <div className="flex items-start gap-4 relative z-10">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-3xl shadow-sm transition-transform group-hover:scale-110 group-hover:rotate-6
                    ${selectedUnitId === unit.id ? 'bg-orange-100' : 'bg-slate-50'}
                  `}>
                    {getSubjectEmoji(unit.subject)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border
                        ${selectedUnitId === unit.id ? 'bg-orange-50 text-orange-600 border-orange-200' : 'bg-slate-100 text-slate-500 border-slate-200'}
                      `}>
                        {unit.grade}
                      </span>
                      <span className="text-xs font-mono text-slate-400">{unit.code}</span>
                    </div>
                    <h4 className={`font-bold text-lg leading-tight mb-1 ${selectedUnitId === unit.id ? 'text-slate-800' : 'text-slate-700'}`}>
                      {unit.topic}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">{unit.subject}</p>
                  </div>
                  
                  {/* Selection Indicator */}
                  {selectedUnitId === unit.id && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2">
                       <div className="w-2 h-12 bg-orange-400 rounded-l-full"></div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Details & Mappings */}
        <div className="w-full lg:w-7/12 flex flex-col overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white rounded-3xl -z-10 border border-white shadow-sm"></div>
          
          <div className="h-full flex flex-col overflow-hidden p-1">
            {selectedUnit ? (
              <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Unit Header */}
                <div className="p-6 bg-white rounded-t-3xl border-b border-dashed border-slate-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl select-none pointer-events-none transform translate-x-4 -translate-y-4">
                    {getSubjectEmoji(selectedUnit.subject)}
                  </div>
                  
                  <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                          <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-md">目前選擇</span>
                          <span className="text-slate-400 text-xs">{selectedUnit.subject}</span>
                      </div>
                      <h3 className="text-3xl font-bold text-slate-800 mb-3">{selectedUnit.topic}</h3>
                      <div className="bg-blue-50/80 p-4 rounded-xl text-slate-700 text-sm leading-relaxed border border-blue-100">
                        <span className="font-bold text-blue-800 mr-2">📌 課綱內容：</span>
                        {selectedUnit.description}
                      </div>
                  </div>
                </div>

                {/* Mappings List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                  <h4 className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
                    <span className="text-xl">🌟</span> 推薦融入的議題活動
                  </h4>
                  
                  {relatedMappings.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {relatedMappings.map((mapping, idx) => {
                        const issue = ENV_ISSUES.find(e => e.id === mapping.envIssueId);
                        if (!issue) return null;
                        return (
                          <div key={idx} className="bg-white rounded-2xl p-1 shadow-sm hover:shadow-lg transition-all duration-300 border border-transparent hover:border-green-200 group">
                             <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-green-50 to-emerald-50/30 p-5">
                                {/* Badge */}
                                <div className="absolute top-0 right-0 bg-green-200 text-green-800 text-[10px] font-bold px-2 py-1 rounded-bl-xl">
                                  {issue.code}
                                </div>

                                <div className="flex gap-4">
                                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm shrink-0 border border-green-100 group-hover:scale-110 transition-transform duration-300">
                                    {getIssueEmoji(issue.theme)}
                                  </div>
                                  <div className="flex-1">
                                    <h5 className="font-bold text-slate-800 text-lg mb-1">{issue.subTheme}</h5>
                                    <p className="text-slate-500 text-xs font-medium bg-white/60 inline-block px-2 py-0.5 rounded-full border border-green-100 mb-3">
                                      {issue.theme}
                                    </p>
                                    
                                    <div className="space-y-3">
                                      <div className="bg-white/80 p-3 rounded-xl border border-green-100/50 text-sm text-slate-600">
                                         <div className="font-bold text-green-700 text-xs mb-1 flex items-center gap-1">
                                            💡 關聯性
                                         </div>
                                         {mapping.relevance}
                                      </div>
                                      <div className="bg-amber-50/80 p-3 rounded-xl border border-amber-100/50 text-sm text-slate-600">
                                         <div className="font-bold text-amber-700 text-xs mb-1 flex items-center gap-1">
                                            🎯 範例活動
                                         </div>
                                         {mapping.exampleActivity}
                                      </div>
                                    </div>

                                    <button 
                                      onClick={() => onSelectForAI(selectedUnit, issue)}
                                      className="mt-4 w-full py-3 bg-slate-800 hover:bg-green-600 text-white rounded-xl font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group-hover:translate-y-[-2px]"
                                    >
                                      <Zap size={16} className="text-yellow-300 animate-pulse" />
                                      AI 生成詳細教案
                                      <ArrowRight size={16} className="opacity-50 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                  </div>
                                </div>
                             </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                       <div className="text-6xl mb-4 opacity-50">🍃</div>
                       <p className="text-slate-400 font-medium">此單元目前沒有推薦的議題對照。</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="w-48 h-48 bg-blue-50 rounded-full flex items-center justify-center mb-6 relative animate-bounce-slow">
                  <span className="text-8xl filter drop-shadow-xl">👩‍🏫</span>
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold transform rotate-12 shadow-sm">
                    Hi 老師好!
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-700 mb-3">準備開始備課了嗎？</h3>
                <p className="text-slate-500 max-w-xs leading-relaxed">
                  請從左側清單選擇一個<br/>
                  <span className="font-bold text-blue-600">自然科學單元</span><br/>
                  小幫手會為您推薦適合融入的<br/>
                  <span className="font-bold text-green-600">環境、海洋、防災及 SDGs 議題</span>！
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