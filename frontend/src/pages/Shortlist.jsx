import React, { useState } from 'react';
import { matchCandidates, shortlistAI } from '../services/api';
import { Search, Loader2, Sparkles, Building, Briefcase, Award } from 'lucide-react';

const Shortlist = () => {
  const [formData, setFormData] = useState({ requiredSkills: '', minExperience: '' });
  
  // Results State
  const [matchedCandidates, setMatchedCandidates] = useState([]);
  const [matchLoading, setMatchLoading] = useState(false);
  const [matchError, setMatchError] = useState(null);
  
  // AI State
  const [aiRecommendation, setAiRecommendation] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMatch = async (e) => {
    e.preventDefault();
    setMatchLoading(true);
    setMatchError(null);
    setAiRecommendation(null);
    try {
      const skillsArray = formData.requiredSkills.split(',').map(s => s.trim()).filter(s => s !== '');
      const data = {
        requiredSkills: skillsArray,
        minExperience: formData.minExperience ? Number(formData.minExperience) : 0
      };
      const res = await matchCandidates(data);
      setMatchedCandidates(res.data);
    } catch (err) {
       setMatchError(err.response?.data?.message || 'Error matching candidates');
    } finally {
      setMatchLoading(false);
    }
  };

  const handleGenerateAI = async () => {
    if (matchedCandidates.length === 0) return;
    setAiLoading(true);
    setAiError(null);
    try {
      const skillsArray = formData.requiredSkills.split(',').map(s => s.trim()).filter(s => s !== '');
      
      const payload = {
        candidates: matchedCandidates.slice(0, 5),
        jobRequirements: {
          skills: skillsArray,
          minExperience: formData.minExperience
        }
      };
      const res = await shortlistAI(payload);
      setAiRecommendation(res.data.aiRecommendation);
    } catch (err) {
      setAiError(err.response?.data?.message || 'Error generating AI insights. Check API keys in backend.');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">AI Shortlisting</h2>
        <p className="text-slate-500 mt-1">Define requirements and let AI find the perfect match.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-1 border border-slate-200 bg-white p-6 rounded-2xl shadow-sm h-fit">
           <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-4 mb-5">
             <Building className="text-blue-600" size={20} /> Job Requirements
           </h3>
           
           <form onSubmit={handleMatch} className="space-y-4">
             <div>
               <label className="block text-sm font-semibold text-slate-700 mb-1.5">Required Skills</label>
               <textarea 
                 required 
                 name="requiredSkills" 
                 value={formData.requiredSkills} 
                 onChange={handleInputChange} 
                 rows={3}
                 className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none resize-none" 
                 placeholder="React, Node.js, Typescript..."
               />
               <p className="text-xs text-slate-400 mt-1">Comma separated list</p>
             </div>
             
             <div>
               <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-2"><Briefcase size={16}/> Min. Experience (Years)</label>
               <input 
                 type="number" 
                 min="0" 
                 step="0.5" 
                 name="minExperience" 
                 value={formData.minExperience} 
                 onChange={handleInputChange} 
                 className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none" 
                 placeholder="e.g. 2"
               />
             </div>
             
             <button 
               type="submit" 
               disabled={matchLoading} 
               className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 mt-6"
             >
               {matchLoading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
               {matchLoading ? 'Matching...' : 'Find Matches'}
             </button>
           </form>
        </div>

        {/* Right Column: Results & AI */}
        <div className="lg:col-span-2 space-y-6">
          
          {matchError && (
             <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 font-medium">
               {matchError}
             </div>
          )}

          {matchedCandidates.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                 <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Award className="text-indigo-600" size={22} /> Top Matched Candidates</h3>
                 <div className="bg-white px-3 py-1 rounded-full text-sm font-semibold text-slate-600 shadow-sm border border-slate-200">
                    {matchedCandidates.length} found
                 </div>
              </div>
              
              <div className="p-6 space-y-5">
                 {matchedCandidates.slice(0,5).map((match, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors group">
                       <div className="w-14 h-14 shrink-0 rounded-full bg-blue-100 text-blue-600 font-bold text-xl flex items-center justify-center border border-blue-200">
                          {match.candidate.name.charAt(0).toUpperCase()}
                       </div>
                       <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                             <h4 className="font-bold text-slate-800 text-lg group-hover:text-blue-600 transition-colors">{match.candidate.name}</h4>
                             <span className="text-sm font-semibold text-slate-500">{match.candidate.experience} yrs exp</span>
                          </div>
                          
                          <div className="w-full bg-slate-100 rounded-full h-2.5 mb-2 mt-2 overflow-hidden">
                             <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2.5 rounded-full" style={{ width: `${match.matchScore}%` }}></div>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                             <span className="font-semibold text-slate-500">Match Accuracy</span>
                             <span className="font-bold text-indigo-600">{match.matchScore}%</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mt-3">
                             <span className="text-xs text-slate-500 font-medium mr-1">Matches:</span>
                             {match.matchedSkills.map((s, i) => (
                                <span key={i} className="bg-green-50 text-green-700 border border-green-200 text-xs px-2 py-0.5 rounded-md font-medium">{s}</span>
                             ))}
                          </div>
                       </div>
                    </div>
                 ))}
                 
                 {matchedCandidates.length > 5 && (
                    <div className="text-center pt-2">
                       <button className="text-blue-600 text-sm font-semibold hover:underline">View all {matchedCandidates.length} matches</button>
                    </div>
                 )}
              </div>
              
              {/* AI Trigger */}
              <div className="p-6 bg-gradient-to-r from-slate-50 to-blue-50/50 border-t border-slate-100">
                 {!aiRecommendation ? (
                   <div className="flex items-center justify-between gap-4">
                     <div>
                       <h4 className="font-bold text-slate-800 flex items-center gap-2"><Sparkles className="text-indigo-600" size={18}/> Need Deeper Insights?</h4>
                       <p className="text-sm text-slate-600 mt-1">Let AI analyze the top matches and provide explanations and interview questions.</p>
                     </div>
                     <button 
                       onClick={handleGenerateAI}
                       disabled={aiLoading}
                       className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2"
                     >
                       {aiLoading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                       {aiLoading ? 'Analyzing...' : 'Generate AI Report'}
                     </button>
                   </div>
                 ) : (
                    <div className="space-y-4 animate-in fade-in duration-500">
                       <div className="flex items-center justify-between">
                         <h4 className="font-bold text-indigo-900 flex items-center gap-2 text-xl">
                           <Sparkles className="text-indigo-600" size={24}/> AI Shortlisting Report
                         </h4>
                         <button onClick={() => setAiRecommendation(null)} className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-white px-3 py-1.5 rounded-lg border border-indigo-200 shadow-sm">
                           Clear Report
                         </button>
                       </div>
                       
                       <div className="bg-white p-6 rounded-2xl border border-indigo-100 shadow-sm prose prose-slate max-w-none text-slate-700">
                          <div className="whitespace-pre-wrap font-sans leading-relaxed text-sm md:text-base">
                            {aiRecommendation}
                          </div>
                       </div>
                    </div>
                 )}
                 
                 {aiError && (
                   <div className="mt-4 bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 font-medium text-sm">
                     {aiError}
                   </div>
                 )}
              </div>
            </div>
          )}

          {!matchLoading && matchedCandidates.length === 0 && !matchError && (
              <div className="bg-slate-50 border border-slate-200 border-dashed rounded-2xl p-12 text-center flex flex-col items-center justify-center text-slate-400 h-64">
                 <Search size={48} className="mb-4 opacity-50" />
                 <p className="text-lg font-semibold text-slate-600">No matches found yet.</p>
                 <p className="text-sm">Submit your job requirements to discover top candidates.</p>
              </div>
          )}
          
        </div>

      </div>
    </div>
  );
};

export default Shortlist;
