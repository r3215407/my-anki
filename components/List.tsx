
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getQuestions } from '../lib/storage';
import { Question, Status } from '../types';

const List: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | Status>('all');
  const [questions] = useState<Question[]>(getQuestions());

  const filtered = useMemo(() => {
    return questions.filter(q => {
      const matchSearch = q.title.toLowerCase().includes(search.toLowerCase()) ||
        q.meaning.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === 'all' || q.status === filter;
      return matchSearch && matchFilter;
    });
  }, [questions, search, filter]);

  const stats = useMemo(() => {
    return {
      total: questions.length,
      mastered: questions.filter(q => q.status === Status.MASTERED).length,
      review: questions.filter(q => q.status === Status.REVIEW).length,
    };
  }, [questions]);

  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden">
      <header className="flex items-center justify-between p-5 pt-8 bg-background-light dark:bg-background-dark z-20">
        <button onClick={() => navigate('/')} className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-bubbly active:translate-y-[2px] active:shadow-none transition-all border border-gray-100 dark:border-gray-700">
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </button>
        <h1 className="text-xl font-bold tracking-tight">我的词语本</h1>
        <div className="w-10"></div>
      </header>

      <div className="px-5 pb-2">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <span className="material-symbols-outlined text-slate-400">search</span>
          </div>
          <input
            className="w-full h-14 pl-12 pr-4 rounded-full border-2 border-transparent bg-white dark:bg-gray-800 focus:border-primary focus:ring-0 shadow-bubbly transition-all font-medium text-lg"
            placeholder="搜索词语..."
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-3 px-5 py-4 overflow-x-auto no-scrollbar snap-x">
        {(['all', Status.NEW, Status.REVIEW, Status.MASTERED] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`snap-start flex-shrink-0 h-10 px-6 rounded-full font-bold shadow-bubbly border-2 active:scale-95 transition-all whitespace-nowrap ${filter === f ? 'bg-primary border-primary text-[#4d3b0b]' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-500'}`}
          >
            {f === 'all' ? '全部' : f}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-5 space-y-4 pb-32">
        {filtered.map(q => (
          <div
            key={q.id}
            className="group relative bg-card-light dark:bg-card-dark rounded-3xl p-4 border-b-4 border-gray-100 dark:border-gray-800 active:border-b-0 active:translate-y-1 transition-all duration-100 cursor-pointer"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-4 flex-1">
                <div className={`shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center ${q.status === Status.MASTERED ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-500'}`}>
                  <span className="material-symbols-outlined text-3xl">
                    {q.status === Status.MASTERED ? 'nutrition' : 'pest_control'}
                  </span>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-xl font-black">{q.title}</h3>
                    <span className="text-sm font-bold text-gray-400">({q.meaning})</span>
                  </div>
                  <p className="text-gray-500 text-sm font-medium mt-1 leading-snug truncate max-w-[200px]">{q.sentence}</p>
                </div>
              </div>
              <button className="shrink-0 w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-600 flex items-center justify-center hover:scale-110 active:scale-90 transition-transform">
                <span className="material-symbols-outlined text-xl">volume_up</span>
              </button>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex-1 h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${q.status === Status.MASTERED ? 'bg-green-500' : q.status === Status.REVIEW ? 'bg-orange-400' : 'bg-blue-400'}`}
                  style={{ width: `${q.level || (q.status === Status.MASTERED ? 100 : 30)}%` }}
                ></div>
              </div>
              <span className={`text-xs font-bold ${q.status === Status.MASTERED ? 'text-green-500' : 'text-orange-500'}`}>{q.status}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-24 right-5 z-40">
        <button
          onClick={() => navigate('/add')}
          className="w-16 h-16 bg-primary hover:bg-primary-dark rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-[#4d3b0b] transition-all active:scale-95 border-4 border-white dark:border-background-dark"
        >
          <span className="material-symbols-outlined text-4xl">add</span>
        </button>
      </div>
    </div>
  );
};

export default List;
