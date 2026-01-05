
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getQuestions, saveQuestions } from '../lib/storage';
import { Question, Status } from '../types';
import { explainMistake } from '../services/gemini';

const Learn: React.FC = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [aiText, setAiText] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  useEffect(() => {
    const all = getQuestions().filter(q => q.status !== Status.MASTERED);
    setQuestions(all);
  }, []);

  const current = questions[currentIndex];

  const handleNext = (mastered: boolean) => {
    const updated = [...getQuestions()];
    const qIndex = updated.findIndex(q => q.id === current.id);
    if (qIndex !== -1) {
      updated[qIndex].status = mastered ? Status.MASTERED : Status.REVIEW;
      updated[qIndex].lastReviewedAt = Date.now();
      saveQuestions(updated);
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowExplanation(false);
      setAiText(null);
    } else {
      alert("太棒了！你完成了今天的挑战！");
      navigate('/');
    }
  };

  const handleAiExplain = async () => {
    if (!current) return;
    setLoadingAi(true);
    const text = await explainMistake(current.title, current.meaning, current.sentence);
    setAiText(text);
    setLoadingAi(false);
  };

  if (!current) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 gap-4 page-transition text-center">
        <span className="material-symbols-outlined text-8xl text-primary opacity-30">check_circle</span>
        <h2 className="text-2xl font-black">暂时没有需要复习的题目</h2>
        <p className="text-gray-500">真棒！你的记忆花园长势良好。</p>
        <button onClick={() => navigate('/')} className="px-8 py-3 bg-primary rounded-xl font-bold shadow-btn-primary">回主页</button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden">
      {/* Top Nav */}
      <div className="p-4 flex items-center justify-between">
        <button onClick={() => navigate('/')} className="p-2 text-gray-400 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
          <span className="material-symbols-outlined text-3xl font-bold">close</span>
        </button>
        <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden mx-4 relative">
          <div 
            className="h-full bg-primary transition-all duration-500" 
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        <div className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[#ff9600] text-3xl fill-current">local_fire_department</span>
          <span className="text-[#ff9600] font-black">{currentIndex + 1}/{questions.length}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center px-5 pb-4 gap-6">
        <div className="w-full bg-card-light dark:bg-card-dark rounded-3xl border-2 border-gray-100 dark:border-gray-800 shadow-toy dark:shadow-toy-dark p-0 overflow-hidden flex flex-col items-stretch">
          <div className="relative aspect-video bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center p-6">
            <span className="material-symbols-outlined text-8xl text-primary/40">pest_control</span>
          </div>

          <div className="p-6 flex flex-col items-center gap-6">
            <div className="text-center">
              <h1 className="text-4xl font-black mb-2">{current.title}</h1>
              <p className="text-text-sub dark:text-gray-400 text-xl">{current.meaning}</p>
            </div>

            <div className="w-full bg-background-light dark:bg-background-dark/50 rounded-2xl p-4 text-center">
               <p className="text-lg leading-relaxed font-medium italic">"{current.sentence}"</p>
            </div>

            {aiText ? (
               <div className="w-full bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 border-l-4 border-blue-400 text-sm animate-fade-in-up">
                 <p className="font-bold text-blue-600 mb-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">smart_toy</span> AI解析
                 </p>
                 <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{aiText}</p>
               </div>
            ) : (
              <button 
                onClick={handleAiExplain}
                disabled={loadingAi}
                className="text-primary-dark font-bold text-sm flex items-center gap-1 hover:underline active:scale-95 transition-all disabled:opacity-50"
              >
                {loadingAi ? 'AI 正在思考...' : 'AI 解析解释一下'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-5 pb-8 grid grid-cols-2 gap-4">
        <button 
          onClick={() => handleNext(false)}
          className="btn-press flex items-center justify-center h-14 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl shadow-[0_4px_0_0_#e5e7eb] font-bold text-gray-500"
        >
          不认识
        </button>
        <button 
          onClick={() => handleNext(true)}
          className="btn-press flex items-center justify-center h-14 bg-primary border-b-0 rounded-2xl shadow-btn-primary font-black text-[#4d3b0b] relative overflow-hidden"
        >
          <div className="absolute inset-x-0 top-0 h-1/2 bg-white opacity-10 rounded-t-2xl pointer-events-none"></div>
          认识
        </button>
      </div>
    </div>
  );
};

export default Learn;
