const GITHUB_API_BASE = 'https://api.github.com';

export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  const response = await fetch(`${GITHUB_API_BASE}/users/${username}`);
  if (!response.ok) throw new Error('User not found');
  return response.json();
}

export async function fetchUserRepositories(username: string): Promise<Repository[]> {
  const response = await fetch(`${GITHUB_API_BASE}/users/${username}/repos?per_page=100`);
  if (!response.ok) throw new Error('Failed to fetch repositories');
  return response.json();
}

export async function fetchCommitActivity(username: string, repo: string): Promise<CommitActivity[]> {
  const response = await fetch(`${GITHUB_API_BASE}/repos/${username}/${repo}/stats/commit_activity`);
  if (!response.ok) return [];
  return response.json();
}

export function calculateGitScore(stats: UserStats, user: GitHubUser): number {
  const weights = {
    stars: 0.3,
    forks: 0.2,
    followers: 0.15,
    repos: 0.15,
    commits: 0.2,
  };

  const normalizedStats = {
    stars: Math.min(stats.totalStars / 1000, 1),
    forks: Math.min(stats.totalForks / 500, 1),
    followers: Math.min(user.followers / 1000, 1),
    repos: Math.min(user.public_repos / 100, 1),
    commits: Math.min(stats.recentCommits / 100, 1),
  };

  const score = Object.entries(weights).reduce(
    (acc, [key, weight]) => acc + normalizedStats[key as keyof typeof normalizedStats] * weight,
    0
  );

  return Math.round(score * 100);
}