import React from 'react';
import { IndianRupee } from 'lucide-react';

export interface BudgetCategoryItem {
  id: string;
  name: string;
  amount: number;
  color: string;
  percentage: number;
  iconName?: string;
}

interface BudgetChartProps {
  items: BudgetCategoryItem[];
  total: number;
  targetBudget?: number;
  cityName: string;
}

export const BudgetChart: React.FC<BudgetChartProps> = ({
  items,
  total,
  targetBudget,
  cityName
}) => {
  // SVG Donut calculation
  const size = 220;
  const strokeWidth = 26;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercentage = 0;

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-4">
      {/* Donut graphic */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          {/* Slices */}
          {items.map((item) => {
            if (item.amount <= 0 || total === 0) return null;
            const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -((accumulatedPercentage / 100) * circumference);
            accumulatedPercentage += item.percentage;

            return (
              <circle
                key={item.id}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-700 ease-out hover:opacity-90 cursor-pointer"
                style={{
                  filter: `drop-shadow(0 0 6px ${item.color}80)`
                }}
              />
            );
          })}
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4">
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
            Total Monthly
          </span>
          <div className="text-2xl font-black text-white flex items-center justify-center">
            <span>₹</span>
            <span>{total.toLocaleString('en-IN')}</span>
          </div>
          <span className="text-[11px] font-semibold text-cyan-300">
            per month in {cityName}
          </span>
        </div>
      </div>

      {/* Itemized Progress List */}
      <div className="flex-1 w-full space-y-3.5">
        {items.filter(item => item.amount > 0).length === 0 ? (
          <div className="text-center py-6 text-xs text-gray-400 border border-dashed border-white/10 rounded-2xl">
            Enter your monthly expenses to visualize allocation breakdown
          </div>
        ) : (
          items.filter(item => item.amount > 0).map((item) => (
            <div key={item.id} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                    style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}` }}
                  />
                  <span className="text-gray-200">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold">
                    ₹{item.amount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-gray-400 font-mono w-10 text-right">
                    {item.percentage}%
                  </span>
                </div>
              </div>

              {/* Custom Bar */}
              <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${Math.min(100, Math.max(0, item.percentage))}%`,
                    backgroundColor: item.color,
                    boxShadow: `0 0 10px ${item.color}aa`
                  }}
                />
              </div>
            </div>
          ))
        )}

        {targetBudget && targetBudget > 0 && (
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-gray-400 font-medium">Your Target Budget:</span>
            <span className={`font-bold ${
              total <= targetBudget ? 'text-emerald-400' : 'text-rose-400'
            }`}>
              ₹{targetBudget.toLocaleString('en-IN')} ({
                total <= targetBudget
                  ? `₹${(targetBudget - total).toLocaleString('en-IN')} under budget`
                  : `₹${(total - targetBudget).toLocaleString('en-IN')} over budget`
              })
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
