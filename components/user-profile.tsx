"use client";

import { GitScoreData } from "@/lib/types";

interface UserProfileProps {
  data: GitScoreData;
}

export function UserProfile({ data }: UserProfileProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <img
          src={data.user.avatar_url}
          alt={data.user.name}
          className="w-20 h-20 rounded-full"
        />
        <div>
          <h2 className="text-2xl font-bold">{data.user.name}</h2>
          <p className="text-muted-foreground">@{data.user.login}</p>
        </div>
      </div>
      {data.user.bio && (
        <p className="text-muted-foreground">{data.user.bio}</p>
      )}
    </div>
  );
}