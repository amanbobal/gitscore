export interface GitHubUser {
  name: string;
  login: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface Repository {
  name: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
}

export interface CommitActivity {
  total: number;
  week: number;
  days: number[];
}

export interface UserStats {
  totalStars: number;
  totalForks: number;
  topLanguages: { [key: string]: number };
  recentCommits: number;
}

export interface GitScoreData {
  user: GitHubUser;
  stats: UserStats;
  score: number;
}