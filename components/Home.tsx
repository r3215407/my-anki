
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserStats } from '../lib/storage';
import { UserStats } from '../types';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<UserStats>(getUserStats());

  return (
    <div className="flex-1 flex flex-col gap-6 px-4 pb-24 page-transition overflow-y-auto no-scrollbar">
      {/* Top Header */}
      <div className="sticky top-0 z-50 flex items-center bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md pt-4 pb-2 justify-between">
        <button onClick={() => navigate('/settings')} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-2xl">settings</span>
        </button>
      </div>

      {/* Hero Headline */}
      <div className="flex flex-col items-center pt-4">
        <div className="relative mb-4">
          <div className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">New!</div>
          <img alt="Daily Achievement" className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow-lg" src="https://picsum.photos/200/200?random=1" />
        </div>
        {/* <h1 className="tracking-tight text-[28px] font-black leading-tight text-center"> */}
        {/* 🌟 哇！你今天收集了<br /><span className="text-primary">{stats.energyPoints} 个能量</span>！ */}
        {/* </h1> */}
        {/* <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mt-2 text-center">继续保持，你的大脑正在变强壮！💪</p> */}
      </div>

      {/* Stats Grid */}
      {/* <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col items-center gap-1 rounded-2xl p-4 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 shadow-sm">
          <span className="material-symbols-outlined text-2xl">psychology</span>
          <p className="text-[10px] font-bold opacity-70 uppercase">脑力值</p>
          <p className="text-xl font-black">{stats.energyPoints}</p>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-2xl p-4 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 shadow-sm">
          <span className="material-symbols-outlined text-2xl">local_fire_department</span>
          <p className="text-[10px] font-bold opacity-70 uppercase">连胜</p>
          <p className="text-xl font-black">{stats.streak}天</p>
        </div>
        <div onClick={() => navigate('/learn')} className="flex flex-col items-center gap-1 rounded-2xl p-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 shadow-sm border-2 border-transparent hover:border-green-300 transition-all cursor-pointer group">
          <div className="relative">
            <span className="material-symbols-outlined text-2xl group-hover:animate-bounce">water_drop</span>
            <div className="absolute -top-1 -right-1 size-2.5 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></div>
          </div>
          <p className="text-[10px] font-bold opacity-70 uppercase">待复习</p>
          <p className="text-xl font-black">{stats.totalReview}</p>
        </div>
      </div> */}

      {/* Garden Section */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold px-2 flex items-center gap-2">记忆花园 🌱</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-4 bg-card-light dark:bg-card-dark p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="size-12 rounded-xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-500 shrink-0">
              <span className="material-symbols-outlined text-3xl">spa</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <p className="font-bold">刚发芽 (新词)</p>
                <span className="text-xs font-bold text-pink-500">{stats.totalNew} 词</span>
              </div>
              <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-pink-400 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-card-light dark:bg-card-dark p-4 rounded-3xl shadow-sm border border-orange-200 dark:border-orange-800 ring-2 ring-orange-100 dark:ring-orange-900/20">
            <div className="size-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-500 shrink-0">
              <span className="material-symbols-outlined text-3xl">potted_plant</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <p className="font-bold">快渴了 (待复习)</p>
                <span className="text-xs font-bold text-orange-600">{stats.totalReview} 词</span>
              </div>
              <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-orange-400 animate-pulse rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate('/learn')}
        className="w-full flex items-center justify-center gap-3 bg-primary hover:bg-[#e0b020] text-[#4d3b0b] font-black text-lg py-4 rounded-2xl shadow-btn-primary active:translate-y-1 active:shadow-none transition-all"
      >
        <span className="material-symbols-outlined font-bold">water_drop</span>
        去给单词浇水 ({stats.totalReview})
      </button>
    </div>
  );
};

export default Home;
