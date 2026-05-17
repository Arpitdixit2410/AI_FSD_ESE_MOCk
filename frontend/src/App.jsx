import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, UserPlus, Sparkles } from 'lucide-react'
import Dashboard from './pages/Dashboard'
import Candidates from './pages/Candidates'
import Shortlist from './pages/Shortlist'

const SidebarLink = ({ to, icon: Icon, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'}`}
    >
      <Icon size={20} /> {children}
    </Link>
  );
};

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-950 text-white flex flex-col shadow-xl">
          <div className="p-6 pb-2">
            <h1 className="text-xl font-bold flex items-center gap-2 mb-8 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              <Sparkles className="text-blue-400" /> AI Shortlist
            </h1>
          </div>
          <nav className="flex-1 px-4 py-2 space-y-2">
            <SidebarLink to="/" icon={LayoutDashboard}>Dashboard</SidebarLink>
            <SidebarLink to="/candidates" icon={Users}>Candidates</SidebarLink>
            <SidebarLink to="/shortlist" icon={UserPlus}>AI Shortlisting</SidebarLink>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto w-full">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/shortlist" element={<Shortlist />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
