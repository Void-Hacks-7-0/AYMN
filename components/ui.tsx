import React from 'react';
import { LucideIcon } from 'lucide-react';

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`bg-slate-900 rounded-xl shadow-lg border border-slate-800 p-6 ${className}`}>
    {children}
  </div>
);

export const ProgressBar: React.FC<{ value: number; color?: string; label: string }> = ({ value, color = "bg-sky-500", label }) => (
  <div className="w-full">
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-slate-300">{label}</span>
      <span className="text-sm font-medium text-slate-300">{value}%</span>
    </div>
    <div className="w-full bg-slate-800 rounded-full h-2.5">
      <div 
        className={`${color} h-2.5 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(14,165,233,0.3)]`} 
        style={{ width: `${Math.min(value, 100)}%` }}
      ></div>
    </div>
  </div>
);

interface CircularProgressProps {
  value: number;
  max: number;
  color: string;
  icon: LucideIcon;
  label: string;
  unit: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({ value, max, color, icon: Icon, label, unit }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / max) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative flex items-center justify-center">
        <svg className="transform -rotate-90 w-24 h-24">
          <circle cx="48" cy="48" r={radius} stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-800" />
          <circle 
            cx="48" 
            cy="48" 
            r={radius} 
            stroke="currentColor" 
            strokeWidth="6" 
            fill="transparent" 
            strokeDasharray={circumference} 
            strokeDashoffset={strokeDashoffset} 
            className={`${color} transition-all duration-1000 ease-out`} 
            strokeLinecap="round"
          />
        </svg>
        <Icon className={`absolute w-8 h-8 ${color.replace('text-', 'text-opacity-80 ')}`} />
      </div>
      <div className="mt-2 text-center">
        <p className="text-xl font-bold text-white">{value} <span className="text-xs font-normal text-slate-400">{unit}</span></p>
        <p className="text-xs text-slate-400">{label}</p>
      </div>
    </div>
  );
};

export const CustomIcons = {
  Sun: ({className}: {className?: string}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>,
  Star: ({className}: {className?: string}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Zap: ({className}: {className?: string}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Cloud: ({className}: {className?: string}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19c0-3.037-2.463-5.5-5.5-5.5S6.5 15.963 6.5 19"/><path d="M19 19a3 3 0 0 0 .14-5.992 4.004 4.004 0 0 0-7.85-1.57A4.003 4.003 0 0 0 4.07 15 3 3 0 0 0 4 19h15Z"/></svg>
};