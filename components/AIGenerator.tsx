import React, { useState, useEffect } from 'react';
import { ScienceUnit, EnvIssue, AITaskType, AIRequest } from '../types';
import { SCIENCE_UNITS, ENV_ISSUES } from '../constants';
import { generateTeachingContent } from '../services/geminiService';
import MarkdownRenderer from './MarkdownRenderer';
import { 
  Wand2, 
  Loader2, 
  RefreshCw, 
  BookOpen, 
  FileText, 
  CheckSquare, 
  Presentation,
  Sparkles,
  ArrowRight
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

  const getTaskIcon = (type: AITaskType) => {
    switch (type) {
      case AITaskType.LessonPlan: return <BookOpen size={24} />;
      case AITaskType.TeachingMaterial: return <FileText size={24} />;
      case AITaskType.Assessment: return <CheckSquare size={24} />;
      case AITaskType.PPTOutline: return <Presentation size={24} />;
      default: return <Wand2 size={24} />;
    }
  };

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6 overflow-hidden">
      
      {/* Configuration Panel */}
      <div className="w-full lg:w-5/12 flex flex-col gap-4 overflow-y-auto pr-2 pb-20">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="mb-6 pb-4 border-b border-slate-100">
             <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <div className="bg-nature-100 p-2 rounded-lg text-nature-600">
                   <Sparkles size={20} />
                </div>
                AI 教學生成器
             </h2>
             <p className="text-sm text-slate-500 mt-1 pl-11">
                運用 Gemini AI 協助您快速產出教學素材
             </p>
          </div>

          <div className="space-y-6">
            {/* Science Unit Selection */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-200 text-slate-600 text-xs">1</span>
                自然科學單元
              </label>
              <div className="relative">
                <select
                  value={selectedUnitId}
                  onChange={(e) => setSelectedUnitId(e.target.value)}
                  className="w-full p-3 pl-4 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition-all hover:bg-slate-100 cursor-pointer"
                >
                  <option value="">請選擇單元...</option>
                  {SCIENCE_UNITS.map(unit => (
                    <option key={unit.id} value={unit.id}>
                      [{unit.grade}] {unit.subject} - {unit.topic}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <ArrowRight size={16} className="rotate-90" />
                </div>
              </div>
            </div>

            {/* Env Issue Selection */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-200 text-slate-600 text-xs">2</span>
                環境教育議題
              </label>
              <div className="relative">
                <select
                  value={selectedIssueId}
                  onChange={(e) => setSelectedIssueId(e.target.value)}
                  className="w-full p-3 pl-4 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none transition-all hover:bg-slate-100 cursor-pointer"
                >
                  <option value="">請選擇議題...</option>
                  {ENV_ISSUES.map(issue => (
                    <option key={issue.id} value={issue.id}>
                      {issue.theme} - {issue.subTheme}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <ArrowRight size={16} className="rotate-90" />
                </div>
              </div>
            </div>

            {/* Task Type Selection - Visual Grid */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-200 text-slate-600 text-xs">3</span>
                生成內容類型
              </label>
              <div className="grid grid-cols-2 gap-3">
                {Object.values(AITaskType).map((type) => {
                  const isSelected = taskType === type;
                  return (
                    <button
                      key={type}
                      onClick={() => setTaskType(type)}
                      className={`
                        p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 text-center
                        ${isSelected
                          ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm'
                          : 'bg-white border-slate-100 text-slate-500 hover:border-blue-200 hover:bg-slate-50'}
                      `}
                    >
                      <div className={`
                        p-2 rounded-full 
                        ${isSelected ? 'bg-blue-100' : 'bg-slate-100'}
                      `}>
                        {getTaskIcon(type)}
                      </div>
                      <span className="text-xs font-bold">{type}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Prompt */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                 <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-200 text-slate-600 text-xs">4</span>
                 額外要求 (選填)
              </label>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="例如：請設計一個適合高一學生的分組討論活動，或是針對國中生設計更簡單的說明..."
                className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 min-h-[80px] resize-none bg-slate-50"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={!selectedUnitId || !selectedIssueId || isLoading}
              className={`
                w-full py-4 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-98
                ${!selectedUnitId || !selectedIssueId || isLoading
                  ? 'bg-slate-300 cursor-not-allowed shadow-none'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'}
              `}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  AI 正在思考中...
                </>
              ) : (
                <>
                  <Wand2 size={20} />
                  開始生成教案
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Result Display */}
      <div className="w-full lg:w-7/12 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden h-full">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-100 p-1.5 rounded text-indigo-600">
               <FileText size={18} />
            </div>
            <h3 className="font-bold text-slate-700">生成結果</h3>
          </div>
          {result && (
             <div className="flex gap-2">
                 <button className="text-slate-500 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-1 text-xs font-medium" title="重新生成" onClick={handleGenerate}>
                    <RefreshCw size={14} /> 重新生成
                 </button>
             </div>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 bg-white relative">
          {result ? (
            <MarkdownRenderer content={result} />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 p-8 text-center bg-slate-50/30">
               <div className="w-24 h-24 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center mb-6">
                 <Wand2 size={48} className="text-slate-200" />
               </div>
               <h4 className="text-xl font-bold text-slate-400 mb-2">尚無內容</h4>
               <p className="max-w-xs">請在左側設定教學單元與議題，AI 將為您生成客製化的教學內容。</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIGenerator;