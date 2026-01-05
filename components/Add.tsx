
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getQuestions, saveQuestions } from '../lib/storage';
import { Category, Status, Question } from '../types';

const Add: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [meaning, setMeaning] = useState('');
  const [sentence, setSentence] = useState('');
  const [category, setCategory] = useState<Category>(Category.ENGLISH);

  const handleSave = () => {
    if (!title || !meaning) {
      alert("请填写单词和含义！");
      return;
    }

    const newQuestion: Question = {
      id: Date.now().toString(),
      title,
      meaning,
      sentence,
      category,
      status: Status.NEW,
      level: 10,
      createdAt: Date.now()
    };

    const existing = getQuestions();
    saveQuestions([newQuestion, ...existing]);
    navigate('/list');
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark overflow-y-auto no-scrollbar pb-32">
      <div className="flex items-center px-4 py-3 justify-between sticky top-0 z-10 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-sm">
        <button onClick={() => navigate(-1)} className="flex size-10 shrink-0 items-center justify-center rounded-2xl active:bg-gray-200 transition-colors">
          <span className="material-symbols-outlined text-2xl font-bold">arrow_back_ios_new</span>
        </button>
        <div className="h-2 flex-1 mx-4 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-primary w-2/3 rounded-full"></div>
        </div>
        <div className="flex items-center gap-1">
          <span className="material-symbols-outlined text-orange-500 fill-1">local_fire_department</span>
          <span className="text-orange-500 font-bold text-lg">12</span>
        </div>
      </div>

      <div className="flex flex-col items-center px-6 pt-2 pb-6">
        <div className="flex w-full items-center gap-4">
          <div className="w-24 h-24 shrink-0 overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-card border-2 border-gray-100 dark:border-gray-700 flex items-center justify-center p-2">
             <span className="material-symbols-outlined text-6xl text-primary">psychology</span>
          </div>
          <div className="flex-1 relative bg-white dark:bg-gray-800 p-4 rounded-2xl rounded-tl-none shadow-card border-2 border-gray-100 dark:border-gray-700">
            <h1 className="text-lg font-bold leading-tight">今天学到了什么新词?</h1>
            <p className="text-gray-400 text-sm mt-1">记录下来，我会帮你记住！</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 px-4">
        <div className="flex flex-col gap-2">
          <label className="text-gray-500 text-lg font-bold ml-1">生词 (Word)</label>
          <div className="flex w-full items-center rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus-within:border-primary transition-all h-16 shadow-card overflow-hidden">
            <input 
              className="flex-1 bg-transparent border-none text-xl font-bold px-5 focus:ring-0" 
              placeholder="例如：apple" 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button className="h-full px-5 text-gray-400 border-l-2 border-gray-100 dark:border-gray-700">
              <span className="material-symbols-outlined">mic</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-500 text-lg font-bold ml-1">意思 (Meaning)</label>
          <div className="flex w-full items-center rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus-within:border-primary transition-all h-16 shadow-card overflow-hidden">
            <input 
              className="flex-1 bg-transparent border-none text-lg font-medium px-5 focus:ring-0" 
              placeholder="例如：苹果" 
              type="text"
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-500 text-lg font-bold ml-1">科目 (Category)</label>
          <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
            {Object.values(Category).map(cat => (
              <button 
                key={cat}
                onClick={() => setCategory(cat)}
                className={`shrink-0 px-6 py-3 rounded-xl border-b-4 font-bold text-sm transform active:translate-y-1 active:border-b-0 transition-all ${category === cat ? 'bg-primary border-primary-dark text-white' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-500 text-lg font-bold ml-1">例句 (Sentence)</label>
          <div className="rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus-within:border-primary transition-all shadow-card overflow-hidden">
            <textarea 
              className="w-full bg-transparent border-none text-lg p-5 min-h-[120px] resize-none focus:ring-0 leading-relaxed" 
              placeholder="I eat an apple every day."
              value={sentence}
              onChange={(e) => setSentence(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark flex justify-center max-w-md mx-auto z-50">
        <button 
          onClick={handleSave}
          className="w-full bg-primary hover:bg-[#ebba24] text-white text-xl font-black py-4 rounded-2xl shadow-[0_4px_0_0_#dca200] transform active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
        >
          <span>保存并打卡</span>
          <span className="material-symbols-outlined">check_circle</span>
        </button>
      </div>
    </div>
  );
};

export default Add;
