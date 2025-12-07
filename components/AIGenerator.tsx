import React, { useState, useEffect } from 'react';
import { ScienceUnit, EnvIssue, AITaskType, AIRequest } from '../types';
import { SCIENCE_UNITS, ENV_ISSUES } from '../constants';
import { generateTeachingContent } from '../services/geminiService';
import MarkdownRenderer from './MarkdownRenderer';
import { 
  Wand2, 
  RefreshCw, 
  FileText, 
  Sparkles,
  ArrowRight,
  Send,
  Download
} from 'lucide-react';

interface AIGeneratorProps {
  initialUnit?: ScienceUnit | null;
  initialIssue?: EnvIssue | null;
}

const AIGenerator: React.FC<AIGeneratorProps> = ({ initialUnit, initialIssue }) => {
  const [selectedUnitId, setSelectedUnitId] = useState<string>(initialUnit?.id || '');
  const [selectedIssueId, setSelectedIssueId] = useState<string>(initialIssue?.id || '');
  const [taskType, setTaskType] = useState<AITaskType>(AITaskType.LessonPlan);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    if (initialUnit) setSelectedUnitId(initialUnit.id);
    if (initialIssue) setSelectedIssueId(initialIssue.id);
  }, [initialUnit, initialIssue]);

  const handleGenerate = async () => {
    if (!selectedUnitId || !selectedIssueId) return;

    const unit = SCIENCE_UNITS.find(u => u.id === selectedUnitId);
    const issue = ENV_ISSUES.find(e => e.id === selectedIssueId);

    if (!unit || !issue) return;

    setIsLoading(true);
    setResult('');

    const request: AIRequest = {
      scienceUnit: unit,
      envIssue: issue,
      taskType: taskType,
      customPrompt: customPrompt
    };

    try {
      const content = await generateTeachingContent(request);
      setResult(content);
    } catch (error) {
      setResult("發生錯誤，請稍後再試。");
    } finally {
      setIsLoading(false);
    }
  };

  const getTaskEmoji = (type: AITaskType) => {
    switch (type) {
      case AITaskType.LessonPlan: return '📖';
      case AITaskType.TeachingMaterial: return '🧩';
      case AITaskType.Assessment: return '✍️';
      case AITaskType.PPTOutline: return '🖥️';
      default: return '✨';
    }
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6 overflow-hidden">
      
      {/* Configuration Panel */}
      <div className="w-full lg:w-5/12 flex flex-col gap-4 overflow-y-auto pr-2 pb-20 custom-scrollbar">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="mb-6 pb-4 border-b border-slate-100">
             <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <span className="text-3xl">🤖</span>
                AI 教學生成器
             </h2>
             <p className="text-sm text-slate-500 mt-1 pl-11">
                運用 Gemini AI 協助您快速產出教學素材
             </p>
          </div>

          <div className="space-y-8">
            {/* Step 1: Unit */}
            <div className="relative group">
              <div className="absolute -left-3 top-0 bottom-0 w-1 bg-slate-100 rounded-full group-hover:bg-blue-200 transition-colors"></div>
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-2 pl-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">1</span>
                自然科學單元
              </label>
              <div className="pl-2">
                <select
                  value={selectedUnitId}
                  onChange={(e) => setSelectedUnitId(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition-all hover:bg-slate-100 cursor-pointer shadow-sm"
                >
                  <option value="">請選擇單元...</option>
                  {SCIENCE_UNITS.map(unit => (
                    <option key={unit.id} value={unit.id}>
                      [{unit.grade}] {unit.topic} ({unit.subject})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 2: Issue */}
            <div className="relative group">
              <div className="absolute -left-3 top-0 bottom-0 w-1 bg-slate-100 rounded-full group-hover:bg-green-200 transition-colors"></div>
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-2 pl-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs font-bold">2</span>
                環境教育議題
              </label>
              <div className="pl-2">
                <select
                  value={selectedIssueId}
                  onChange={(e) => setSelectedIssueId(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none transition-all hover:bg-slate-100 cursor-pointer shadow-sm"
                >
                  <option value="">請選擇議題...</option>
                  {ENV_ISSUES.map(issue => (
                    <option key={issue.id} value={issue.id}>
                      {issue.subTheme} ({issue.theme})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 3: Task Type */}
            <div className="relative group">
              <div className="absolute -left-3 top-0 bottom-0 w-1 bg-slate-100 rounded-full group-hover:bg-purple-200 transition-colors"></div>
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-2 pl-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs font-bold">3</span>
                生成內容類型
              </label>
              <div className="pl-2">
                <div className="grid grid-cols-2 gap-3">
                  {Object.values(AITaskType).map((type) => {
                    const isSelected = taskType === type;
                    return (
                      <button
                        key={type}
                        onClick={() => setTaskType(type)}
                        className={`
                          p-3 rounded-xl border-2 transition-all flex items-center gap-3 text-left
                          ${isSelected
                            ? 'bg-purple-50 border-purple-500 text-purple-900 shadow-sm ring-1 ring-purple-200'
                            : 'bg-white border-slate-100 text-slate-600 hover:border-purple-200 hover:bg-slate-50'}
                        `}
                      >
                        <span className="text-2xl">{getTaskEmoji(type)}</span>
                        <span className="text-xs font-bold">{type.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 4: Custom Prompt */}
            <div className="relative group">
              <div className="absolute -left-3 top-0 bottom-0 w-1 bg-slate-100 rounded-full group-hover:bg-amber-200 transition-colors"></div>
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-2 pl-2">
                 <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">4</span>
                 額外要求 (選填)
              </label>
              <div className="pl-2">
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="例如：請設計一個適合高一學生的分組討論活動，或是針對國中生設計更簡單的說明..."
                  className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 min-h-[80px] resize-none bg-slate-50 placeholder:text-slate-400"
                />
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!selectedUnitId || !selectedIssueId || isLoading}
              className={`
                w-full py-4 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-3 transition-all transform active:scale-[0.98]
                ${!selectedUnitId || !selectedIssueId || isLoading
                  ? 'bg-slate-300 cursor-not-allowed shadow-none'
                  : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-indigo-200'}
              `}
            >
              {isLoading ? (
                <>
                  <div className="flex gap-1 items-center animate-pulse">
                    <span className="text-xl">🤖</span>
                    <span className="text-xl">💭</span>
                  </div>
                  <span>AI 正在思考中...</span>
                </>
              ) : (
                <>
                  <Sparkles size={20} className="text-yellow-300" />
                  <span>開始生成</span>
                  <Send size={18} className="opacity-80" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Result Display */}
      <div className="w-full lg:w-7/12 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden h-full relative">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white z-10">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
               <FileText size={20} />
            </div>
            <h3 className="font-bold text-slate-700">生成結果</h3>
          </div>
          {result && (
             <div className="flex gap-2">
                 <button className="text-slate-500 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2 text-xs font-bold border border-transparent hover:border-blue-100" onClick={handleGenerate}>
                    <RefreshCw size={14} /> 重新生成
                 </button>
             </div>
          )}
        </div>
        
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 bg-slate-50/50 custom-scrollbar">
          {isLoading ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-6">
               <div className="text-6xl animate-bounce">🤖</div>
               <div className="space-y-2">
                  <h4 className="text-xl font-bold text-slate-700">正在為您撰寫教案...</h4>
                  <p className="text-slate-500 text-sm">這可能需要幾秒鐘的時間，請稍候。</p>
               </div>
               <div className="flex gap-2 text-2xl">
                  <span className="animate-pulse delay-0">📝</span>
                  <span className="animate-pulse delay-100">🌿</span>
                  <span className="animate-pulse delay-200">💡</span>
               </div>
            </div>
          ) : result ? (
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 min-h-full">
              <MarkdownRenderer content={result} />
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-6 opacity-60">
               <div className="w-32 h-32 bg-indigo-50 rounded-full flex items-center justify-center text-6xl shadow-inner mb-4">
                 ✨
               </div>
               <div className="space-y-2 max-w-sm">
                 <h4 className="text-xl font-bold text-slate-700">準備好了！</h4>
                 <p className="text-slate-500">請在左側面板設定您的教學需求，AI 助手將為您量身打造專屬的教學內容。</p>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIGenerator;