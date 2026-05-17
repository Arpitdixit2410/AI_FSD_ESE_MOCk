import React from 'react';
import { Mail, Briefcase } from 'lucide-react';

const CandidateCard = ({ candidate }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-2 h-full bg-slate-100 group-hover:bg-blue-500 transition-colors"></div>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold text-lg border border-indigo-100 shadow-sm">
            {candidate.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-lg hover:text-blue-600 transition-colors">{candidate.name}</h3>
            <p className="text-slate-500 text-sm flex items-center gap-1"><Mail size={12} /> {candidate.email}</p>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {candidate.skills.slice(0, 5).map((skill, index) => (
            <span key={index} className="bg-slate-50 text-slate-700 text-xs px-2.5 py-1 rounded-md border border-slate-200 font-medium">
              {skill}
            </span>
          ))}
          {candidate.skills.length > 5 && (
            <span className="bg-blue-50 text-blue-600 text-xs px-2.5 py-1 rounded-md border border-blue-100 font-medium">
              +{candidate.skills.length - 5}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-2">
         <p className="text-sm text-slate-600 line-clamp-1 flex-1 pr-4">{candidate.bio}</p>
         <div className="bg-slate-50 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-200 flex items-center gap-1 whitespace-nowrap">
            <Briefcase size={12} /> {candidate.experience} yrs
         </div>
      </div>
    </div>
  );
};

export default CandidateCard;
