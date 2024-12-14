"use client";

import { GitScoreData } from "@/lib/types";
import { Trophy, Star, GitFork } from "lucide-react";

interface ScoreCardProps {
  data: GitScoreData;
}

export function ScoreCard({ data }: ScoreCardProps) {
  const scorePercentage = data.score;
  
  return (
    <div className="stat-card glow">
      <div className="flex flex-col items-center">
        <Trophy className="w-8 h-8 text-primary mb-4" />
        <div 
          className="score-ring mb-4"
          style={{ "--score": `${scorePercentage}%` } as any}
        >
          <div className="relative z-10 flex flex-col items-center">
            <span className="text-4xl font-bold">{data.score}</span>
            <span className="text-sm text-muted-foreground">GitScore</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full mt-4">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-primary" />
            <span>{data.stats.totalStars} stars</span>
          </div>
          <div className="flex items-center gap-2">
            <GitFork className="w-4 h-4 text-primary" />
            <span>{data.stats.totalForks} forks</span>
          </div>
        </div>
      </div>
    </div>
  );
}