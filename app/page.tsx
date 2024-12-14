"use client";

import { useState } from "react";
import { SearchForm } from "@/components/search-form";
import { UserProfile } from "@/components/user-profile";
import { ScoreCard } from "@/components/ui/score-card";
import { StatsGrid } from "@/components/ui/stats-grid";
import { LanguageChart } from "@/components/ui/language-chart";
import { GitScoreData } from "@/lib/types";
import { fetchGitHubUser, fetchUserRepositories, fetchCommitActivity, calculateGitScore } from "@/lib/github";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<GitScoreData | null>(null);
  const [error, setError] = useState("");

  async function analyzeUser(username: string) {
    try {
      setLoading(true);
      setError("");

      const user = await fetchGitHubUser(username);
      const repos = await fetchUserRepositories(username);

      const stats = {
        totalStars: repos.reduce((acc, repo) => acc + repo.stargazers_count, 0),
        totalForks: repos.reduce((acc, repo) => acc + repo.forks_count, 0),
        topLanguages: repos.reduce((acc, repo) => {
          if (repo.language) {
            acc[repo.language] = (acc[repo.language] || 0) + 1;
          }
          return acc;
        }, {} as { [key: string]: number }),
        recentCommits: 0,
      };

      const recentRepos = repos.slice(0, 5);
      const commitActivities = await Promise.all(
        recentRepos.map(repo => fetchCommitActivity(username, repo.name))
      );
      
      stats.recentCommits = commitActivities.reduce((acc, activity) => {
        if (activity.length > 0) {
          acc += activity.slice(0, 4).reduce((sum, week) => sum + week.total, 0);
        }
        return acc;
      }, 0);

      const score = calculateGitScore(stats, user);
      setData({ user, stats, score });
    } catch (err) {
      setError("Failed to fetch user data. Please check the username and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">GitScore</h1>
          <p className="text-muted-foreground">
            Analyze GitHub profiles and calculate developer scores
          </p>
        </div>

        <SearchForm onSearch={analyzeUser} loading={loading} error={error} />

        {data && (
          <div className="space-y-8">
            <div className="grid gap-4 md:grid-cols-2">
              <UserProfile data={data} />
              <ScoreCard data={data} />
            </div>

            <StatsGrid data={data} />

            <div className="grid gap-4 md:grid-cols-3">
              <LanguageChart data={data} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}