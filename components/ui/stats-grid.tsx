"use client";

import { GitScoreData } from "@/lib/types";
import { Users, Book, GitCommit } from "lucide-react";

interface StatsGridProps {
  data: GitScoreData;
}

export function StatsGrid({ data }: StatsGridProps) {
  const stats = [
    {
      label: "Followers",
      value: data.user.followers,
      icon: Users,
    },
    {
      label: "Repositories",
      value: data.user.public_repos,
      icon: Book,
    },
    {
      label: "Recent Commits",
      value: data.stats.recentCommits,
      icon: GitCommit,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="stat-card">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <stat.icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}