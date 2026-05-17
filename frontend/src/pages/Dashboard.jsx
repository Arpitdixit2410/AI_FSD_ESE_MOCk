import React, { useState, useEffect } from 'react';
import { getCandidates } from '../services/api';
import { Users, TrendingUp, Sparkles } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0 });

  useEffect(() => {
    getCandidates().then(res => setStats({ total: res.data.length })).catch(err => console.error(err));
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-10">
        <h2 className="text-3xl font-bold text-slate-900">Dashboard Overview</h2>
        <p className="text-slate-500 mt-2">Manage your candidate pool and AI shortlisting tasks effectively.</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 flex flex-col gap-4 hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110">
            <Users size={120} />
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center relative z-10">
            <Users size={24} />
          </div>
          <div className="relative z-10 mt-2">
            <p className="text-sm text-slate-500 font-medium mb-1">Total Candidates</p>
            <h3 className="text-4xl font-bold text-slate-800">{stats.total}</h3>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 flex flex-col gap-4 hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110">
            <TrendingUp size={120} />
          </div>
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center relative z-10">
            <TrendingUp size={24} />
          </div>
          <div className="relative z-10 mt-2">
            <p className="text-sm text-slate-500 font-medium mb-1">Active Shortlists</p>
            <h3 className="text-4xl font-bold text-slate-800">1</h3>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-lg border border-indigo-500 flex flex-col gap-4 text-white hover:shadow-xl transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110">
            <Sparkles size={120} />
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center relative z-10 backdrop-blur-sm">
            <Sparkles size={24} />
          </div>
          <div className="relative z-10 mt-2">
            <p className="text-sm text-blue-100 font-medium mb-1">AI Recommendation Status</p>
            <h3 className="text-4xl font-bold">Ready</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
