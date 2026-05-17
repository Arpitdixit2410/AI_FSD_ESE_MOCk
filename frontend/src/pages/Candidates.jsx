import React, { useState, useEffect } from 'react';
import { getCandidates, addCandidate } from '../services/api';
import CandidateCard from '../components/CandidateCard';
import { Search, Loader2, UserPlus, X, Users } from 'lucide-react';

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', skills: '', experience: '', bio: '' });
  const [formLoading, setFormLoading] = useState(false);

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const res = await getCandidates();
      setCandidates(res.data);
      setFilteredCandidates(res.data);
    } catch (err) {
      setError('Failed to fetch candidates from server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredCandidates(candidates);
    } else {
      const lowerSearch = search.toLowerCase();
      // Search by name or skills
      const filtered = candidates.filter(c => 
        c.name.toLowerCase().includes(lowerSearch) || 
        c.skills.some(s => s.toLowerCase().includes(lowerSearch))
      );
      setFilteredCandidates(filtered);
    }
  }, [search, candidates]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s !== '');
      await addCandidate({
        ...formData,
        skills: skillsArray,
        experience: Number(formData.experience)
      });
      setShowModal(false);
      setFormData({ name: '', email: '', skills: '', experience: '', bio: '' });
      fetchCandidates();
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding candidate');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Candidates Database</h2>
          <p className="text-slate-500 mt-1">Manage and view your candidate pool.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-sm"
        >
          <UserPlus size={18} /> Add Candidate
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-8 flex items-center gap-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
        <Search className="text-slate-400" size={20} />
        <input 
          type="text" 
          placeholder="Search candidates by name or skills (e.g. React, Node.js)" 
          className="w-full bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-400 font-medium"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-blue-500 bg-white rounded-2xl border border-slate-200 border-dashed">
          <Loader2 className="animate-spin mb-4" size={40} />
          <p className="text-slate-500 font-medium text-lg">Loading Directory...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-100 text-center font-medium shadow-sm">
          {error}
        </div>
      ) : filteredCandidates.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed">
          <Users size={64} className="mx-auto text-slate-200 mb-4" />
          <h3 className="text-xl font-bold text-slate-700 mb-2">No candidates found</h3>
          <p className="text-slate-500 max-w-sm mx-auto">Either your search yielded no results, or your database is empty. Try adding a new candidate.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCandidates.map(candidate => (
            <CandidateCard key={candidate._id} candidate={candidate} />
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl border border-slate-100 overflow-hidden transform transition-all">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2"><UserPlus size={20} className="text-blue-600"/> Add New Candidate</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-800 transition-colors bg-white p-2 rounded-full shadow-sm">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5 bg-white">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors outline-none" placeholder="John Doe" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors outline-none" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Experience (Years)</label>
                  <input required type="number" min="0" step="0.5" name="experience" value={formData.experience} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors outline-none" placeholder="2" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Skills (comma separated)</label>
                <input required type="text" name="skills" value={formData.skills} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors outline-none" placeholder="React, Node.js, MongoDB" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Bio / Headline</label>
                <textarea name="bio" value={formData.bio} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors outline-none resize-none" placeholder="MERN Stack Developer with passion for AI..."></textarea>
              </div>
              <div className="pt-4 flex gap-3 justify-end border-t border-slate-100 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 text-slate-600 font-semibold hover:bg-slate-100 rounded-xl transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={formLoading} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors flex items-center gap-2 shadow-md shadow-blue-500/20">
                  {formLoading && <Loader2 size={18} className="animate-spin" />}
                  {formLoading ? 'Saving Candidate...' : 'Save Candidate'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Candidates;
