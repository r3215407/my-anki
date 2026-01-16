
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserStats } from '../lib/storage';
import { UserStats } from '../types';

const Statistics: React.FC = () => {
    const navigate = useNavigate();
    const [stats] = useState<UserStats>(getUserStats());

    const days = ['一', '二', '三', '四', '五', '六', '日'];
    const energyData = [40, 65, 30, 85, 0, 0, 0];
    const todayIndex = 3; // Thursday

    return (
        <div className="flex-1 flex flex-col gap-6 px-4 pb-24 page-transition overflow-y-auto no-scrollbar bg-[#FAFAFA] dark:bg-background-dark">
            {/* Top Header */}
            <div className="sticky top-0 z-50 flex items-center bg-[#FAFAFA]/90 dark:bg-background-dark/90 backdrop-blur-md pt-4 pb-2 justify-between">
                <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                </button>
                <h2 className="text-lg font-bold">我的超能力</h2>
                <button onClick={() => navigate('/settings')} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-2xl">settings</span>
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#FFF4E5] dark:bg-orange-900/20 p-4 rounded-3xl flex flex-col items-center gap-1 shadow-sm border border-orange-100/50 dark:border-orange-800/30">
                    <div className="size-10 bg-[#FFD8A8] dark:bg-orange-800/40 rounded-2xl flex items-center justify-center text-[#E67E22] mb-1">
                        <span className="material-symbols-outlined text-2xl">psychology</span>
                    </div>
                    <p className="text-[10px] font-bold text-[#D35400] opacity-60 uppercase tracking-wider">脑力值</p>
                    <p className="text-xl font-black text-[#D35400]">{stats.energyPoints}</p>
                </div>

                <div className="bg-[#E6F4FF] dark:bg-blue-900/20 p-4 rounded-3xl flex flex-col items-center gap-1 shadow-sm border border-blue-100/50 dark:border-blue-800/30">
                    <div className="size-10 bg-[#BAE0FF] dark:bg-blue-800/40 rounded-2xl flex items-center justify-center text-[#1890FF] mb-1">
                        <span className="material-symbols-outlined text-2xl">local_fire_department</span>
                    </div>
                    <p className="text-[10px] font-bold text-[#0958D9] opacity-60 uppercase tracking-wider">连胜</p>
                    <p className="text-xl font-black text-[#0958D9]">{stats.streak}天</p>
                </div>

                <div className="bg-[#F6FFED] dark:bg-green-900/20 p-4 rounded-3xl flex flex-col items-center gap-1 shadow-sm border border-green-100/50 dark:border-green-800/30 relative">
                    <div className="absolute top-3 right-3 size-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                    <div className="size-10 bg-[#D9F7BE] dark:bg-green-800/40 rounded-2xl flex items-center justify-center text-[#52C41A] mb-1">
                        <span className="material-symbols-outlined text-2xl">water_drop</span>
                    </div>
                    <p className="text-[10px] font-bold text-[#389E0D] opacity-60 uppercase tracking-wider">待浇水</p>
                    <p className="text-xl font-black text-[#389E0D]">{stats.totalReview}</p>
                </div>
            </div>

            {/* Weekly Energy Chart */}
            <div className="bg-white dark:bg-card-dark p-5 rounded-[32px] shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-base font-bold flex items-center gap-2">
                            本周能量收集 <span className="text-[#FFC400]">⚡️</span>
                        </h3>
                        <p className="text-xs font-semibold text-gray-400 mt-0.5">
                            比上周进步了 <span className="text-[#52C41A] font-bold">+10%</span>
                        </p>
                    </div>
                    <button className="text-gray-300">
                        <span className="material-symbols-outlined">bar_chart</span>
                    </button>
                </div>

                <div className="flex items-end justify-between h-32 px-1 mb-2">
                    {energyData.map((value, index) => (
                        <div key={index} className="flex flex-col items-center gap-2 flex-1">
                            <div className="relative w-full flex justify-center items-end h-24">
                                {index === todayIndex && (
                                    <div className="absolute -top-6 bg-[#FFC400] text-white text-[8px] px-2 py-0.5 rounded-full font-bold">Today</div>
                                )}
                                <div
                                    className={`w-8 rounded-full transition-all duration-1000 ${index === todayIndex ? 'bg-[#FFC400]' :
                                        value > 0 ? 'bg-[#BAE0FF] dark:bg-blue-800/40' : 'bg-gray-100 dark:bg-gray-800'
                                        }`}
                                    style={{ height: `${value}%` }}
                                ></div>
                            </div>
                            <span className={`text-xs font-bold ${index === todayIndex ? 'text-[#FFC400]' : 'text-gray-400'}`}>
                                {days[index]}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Badges Section */}
            <div className="grid grid-cols-3 gap-4 pt-4 mb-4">
                <div className="flex flex-col items-center gap-2">
                    <div className="size-16 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-50 flex items-center justify-center shadow-md relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/50 to-orange-100/50 dark:from-yellow-900/20 dark:to-orange-900/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <span className="material-symbols-outlined text-3xl text-yellow-500 z-10">military_tech</span>
                        <div className="absolute bottom-1 right-1 bg-yellow-400 text-white size-4 rounded-full flex items-center justify-center text-[8px] font-bold border border-white z-20">1</div>
                    </div>
                    <p className="text-[10px] font-bold text-gray-400">词汇达人</p>
                </div>

                <div className="flex flex-col items-center gap-2 grayscale opacity-40">
                    <div className="size-16 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-50 flex items-center justify-center shadow-md">
                        <span className="material-symbols-outlined text-3xl text-gray-400">trophy</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">首词斩</p>
                        <p className="text-[8px] font-bold text-gray-300 uppercase">LOCK</p>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2 grayscale opacity-40">
                    <div className="size-16 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-50 flex items-center justify-center shadow-md">
                        <span className="material-symbols-outlined text-3xl text-gray-400">local_fire_department</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">30天连胜</p>
                        <p className="text-[8px] font-bold text-gray-300 uppercase">LOCK</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistics;
