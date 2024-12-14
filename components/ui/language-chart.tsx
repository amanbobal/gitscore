"use client";

import { GitScoreData } from "@/lib/types";
import { Code } from "lucide-react";

interface LanguageChartProps {
  data: GitScoreData;
}

export function LanguageChart({ data }: LanguageChartProps) {
  const languages = Object.entries(data.stats.topLanguages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const total = languages.reduce((sum, [, count]) => sum + count, 0);

  return (
    <div className="stat-card col-span-3">
      <div className="flex items-center gap-2 mb-4">
        <Code className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Top Languages</h3>
      </div>
      <div className="space-y-4">
        {languages.map(([language, count]) => {
          const percentage = (count / total) * 100;
          return (
            <div key={language}>
              <div className="flex justify-between text-sm mb-1">
                <span>{language}</span>
                <span>{Math.round(percentage)}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}