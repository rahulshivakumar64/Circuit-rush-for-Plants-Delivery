import React from 'react';
import { PlantCareInfo } from '../types';

interface PlantCareProps {
  care?: PlantCareInfo;
  className?: string;
}

export const PlantCare: React.FC<PlantCareProps> = ({ care, className = '' }) => {
  if (!care) {
    return (
      <div className={`p-4 rounded-xl bg-stone-50 border border-stone-200 text-stone-600 text-sm ${className}`}>
        No specific care guidelines provided for this item.
      </div>
    );
  }

  const items = [
    {
      icon: '☀️',
      title: 'Sunlight',
      description: care.sunlight || 'Medium to bright indirect sunlight',
      accent: 'border-amber-200 bg-amber-50/50 text-amber-950',
      iconBg: 'bg-amber-100 text-amber-800'
    },
    {
      icon: '💧',
      title: 'Water',
      description: care.water || 'Water when topsoil feels dry to touch',
      accent: 'border-cyan-200 bg-cyan-50/50 text-cyan-950',
      iconBg: 'bg-cyan-100 text-cyan-800'
    },
    {
      icon: '🌱',
      title: 'Soil',
      description: care.soil || 'Rich, aerated, well-draining potting soil',
      accent: 'border-emerald-200 bg-emerald-50/50 text-emerald-950',
      iconBg: 'bg-emerald-100 text-emerald-800'
    },
    {
      icon: '🌡️',
      title: 'Temperature',
      description: care.temperature || '18°C – 30°C; protect from harsh AC drafts',
      accent: 'border-orange-200 bg-orange-50/50 text-orange-950',
      iconBg: 'bg-orange-100 text-orange-800'
    },
    {
      icon: '✂️',
      title: 'Pruning',
      description: care.pruning || 'Trim yellowing outer leaves at base occasionally',
      accent: 'border-stone-200 bg-stone-50/50 text-stone-900',
      iconBg: 'bg-stone-200 text-stone-700'
    }
  ];

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between pb-1 border-b border-stone-200">
        <h4 className="text-sm font-semibold text-stone-900 uppercase tracking-wide">
          Plant Care Guide
        </h4>
        <span className="text-xs text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded">
          Curated by Botanists
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg border ${item.accent} flex items-start gap-3 transition-colors hover:border-stone-300`}
          >
            <div className={`w-8 h-8 rounded-md ${item.iconBg} flex items-center justify-center text-base shrink-0 select-none shadow-xs`}>
              {item.icon}
            </div>
            <div className="min-w-0">
              <span className="text-xs font-semibold uppercase tracking-wider block text-stone-800 mb-0.5">
                {item.title}
              </span>
              <p className="text-xs leading-relaxed text-stone-700">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
