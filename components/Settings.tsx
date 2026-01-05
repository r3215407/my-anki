
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserStats } from '../lib/storage';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [stats] = useState(getUserStats());
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));

  const toggleDarkMode = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    if (next) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-6 px-4 pb-24 page-transition h-full overflow-y-auto no-scrollbar">
      <div className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm px-4 pt-4 pb-2 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex size-10 items-center justify-center rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors btn-press">
          <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
        </button>
        <h2 className="text-xl font-bold flex-1 text-center pr-10">个人设置</h2>
      </div>

      <div className="flex flex-col items-center gap-4 mt-4">
        <div className="relative group cursor-pointer">
          <div className="rounded-full h-32 w-32 border-4 border-primary shadow-bubbly bg-cover bg-center overflow-hidden" style={{ backgroundImage: 'url(https://picsum.photos/300/300?random=2)' }}></div>
          <div className="absolute bottom-0 right-0 bg-white dark:bg-card-dark rounded-full p-2 border-2 border-background-light dark:border-background-dark shadow-sm">
            <span className="material-symbols-outlined text-primary text-xl">edit</span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">小明同学</h1>
          <div className="flex items-center gap-2 mt-1 px-3 py-1 bg-white dark:bg-card-dark rounded-full shadow-sm border border-gray-100 dark:border-gray-800">
            <span className="material-symbols-outlined text-orange-500 text-lg fill-current">local_fire_department</span>
            <p className="text-text-sub dark:text-gray-400 text-sm font-bold">连续打卡 {stats.streak} 天</p>
          </div>
        </div>
      </div>

      <div className="bg-card-light dark:bg-card-dark rounded-2xl p-5 shadow-sm border-b-4 border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-primary text-2xl">palette</span>
          <h3 className="text-lg font-bold">外观主题</h3>
        </div>
        <div className="flex justify-between gap-2 px-2">
          {['#f4c025', '#58cc02', '#1cb0f6', '#ce82ff'].map((color, i) => (
            <label key={i} className="group relative flex flex-col items-center gap-2 cursor-pointer">
              <input checked={i === 0} readOnly className="peer sr-only" name="theme" type="radio"/>
              <div className="size-12 rounded-full border-4 border-transparent peer-checked:ring-2 peer-checked:ring-primary shadow-sm transition-all transform peer-checked:scale-110" style={{ backgroundColor: color }}>
                {i === 0 && <span className="flex items-center justify-center h-full text-white material-symbols-outlined">check</span>}
              </div>
              <span className="text-xs font-medium text-gray-500">活力色</span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-card-light dark:bg-card-dark rounded-2xl p-5 shadow-sm border-b-4 border-gray-200 dark:border-gray-800 flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-primary text-2xl">settings</span>
          <h3 className="text-lg font-bold">偏好设置</h3>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-base font-bold">深色模式</span>
            <span className="text-sm text-text-sub">护眼模式</span>
          </div>
          <button 
            onClick={toggleDarkMode}
            className={`relative inline-block w-14 h-8 align-middle transition duration-200 ease-in rounded-full ${isDarkMode ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all duration-300 ${isDarkMode ? 'translate-x-7' : 'translate-x-1'}`}></div>
          </button>
        </div>

        <div className="h-px bg-gray-100 dark:bg-gray-800 w-full"></div>

        <div className="flex items-center justify-between cursor-pointer group">
          <div className="flex flex-col">
            <span className="text-base font-bold">每日提醒</span>
            <span className="text-sm text-text-sub">养成好习惯</span>
          </div>
          <div className="flex items-center gap-2 bg-background-light dark:bg-background-dark px-3 py-1.5 rounded-xl border-2 border-transparent group-hover:border-primary/20 transition-all">
            <span className="text-lg font-bold text-primary">08:00</span>
            <span className="material-symbols-outlined text-primary text-sm">edit</span>
          </div>
        </div>
      </div>

      <button className="mt-4 w-full py-4 text-center rounded-2xl border-2 border-transparent hover:border-danger text-gray-400 font-bold hover:text-danger hover:bg-red-50 dark:hover:bg-red-900/10 transition-all">
        退出登录 (家长控制)
      </button>
    </div>
  );
};

export default Settings;
